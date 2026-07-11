import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const FloatingPDFButton = ({ fileName, targetId = "notes-content" }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    // Smart slice algorithm to find white space and avoid cutting text
    const findPageBreak = (ctx, width, startY, targetY) => {
        // We increase searchHeight up to 1500px to jump over tall cards or code blocks.
        const searchHeight = Math.floor(Math.min(targetY - startY, 1500));
        if (searchHeight <= 0) return targetY;

        try {
            const imgData = ctx.getImageData(0, targetY - searchHeight, width, searchHeight).data;
            
            // Ignore the left 5% and right 5% of the canvas to bypass borders
            const startX = Math.floor(width * 0.05);
            const endX = Math.floor(width * 0.95);

            // PASS 1: Look for a pure WHITE line (Major Gap between outer cards)
            for (let y = searchHeight - 1; y >= 0; y--) {
                let isWhite = true;
                for (let x = startX; x < endX; x += 4) {
                    const idx = (y * width + x) * 4;
                    if (imgData[idx] < 253 || imgData[idx+1] < 253 || imgData[idx+2] < 253) {
                        isWhite = false;
                        break;
                    }
                }
                if (isWhite) {
                    return (targetY - searchHeight) + Math.max(0, y - 4);
                }
            }

            // PASS 2: Look for a SMOOTH line (Minor Gap inside colored cards or code blocks)
            // If the card itself is taller than a page, we must slice inside it.
            // We check for rows where adjacent pixels have very little color variance (no text/borders).
            const smoothSearchHeight = Math.min(searchHeight, 800);
            for (let y = searchHeight - 1; y >= searchHeight - smoothSearchHeight; y--) {
                let isSmooth = true;
                // Step by 2 pixels to guarantee we don't jump over thin letters like 'l'
                for (let x = startX; x < endX - 2; x += 2) {
                    const idx1 = (y * width + x) * 4;
                    const idx2 = (y * width + x + 2) * 4;
                    
                    const diff = Math.abs(imgData[idx1] - imgData[idx2]) + 
                                 Math.abs(imgData[idx1+1] - imgData[idx2+1]) + 
                                 Math.abs(imgData[idx1+2] - imgData[idx2+2]);
                                 
                    // 15 allows smooth gradients to pass, but catches sharp text edges
                    if (diff > 15) { 
                        isSmooth = false;
                        break;
                    }
                }
                if (isSmooth) {
                    return (targetY - searchHeight) + Math.max(0, y - 2);
                }
            }

        } catch (e) {
            console.warn("Could not scan canvas for page break:", e);
        }
        
        return targetY; // Fallback to hard slice if no gap is found
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        
        try {
            const pdf = new jsPDF({
                orientation: 'p', 
                unit: 'mm', 
                format: 'a4',
                compress: true // Enables built-in compression for the PDF
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 12; 
            const availableWidth = pdfWidth - 2 * margin;
            
            const container = document.getElementById(targetId);
            if (!container) return;

            // Gather logical sections
            const contentWrapper = container.querySelector('.space-y-12') || container;
            const sections = Array.from(contentWrapper.children);
            
            let cursorY = margin;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                
                const canvas = await html2canvas(section, {
                    scale: 1.5, // Reduced from 2 to 1.5. Still crisp, but cuts pixel count nearly in half
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });
                
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                const pdfToCanvasRatio = canvas.width / availableWidth;
                
                let currentY = 0;
                
                while (currentY < canvas.height) {
                    const availableCanvasHeight = (pdfHeight - cursorY - margin) * pdfToCanvasRatio;
                    
                    if (currentY + availableCanvasHeight >= canvas.height) {
                        // The rest of this section fits on the page
                        const sliceHeight = canvas.height - currentY;
                        
                        const sliceCanvas = document.createElement('canvas');
                        sliceCanvas.width = canvas.width;
                        sliceCanvas.height = sliceHeight;
                        const sCtx = sliceCanvas.getContext('2d');
                        sCtx.drawImage(canvas, 0, currentY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
                        
                        const imgData = sliceCanvas.toDataURL('image/jpeg', 0.80); // Reduced from 0.98 to 0.80
                        const scaledHeight = sliceHeight / pdfToCanvasRatio;
                        
                        pdf.addImage(imgData, 'JPEG', margin, cursorY, availableWidth, scaledHeight);
                        
                        cursorY += scaledHeight + 6; // Add gap after section
                        currentY = canvas.height; 
                    } else {
                        // Section overflows. Find a clean place to cut.
                        const targetY = currentY + availableCanvasHeight;
                        let sliceY = findPageBreak(ctx, canvas.width, currentY, targetY);
                        
                        // If no blank line found, force cut at targetY
                        if (sliceY === currentY) sliceY = targetY;
                        
                        const sliceHeight = sliceY - currentY;
                        
                        const sliceCanvas = document.createElement('canvas');
                        sliceCanvas.width = canvas.width;
                        sliceCanvas.height = sliceHeight;
                        const sCtx = sliceCanvas.getContext('2d');
                        sCtx.drawImage(canvas, 0, currentY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
                        
                        const imgData = sliceCanvas.toDataURL('image/jpeg', 0.80); // Reduced from 0.98 to 0.80
                        const scaledHeight = sliceHeight / pdfToCanvasRatio;
                        
                        pdf.addImage(imgData, 'JPEG', margin, cursorY, availableWidth, scaledHeight);
                        
                        pdf.addPage();
                        cursorY = margin;
                        currentY = sliceY;
                    }
                }
            }
            
            pdf.save(fileName || 'docs.pdf');
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group disabled:opacity-75 disabled:hover:-translate-y-0 disabled:cursor-wait"
            aria-label="Download PDF"
        >
            {isGenerating ? (
                <Loader2 className="w-5 h-5 md:w-5 md:h-5 text-white animate-spin" />
            ) : (
                <Download className="w-5 h-5 md:w-5 md:h-5 text-white transition-transform group-hover:scale-110" />
            )}
            <span className="hidden sm:inline font-medium text-sm md:text-base whitespace-nowrap">
                {isGenerating ? "Processing pages..." : "Download PDF"}
            </span>
        </button>
    );
};

export default FloatingPDFButton;
