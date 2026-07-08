import html2pdf from "html2pdf.js";

export const generatePdf = async () => {
    const element = document.getElementById("notes-content");

    if (!element) {
        console.error("Notes content not found");
        return;
    }

    // Set container to position relative to support absolute positioning of watermarks
    const originalPosition = element.style.position;
    element.style.position = "relative";

    const watermarks = [];
    const elementHeight = element.offsetHeight;

    // An A4 page at 96 dpi has a height of ~1122 pixels.
    // With 10mm margins, the printable area height is 277mm,
    // which at 96 dpi is (277 / 25.4) * 96 ≈ 1047 pixels.
    const pageHeight = 1047;
    const numPages = Math.ceil(elementHeight / pageHeight);

    // Create and append a watermark on every page
    for (let i = 0; i < numPages; i++) {
        const watermark = document.createElement("div");
        watermark.className = "pdf-watermark";
        watermark.style.position = "absolute";
        watermark.style.left = "0";
        watermark.style.right = "0";
        // Center the watermark vertically on the current virtual page
        watermark.style.top = `${i * pageHeight + (pageHeight / 2) - 150}px`;
        watermark.style.display = "flex";
        watermark.style.justifyContent = "center";
        watermark.style.alignItems = "center";
        watermark.style.opacity = "0.08"; // very light / transparent
        watermark.style.pointerEvents = "none";
        watermark.style.zIndex = "0"; // behind the text

        const img = document.createElement("img");
        img.src = "/assets/vigyan-square.png";
        img.style.width = "300px";
        img.style.height = "auto";

        watermark.appendChild(img);
        element.appendChild(watermark);
        watermarks.push(watermark);
    }

    const options = {
        margin: 10,
        filename: "Python_Programming_Notes.pdf",
        image: {
            type: "jpeg",
            quality: 1,
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
        },
    };

    try {
        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error("PDF generation failed:", error);
    } finally {
        // Clean up: remove watermarks and restore original positioning style
        watermarks.forEach(wm => wm.remove());
        element.style.position = originalPosition;
    }
};