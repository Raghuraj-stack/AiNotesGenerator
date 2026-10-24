import PDFDocument from "pdfkit";

const clean = (text) => String(text ?? "").replace(/[#*`]/g, "");

export const pdfDownload = async (req, res) => {
  // Frontend sends the whole response {data, noteId, creditsLeft}
  const body = req.body?.result;
  const result = body?.data ?? body;

  // Validate BEFORE starting the PDF stream
  if (!result || typeof result !== "object") {
    return res.status(400).json({ message: "No result data provided" });
  }

  let doc;
  try {
    doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();

    const subTopics = Array.isArray(result.subTopics) ? result.subTopics : [];

    // Quick view: topics grouped by priority
    if (subTopics.length) {
      doc.fontSize(16).text("Sub Topics (Priority Wise)");
      doc.moveDown(0.5);

      [
        ["high", "High Priority"],
        ["medium", "Medium Priority"],
        ["low", "Low Priority"],
      ].forEach(([level, label]) => {
        const items = subTopics.filter(
          (t) => String(t.importance).toLowerCase() === level
        );
        if (!items.length) return;

        doc.fontSize(13).text(`${label}:`);
        items.forEach((t) => doc.fontSize(12).text(`• ${clean(t.title)}`));
        doc.moveDown(0.5);
      });

      doc.moveDown();

      // Detailed notes
      doc.fontSize(16).text("Detailed Notes");
      doc.moveDown(0.5);

      subTopics.forEach((t, i) => {
        doc
          .fontSize(13)
          .text(`${i + 1}. ${clean(t.title)} (${t.importance || "n/a"})`);
        doc.fontSize(12).text(clean(t.notes));
        doc.moveDown(0.7);
      });

      doc.moveDown();
    }

    // Revision Points
    if (Array.isArray(result.revisionPoints) && result.revisionPoints.length) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);
      result.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${clean(p)}`);
      });
      doc.moveDown();
    }

    // Questions
    const q = result.questions;
    if (q) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      if (Array.isArray(q.short) && q.short.length) {
        doc.fontSize(13).text("Short Questions:");
        q.short.forEach((s) => doc.fontSize(12).text(`• ${clean(s)}`));
        doc.moveDown(0.5);
      }
      if (Array.isArray(q.long) && q.long.length) {
        doc.fontSize(13).text("Long Questions:");
        q.long.forEach((s) => doc.fontSize(12).text(`• ${clean(s)}`));
        doc.moveDown(0.5);
      }
      if (q.diagram) {
        doc.fontSize(13).text("Diagram Question:");
        doc.fontSize(12).text(clean(q.diagram));
      }
    }

    doc.end();
  } catch (error) {
    console.error("PDF download error:", error);
    if (doc) {
      doc.unpipe(res); // stop writing into the response
      doc.destroy();
    }
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to generate PDF" });
    } else {
      res.end();
    }
  }
};