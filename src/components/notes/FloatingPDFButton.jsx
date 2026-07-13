import React, { useState, useEffect, useRef } from "react";
import { Download, Loader2, X, FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * FloatingPDFButton
 *
 * Opens a modal where the user supplies:
 *  - A "Start section ID" and an "End section ID" — every section between
 *    them (inclusive), in DOM order, inside the target container is
 *    captured into one PDF.
 *
 * Two images are used:
 *  - `watermarkSrc`: large, faint, centered behind the content on every page.
 *  - `footerImageSrc`: small icon/logo drawn inline in the footer row, next
 *    to the name/designation/phone text. Defaults to the same file as the
 *    watermark — pass a different path if you want a distinct footer logo.
 *
 * Usage:
 *   <FloatingPDFButton
 *     fileName="python-notes.pdf"
 *     targetId="notes-content"
 *     watermarkSrc="/vigyan-square.png"
 *   />
 *
 * IMPORTANT: both image paths must point at a file that actually exists in
 * your public folder, with matching case and spelling. A typo or wrong
 * folder (e.g. src/assets instead of public/) is the #1 cause of the
 * "couldn't load" warning.
 *
 * Requirements on the target container:
 *   The container (targetId) must hold a wrapper with class "space-y-12"
 *   (or be that wrapper itself) whose direct children each carry a unique
 *   `id` — e.g. <div id="tokens"><Tokens /></div>. Start/End IDs refer to
 *   these wrapper ids.
 */

// Static footer text — edit these to change what appears on every page.
const FOOTER_NAME = "SM";
const FOOTER_DESIGNATION = "B.Tech CS";
const FOOTER_PHONE = "8391080258 / 8145885906";

const FloatingPDFButton = ({
  fileName,
  targetId = "notes-content",
  watermarkSrc = "/assets/vigyan-square.png",
  footerImageSrc, // defaults to watermarkSrc below if not provided
  defaultStartId = "",
  defaultEndId = "",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startId, setStartId] = useState(defaultStartId);
  const [endId, setEndId] = useState(defaultEndId);
  const [error, setError] = useState("");

  const resolvedFooterImageSrc = footerImageSrc || watermarkSrc;

  const watermarkImgRef = useRef(null);
  const [watermarkErrorMsg, setWatermarkErrorMsg] = useState("");

  const footerImgRef = useRef(null);
  const [footerImageErrorMsg, setFooterImageErrorMsg] = useState("");

  // Generic preloader used for both images. Returns a cleanup-safe effect.
  const usePreloadedImage = (src, targetRef, setErrorMsg) => {
    useEffect(() => {
      if (!src) return;
      setErrorMsg("");
      let cancelled = false;

      const img = new Image();
      // No crossOrigin here — same-origin static assets don't need it,
      // and setting it can make some dev servers reject the load.
      img.onload = () => {
        if (cancelled) return;
        targetRef.current = img;
      };
      img.onerror = () => {
        if (cancelled) return;
        const msg = `Couldn't load "${src}". Check it exists at that exact path (case-sensitive) in your public folder.`;
        console.warn(msg);
        targetRef.current = null;
        setErrorMsg(msg);
      };
      img.src = src;

      return () => {
        cancelled = true;
      };
    }, [src]);
  };

  usePreloadedImage(watermarkSrc, watermarkImgRef, setWatermarkErrorMsg);
  usePreloadedImage(
    resolvedFooterImageSrc,
    footerImgRef,
    setFooterImageErrorMsg,
  );

  // ---- Smart slice algorithm to find white space and avoid cutting text ----
  const findPageBreak = (ctx, width, startY, targetY) => {
    const searchHeight = Math.floor(Math.min(targetY - startY, 1500));
    if (searchHeight <= 0) return targetY;

    try {
      const imgData = ctx.getImageData(
        0,
        targetY - searchHeight,
        width,
        searchHeight,
      ).data;
      const startX = Math.floor(width * 0.05);
      const endX = Math.floor(width * 0.95);

      // PASS 1: pure WHITE line (major gap between outer cards)
      for (let y = searchHeight - 1; y >= 0; y--) {
        let isWhite = true;
        for (let x = startX; x < endX; x += 4) {
          const idx = (y * width + x) * 4;
          if (
            imgData[idx] < 253 ||
            imgData[idx + 1] < 253 ||
            imgData[idx + 2] < 253
          ) {
            isWhite = false;
            break;
          }
        }
        if (isWhite) {
          return targetY - searchHeight + Math.max(0, y - 4);
        }
      }

      // PASS 2: SMOOTH line (minor gap inside colored cards / code blocks)
      const smoothSearchHeight = Math.min(searchHeight, 800);
      for (
        let y = searchHeight - 1;
        y >= searchHeight - smoothSearchHeight;
        y--
      ) {
        let isSmooth = true;
        for (let x = startX; x < endX - 2; x += 2) {
          const idx1 = (y * width + x) * 4;
          const idx2 = (y * width + x + 2) * 4;
          const diff =
            Math.abs(imgData[idx1] - imgData[idx2]) +
            Math.abs(imgData[idx1 + 1] - imgData[idx2 + 1]) +
            Math.abs(imgData[idx1 + 2] - imgData[idx2 + 2]);
          if (diff > 15) {
            isSmooth = false;
            break;
          }
        }
        if (isSmooth) {
          return targetY - searchHeight + Math.max(0, y - 2);
        }
      }
    } catch (e) {
      console.warn("Could not scan canvas for page break:", e);
    }

    return targetY; // Fallback to hard slice if no gap is found
  };

  // ---- Draw watermark image + footer (icon + text) on the CURRENT page ----
  const drawWatermarkAndFooter = (pdf, pdfWidth, pdfHeight, margin) => {
    // Watermark: large, faint, centered image
    const wmImg = watermarkImgRef.current;
    if (wmImg && wmImg.naturalWidth) {
      const wmWidth = pdfWidth * 0.55;
      const wmHeight = wmWidth * (wmImg.naturalHeight / wmImg.naturalWidth);
      const x = (pdfWidth - wmWidth) / 2;
      const y = (pdfHeight - wmHeight) / 2;

      pdf.saveGraphicsState();
      pdf.setGState(new pdf.GState({ opacity: 0.08 }));
      pdf.addImage(wmImg, "PNG", x, y, wmWidth, wmHeight);
      pdf.restoreGraphicsState();
    }

    // Footer: small icon + "name • designation • phone", with a thin
    // rule above it. The text stays centered on the full page width;
    // the icon sits just to the left of it.
    const footerText = [FOOTER_NAME, FOOTER_DESIGNATION, FOOTER_PHONE]
      .filter(Boolean)
      .join("   •   ");

    if (footerText) {
      const footerY = pdfHeight - margin / 2 - 2;

      pdf.setDrawColor(210, 210, 210);
      pdf.setLineWidth(0.2);
      pdf.line(margin, footerY - 4, pdfWidth - margin, footerY - 4);

      // Icon (optional — only drawn if the image loaded successfully)
      const footerImg = footerImgRef.current;
      let iconWidth = 0;
      const iconHeight = 5; // mm
      if (footerImg && footerImg.naturalWidth) {
        iconWidth =
          iconHeight * (footerImg.naturalWidth / footerImg.naturalHeight);
        const iconX = margin;
        const iconY = footerY - iconHeight + 1.2;
        pdf.addImage(footerImg, "PNG", iconX, iconY, iconWidth, iconHeight);
      }

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(90, 90, 90);
      pdf.text(footerText, pdfWidth / 2, footerY, { align: "center" });
    }
  };

  const handleGenerate = async () => {
    setError("");

    const start = startId.trim();
    const end = endId.trim();

    if (!start) {
      setError("Enter a start section ID.");
      return;
    }

    const container = document.getElementById(targetId);
    if (!container) {
      setError(`Couldn't find container with ID "${targetId}".`);
      return;
    }

    const wrapper = container.querySelector(".space-y-12") || container;
    const children = Array.from(wrapper.children);

    const startIndex = children.findIndex((el) => el.id === start);
    if (startIndex === -1) {
      setError(`Couldn't find a section with ID "${start}".`);
      return;
    }

    let endIndex = children.length - 1;
    if (end) {
      endIndex = children.findIndex((el) => el.id === end);
      if (endIndex === -1) {
        setError(`Couldn't find a section with ID "${end}".`);
        return;
      }
    }

    if (endIndex < startIndex) {
      setError("End section must come after start section.");
      return;
    }

    const allSections = children.slice(startIndex, endIndex + 1);

    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const footerReserve = 14; // extra bottom space reserved for footer
      const availableWidth = pdfWidth - 2 * margin;

      let cursorY = margin;
      let pageHasContent = false;

      const stampCurrentPage = () =>
        drawWatermarkAndFooter(pdf, pdfWidth, pdfHeight, margin);

      for (let i = 0; i < allSections.length; i++) {
        const section = allSections[i];

        const canvas = await html2canvas(section, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const pdfToCanvasRatio = canvas.width / availableWidth;

        let currentY = 0;

        while (currentY < canvas.height) {
          const availableCanvasHeight =
            (pdfHeight - footerReserve - cursorY - margin) * pdfToCanvasRatio;

          if (currentY + availableCanvasHeight >= canvas.height) {
            const sliceHeight = canvas.height - currentY;

            const sliceCanvas = document.createElement("canvas");
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceHeight;
            const sCtx = sliceCanvas.getContext("2d");
            sCtx.drawImage(
              canvas,
              0,
              currentY,
              canvas.width,
              sliceHeight,
              0,
              0,
              canvas.width,
              sliceHeight,
            );

            const imgData = sliceCanvas.toDataURL("image/jpeg", 0.8);
            const scaledHeight = sliceHeight / pdfToCanvasRatio;

            pdf.addImage(
              imgData,
              "JPEG",
              margin,
              cursorY,
              availableWidth,
              scaledHeight,
            );
            pageHasContent = true;

            cursorY += scaledHeight + 6;
            currentY = canvas.height;
          } else {
            const targetY = currentY + availableCanvasHeight;
            let sliceY = findPageBreak(ctx, canvas.width, currentY, targetY);
            if (sliceY === currentY) sliceY = targetY;

            const sliceHeight = sliceY - currentY;

            const sliceCanvas = document.createElement("canvas");
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceHeight;
            const sCtx = sliceCanvas.getContext("2d");
            sCtx.drawImage(
              canvas,
              0,
              currentY,
              canvas.width,
              sliceHeight,
              0,
              0,
              canvas.width,
              sliceHeight,
            );

            const imgData = sliceCanvas.toDataURL("image/jpeg", 0.8);
            const scaledHeight = sliceHeight / pdfToCanvasRatio;

            pdf.addImage(
              imgData,
              "JPEG",
              margin,
              cursorY,
              availableWidth,
              scaledHeight,
            );
            pageHasContent = true;

            // Stamp the page we're leaving, then start a new one
            stampCurrentPage();
            pdf.addPage();
            pageHasContent = false;
            cursorY = margin;
            currentY = sliceY;
          }
        }
      }

      if (pageHasContent || allSections.length === 0) {
        stampCurrentPage();
      }

      pdf.save(fileName || "docs.pdf");
      setIsModalOpen(false);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError(
        "Something went wrong generating the PDF. Check the console for details.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const watermarkReady = !!watermarkImgRef.current;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        aria-label="Download PDF"
      >
        <Download className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline font-medium text-sm md:text-base whitespace-nowrap">
          Download PDF
        </span>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => !isGenerating && setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !isGenerating && setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <FileDown className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold text-slate-900">
                Export PDF
              </h2>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              Pick a range of sections to include in the PDF.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Start section ID
                </label>
                <input
                  type="text"
                  value={startId}
                  onChange={(e) => setStartId(e.target.value)}
                  placeholder="e.g. introduction"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  End section ID{" "}
                  <span className="text-slate-400">
                    (optional — defaults to last section)
                  </span>
                </label>
                <input
                  type="text"
                  value={endId}
                  onChange={(e) => setEndId(e.target.value)}
                  placeholder="e.g. loops"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                />
              </div>
            </div>

            {watermarkErrorMsg && (
              <p className="text-xs text-amber-600 mt-3">{watermarkErrorMsg}</p>
            )}
            {footerImageErrorMsg &&
              footerImageErrorMsg !== watermarkErrorMsg && (
                <p className="text-xs text-amber-600 mt-1">
                  {footerImageErrorMsg}
                </p>
              )}
            {error && <p className="text-xs text-red-600 mt-3">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-wait"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing pages...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPDFButton;
