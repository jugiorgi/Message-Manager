import { Button } from "@chakra-ui/react";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { jsPDF } from "jspdf";

interface PdfExportProps {
  historic: {
    channel: string;
    content: string;
    createdAt: Date;
    id: string;
    origin: string;
  }[];
}

export function PdfExport({ historic }: PdfExportProps) {
  function pdfGenerate() {
    var doc = new jsPDF("portrait", "px", "a4", false);

    var historics = [];

    historic.forEach((h) => {
      historics.push({
        id: h.id.toString(),
        createdAt: format(new Date(h.createdAt), "d'/'MM'/'yyyy", {
          locale: pt,
        }),
        channel: h.channel,
        origin: h.origin,
        content: doc.splitTextToSize(h.content, 300),
      });
    });

    doc.table(
      10,
      10,
      historics,
      ["id", "createdAt", "channel", "origin", "content"],
      {
        headerBackgroundColor: "#F0E68C",
      }
    );

    doc.save("Message_Manager_Historic_Report.pdf");
  }

  return (
    <Button
      bg="yellow.500"
      color="gray.800"
      alignSelf="center"
      size="sm"
      _hover={{ textDecoration: "none", background: "yellow.600" }}
      onClick={pdfGenerate}
    >
      Baixar PDF
    </Button>
  );
}
