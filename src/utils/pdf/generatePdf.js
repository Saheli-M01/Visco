import html2pdf from "html2pdf.js";

export const generatePdf = async () => {
  const element = document.getElementById("notes-content");

  if (!element) {
    console.error("Notes content not found");
    return;
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
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  await html2pdf().set(options).from(element).save();
};