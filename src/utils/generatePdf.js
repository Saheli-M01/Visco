import html2pdf from "html2pdf.js";

const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generatePdf = async ({ onStart, onEnd } = {}) => {
  const element = document.getElementById("notes-content");

  if (!element) {
    console.error("Notes content not found");
    return;
  }

  if (onStart) onStart();

  const originalPosition = element.style.position;
  element.style.position = "relative";

  // ── Strip spacing from page-break wrappers so new pages start from the top ──
  const pageBreakEls = element.querySelectorAll(".pdf-page-break");
  const savedStyles = [];

  pageBreakEls.forEach((el) => {
    // Save original inline styles
    savedStyles.push({
      el,
      marginTop: el.style.marginTop,
      paddingTop: el.style.paddingTop,
    });
    // Force zero spacing
    el.style.marginTop = "0px";
    el.style.paddingTop = "0px";
  });

  // Also strip the space-y-12 gap applied by the parent container
  const spaceParent = element.querySelector(".space-y-12");
  let savedGap = "";
  if (spaceParent) {
    savedGap = spaceParent.style.gap;
    // Override the Tailwind space-y utility by switching to explicit gap: 0
    // and removing the margin-based spacing
    spaceParent.style.setProperty("--tw-space-y-reverse", "0");
    pageBreakEls.forEach((el) => {
      el.style.setProperty("margin-top", "0px", "important");
    });
  }

  // Force browser reflow so html2canvas captures the updated layout
  void element.offsetHeight;

  // Pre-load the logo image for watermark and footer
  const logoImg = await loadImage("/assets/vigyan-square.png");

  // Create low-opacity watermark data URL using a temporary canvas
  let watermarkDataUrl = null;
  if (logoImg) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = logoImg.naturalWidth || logoImg.width;
      canvas.height = logoImg.naturalHeight || logoImg.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalAlpha = 0.08;
        ctx.drawImage(logoImg, 0, 0);
        watermarkDataUrl = canvas.toDataURL("image/png");
      }
    } catch (e) {
      console.error("Failed to generate watermark canvas:", e);
    }
  }

  const options = {
    margin: [10, 5, 15, 5], // top, left, bottom, right in mm (increases bottom margin to 15mm)
    filename: "Python_Programming_Notes.pdf",
    image: { type: "jpeg", quality: 0.97 },
    html2canvas: { scale: 1.2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css"] },
  };

  try {
    await html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Watermark dimensions
        const watermarkWidth = 75;
        const watermarkHeight = 75;
        const watermarkX = (pageWidth - watermarkWidth) / 2;
        const watermarkY = (pageHeight - watermarkHeight) / 2;

        // Footer dimensions & setup
        const logoWidth = 4.2;
        const logoHeight = 4.2;
        const gap = 1.5;
        const yPos = pageHeight - 9; // Centered in the 15mm bottom margin

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);

        const text1 = "SM \u00B7 BTech in CS \u00B7 ";
        const text2 = "sahelimondal.in";

        const width1 = pdf.getTextWidth(text1);
        const width2 = pdf.getTextWidth(text2);
        const totalFooterWidth = logoWidth + gap + width1 + width2;
        const startX = (pageWidth - totalFooterWidth) / 2;

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // 1. Draw Watermark in the center of the page
          if (watermarkDataUrl) {
            pdf.addImage(
              watermarkDataUrl,
              "PNG",
              watermarkX,
              watermarkY,
              watermarkWidth,
              watermarkHeight
            );
          }

          // 2. Draw Footer Elements in the bottom margin (white space)
          // Draw small logo
          if (logoImg) {
            pdf.addImage(
              logoImg,
              "PNG",
              startX,
              yPos - 3.6,
              logoWidth,
              logoHeight
            );
          }

          // Draw Text 1
          pdf.setTextColor(100, 116, 139); // Slate-500 (#64748b)
          const text1X = startX + logoWidth + gap;
          pdf.text(text1, text1X, yPos);

          // Draw Text 2 (hyperlink)
          pdf.setTextColor(79, 70, 229); // Indigo-600 (#4f46e5)
          const text2X = text1X + width1;
          pdf.textWithLink(text2, text2X, yPos, {
            url: "https://sahelimondal.in",
          });
        }
      })
      .save();
  } finally {
    // ── Restore all original styles ──
    element.style.position = originalPosition;

    savedStyles.forEach(({ el, marginTop, paddingTop }) => {
      el.style.marginTop = marginTop;
      el.style.paddingTop = paddingTop;
    });

    if (spaceParent) {
      spaceParent.style.gap = savedGap;
    }

    if (onEnd) onEnd();
  }
};