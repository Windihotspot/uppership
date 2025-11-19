import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadInvoicePDF = (invoice) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Invoice", 14, 20);

  // Invoice Details
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 35);
  doc.text(`Date Issued: ${invoice.dateIssued}`, 14, 42);
  doc.text(`Due Date: ${invoice.dueDate}`, 14, 49);

  // Billed To Section
  doc.text("Billed To:", 14, 65);
  doc.text(invoice.billedTo.name, 14, 72);
  doc.text(invoice.billedTo.address, 14, 79);
  doc.text(`${invoice.billedTo.city}`, 14, 86);
  doc.text(`Phone: ${invoice.billedTo.phone}`, 14, 93);

  // Create line-item rows
  const tableRows = invoice.items.map((item) => [
    item.description,
    item.quantity,
    `$${item.unitCost.toFixed(2)}`,
    `$${(item.quantity * item.unitCost).toFixed(2)}`
  ]);

  // Table
  doc.autoTable({
    startY: 110,
    head: [["Description", "Qty", "Unit Cost", "Total"]],
    body: tableRows,
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // Summary Section
  doc.setFontSize(12);
  doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 140, finalY);
  doc.text(`Tax (${(invoice.taxRate * 100).toFixed(0)}%): $${invoice.tax.toFixed(2)}`, 140, finalY + 7);
  doc.text(`Grand Total: $${invoice.total.toFixed(2)}`, 140, finalY + 20);

  // Save the file
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};
