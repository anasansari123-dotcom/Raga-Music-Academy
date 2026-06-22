import PDFDocument from "pdfkit";
import path from "path";
import { siteConfig } from "@/lib/data";
import { formatCurrency, getStatusLabel } from "@/lib/payment-types";

export type ReceiptData = {
  receiptNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amount: number;
  description: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  paidAt: string;
  status: "paid" | "verified";
};

export async function generateReceiptPdf(data: ReceiptData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const logoPath = path.join(process.cwd(), "public", "logo1.jpeg");

    try {
      doc.image(logoPath, 50, 45, { width: 60 });
    } catch {
      // Logo optional if file missing
    }

    doc
      .fontSize(22)
      .fillColor("#4a1942")
      .text(siteConfig.name, 120, 50, { continued: false });

    doc
      .fontSize(11)
      .fillColor("#6b2d5b")
      .text(siteConfig.tagline, 120, 78);

    doc
      .fontSize(10)
      .fillColor("#555")
      .text(siteConfig.phone, 120, 96);

    doc.moveDown(2);

    doc
      .fontSize(20)
      .fillColor("#1a1520")
      .text("Payment Receipt", { align: "center" });

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("#666")
      .text(`Receipt No: ${data.receiptNumber}`, { align: "center" });

    doc.moveDown(1.5);

    const leftX = 50;
    const rightX = 300;
    let y = doc.y;

    const row = (label: string, value: string, x: number, rowY: number) => {
      doc.fontSize(10).fillColor("#888").text(label, x, rowY);
      doc.fontSize(11).fillColor("#1a1520").text(value, x, rowY + 14, {
        width: 220,
      });
    };

    row("Student Name", data.userName, leftX, y);
    row("Email", data.userEmail, rightX, y);
    y += 48;

    row("Phone", data.userPhone, leftX, y);
    row("Date & Time", new Date(data.paidAt).toLocaleString("en-IN"), rightX, y);
    y += 48;

    row("Payment Purpose", data.description, leftX, y);
    row("Amount Paid", formatCurrency(data.amount), rightX, y);
    y += 48;

    row("Razorpay Payment ID", data.razorpayPaymentId, leftX, y);
    row("Razorpay Order ID", data.razorpayOrderId, rightX, y);
    y += 48;

    doc.y = y + 10;

    const statusColor = data.status === "verified" ? "#166534" : "#92400e";
    doc
      .fontSize(12)
      .fillColor(statusColor)
      .text(`Status: ${getStatusLabel(data.status)}`, leftX);

    doc.moveDown(2);

    doc
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .strokeColor("#e8d5a3")
      .stroke();

    doc.moveDown(1);

    doc
      .fontSize(9)
      .fillColor("#666")
      .text(
        "This receipt is valid after admin verification. For queries, contact us on WhatsApp or email.",
        50,
        doc.y,
        { align: "center", width: 495 }
      );

    doc
      .fontSize(9)
      .fillColor("#999")
      .text(`${siteConfig.name} — ${siteConfig.siteUrl}`, 50, doc.page.height - 60, {
        align: "center",
        width: 495,
      });

    doc.end();
  });
}
