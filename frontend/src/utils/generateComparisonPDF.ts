import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Locality {
  locality: string;
  investmentScore: number;
  priceGrowth: number;
  metroConnectivity: number;
  schoolsNearby: number;
  hospitalsNearby: number;
  shoppingScore: number;
}

export function generateComparisonPDF(
  first: Locality,
  second: Locality
) {
  const winner =
    first.investmentScore >= second.investmentScore
      ? first
      : second;

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("PropIntel AI", 70, 20);

  doc.setFontSize(16);
  doc.text("Locality Comparison Report", 52, 32);

  doc.setFontSize(12);
  doc.text(`Compared Localities`, 14, 48);

  doc.text(first.locality, 20, 56);
  doc.text(second.locality, 20, 64);

  doc.text(`Winner : ${winner.locality}`, 14, 78);

  autoTable(doc, {
    startY: 90,
    head: [
      [
        "Metric",
        first.locality,
        second.locality,
      ],
    ],
    body: [
      [
        "Investment Score",
        first.investmentScore,
        second.investmentScore,
      ],
      [
        "Price Growth",
        first.priceGrowth,
        second.priceGrowth,
      ],
      [
        "Metro",
        first.metroConnectivity,
        second.metroConnectivity,
      ],
      [
        "Schools",
        first.schoolsNearby,
        second.schoolsNearby,
      ],
      [
        "Hospitals",
        first.hospitalsNearby,
        second.hospitalsNearby,
      ],
      [
        "Shopping",
        first.shoppingScore,
        second.shoppingScore,
      ],
    ],
  });

  const finalY =
    (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(14);

  doc.text("AI Recommendation", 14, finalY);

  doc.setFontSize(11);

  doc.text(
    `${winner.locality} is recommended for long-term investment because it has a higher investment score and stronger overall locality metrics.`,
    14,
    finalY + 10,
    {
      maxWidth: 180,
    }
  );

  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    14,
    finalY + 35
  );

  doc.save(
    `${first.locality}_vs_${second.locality}.pdf`
  );
}