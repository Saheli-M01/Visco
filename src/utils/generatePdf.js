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

// Wait for the browser to fully paint the cloned element
const waitForPaint = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTimeout(resolve, 300))
    )
  );

/**
 * Copy all *computed* styles from every node in `source` onto the
 * corresponding node in `target`.  html2canvas sometimes misses
 * Tailwind / CSS-variable-resolved styles, so we inline them.
 */
const inlineComputedStyles = (source, target) => {
  const srcNodes = source.querySelectorAll("*");
  const tgtNodes = target.querySelectorAll("*");

  // Inline styles on the root element itself
  const rootCS = getComputedStyle(source);
  target.style.cssText = rootCS.cssText;
  // Ensure the clone is visible and block-level
  target.style.position = "absolute";
  target.style.left = "0";
  target.style.top = "0";
  target.style.zIndex = "-9999";
  target.style.overflow = "visible";
  target.style.width = source.scrollWidth + "px";

  for (let i = 0; i < srcNodes.length && i < tgtNodes.length; i++) {
    try {
      const cs = getComputedStyle(srcNodes[i]);
      tgtNodes[i].style.cssText = cs.cssText;
    } catch {
      // skip non-element nodes
    }
  }
};

export const generatePdf = async ({ onStart, onEnd } = {}) => {
  const element = document.getElementById("notes-content");

  if (!element) {
    console.error("Notes content not found");
    return;
  }

  if (onStart) onStart();

  // ── 1. Clone the element and attach it to <body> ──────────────────
  // This completely bypasses all parent overflow / flex / height constraints
  // that prevent html2canvas from seeing the content.
  const clone = element.cloneNode(true);
  clone.id = "notes-content-pdf-clone";

  // Remove any page-break spacing from the clone
  const spaceParent = clone.querySelector(".space-y-12");
  if (spaceParent) {
    spaceParent.classList.remove("space-y-12");
    spaceParent.classList.add("space-y-0");
  }

  // Inline all computed styles so html2canvas doesn't miss Tailwind classes
  inlineComputedStyles(element, clone);

  // Append to body — outside any overflow-hidden ancestor
  document.body.appendChild(clone);

  // Let the browser layout + paint the clone
  await waitForPaint();

  // ── 2. Load logo for watermark + footer ────────────────────────────
  const logoImg = await loadImage("/assets/vigyan-square.png");

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

  // ── 3. html2pdf options ────────────────────────────────────────────
  const cloneWidth = clone.scrollWidth;
  const cloneHeight = clone.scrollHeight;

  const options = {
    margin: [10, 5, 15, 5],
    filename: "Python_Programming_Notes.pdf",
    image: { type: "jpeg", quality: 0.97 },
    html2canvas: {
      scale: 1.2,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: cloneWidth,
      height: cloneHeight,
      windowWidth: cloneWidth,
      windowHeight: cloneHeight,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: {
      mode: ["css", "legacy"],
      before: ".html2pdf__page-break",
    },
  };

  // ── 4. Generate PDF from the clone ─────────────────────────────────
  try {
    await html2pdf()
      .set(options)
      .from(clone)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const watermarkWidth = 75;
        const watermarkHeight = 75;
        const watermarkX = (pageWidth - watermarkWidth) / 2;
        const watermarkY = (pageHeight - watermarkHeight) / 2;

        const logoWidth = 4.2;
        const logoHeight = 4.2;
        const gap = 1.5;
        const yPos = pageHeight - 9;

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

          pdf.setTextColor(100, 116, 139);
          const text1X = startX + logoWidth + gap;
          pdf.text(text1, text1X, yPos);

          pdf.setTextColor(79, 70, 229);
          const text2X = text1X + width1;
          pdf.textWithLink(text2, text2X, yPos, {
            url: "https://sahelimondal.in",
          });
        }
      })
      .save();
  } catch (err) {
    console.error("PDF generation failed:", err);
  } finally {
    // ── 5. Clean up the clone ──────────────────────────────────────
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
    if (onEnd) onEnd();
  }
};