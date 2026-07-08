import html2pdf from "html2pdf.js";

export const generatePdf = async () => {
  const element = document.getElementById("notes-content");

  if (!element) {
    console.error("Notes content not found");
    return;
  }

  // Make parent relative
  const originalPosition = element.style.position;
  element.style.position = "relative";

  const watermarks = [];

  // Approx printable height of one A4 page in pixels
  const pageHeight = 1040;
  const totalHeight = element.scrollHeight;
  const totalPages = Math.ceil(totalHeight / pageHeight);

  for (let i = 0; i < totalPages; i++) {
    const img = document.createElement("img");

    img.src = "/assets/vigyan-square.png";

    img.style.position = "absolute";
    img.style.left = "50%";
    img.style.top = `${i * pageHeight + pageHeight / 2}px`;

    img.style.transform = "translate(-50%, -50%)";

    img.style.width = "280px";
    img.style.opacity = "0.08";

    img.style.pointerEvents = "none";
    img.style.zIndex = "0";

    element.appendChild(img);

    watermarks.push(img);
  }

  const options = {
    margin: 10,
    filename: "Python_Programming_Notes.pdf",

    image: {
      type: "jpeg",
      quality: 0.97,
    },

    html2canvas: {
      scale: 1.2,
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
  } finally {
    watermarks.forEach((w) => w.remove());
    element.style.position = originalPosition;
  }
};