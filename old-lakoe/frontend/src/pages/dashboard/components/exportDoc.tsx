import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Document, Packer, Table, TableCell, TableRow, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { FC } from "react";
import { Button } from "@/components/button";
import { LuDownload } from "react-icons/lu";

interface IExportProps {
    dataWithdraw: IDataWithdraw[];
    selectedType: string;
}

const ExportTable: FC<IExportProps> = ({ dataWithdraw, selectedType }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["No", "ID", "Nominal", "Bank", "Rekening", "Nama", "Status", "Tanggal"];
        const tableRows: any[] = [];

        dataWithdraw.forEach((item, index) => {
            const itemData = [
                index + 1,
                item.id,
                item.nominal,
                item.bank,
                item.rekening,
                item.name,
                item.status,
                item.createdAt
            ];
            tableRows.push(itemData);
        });

        (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save("DataWithdraw.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataWithdraw);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataWithdraw.xlsx");
    };

    const handleExport = () => {
        switch (selectedType) {
            case 'pdf':
                return exportToPDF();
            case 'xlsx':
                return exportToExcel();
            default:
                return;
        }
    };

    return (
        <div>
            <Button
                onClick={handleExport}
                className="bg-white hover:bg-slate-200"
            >
                <LuDownload size={'1.3rem'} color="black" />
            </Button>
        </div>
    );
};

export default ExportTable;
