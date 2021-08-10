import { CSVLink } from "react-csv";

interface CsvExportProps {
  historic: {
    channel: string;
    content: string;
    createdAt: Date;
    id: string;
    origin: string;
  }[];
}

export function CsvExport({ historic }: CsvExportProps) {
  const headers = [
    { label: "Id", key: "id" },
    { label: "Channel", key: "channel" },
    { label: "Origin", key: "origin" },
    { label: "Content", key: "content" },
    { label: "Date", key: "createdAt" },
  ];

  const csvReport = {
    data: historic,
    headers: headers,
    filename: "Message_Manager_Historic_Report.csv",
    target: "_blank",
  };
  return <CSVLink {...csvReport}>Exportar CSV</CSVLink>;
}
