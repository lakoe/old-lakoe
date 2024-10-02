import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { FC } from "react";

interface ITableProps {
  dataWithdraw: IDataWithdraw[];
}

const TableWithdraw: FC<ITableProps> = ({ dataWithdraw }) => {
  return (
    <Table>
      <TableHeader className="bg-orange-500 text-white">
        <TableRow>
          <TableHead className="text-center text-white">No</TableHead>
          <TableHead className="text-center text-white">Withdraw ID</TableHead>
          <TableHead className="text-center text-white">Amount</TableHead>
          <TableHead className="text-center text-white">Status</TableHead>
          <TableHead className="text-center text-white">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataWithdraw.map((withdraw, index) => (
          <TableRow key={withdraw.id} className="bg-white">
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center">{withdraw.id}</TableCell>
            <TableCell className="text-center">Rp{withdraw.nominal}</TableCell>
            <TableCell className="text-center">{withdraw.status}</TableCell>
            <TableCell className="text-center">
              {new Date(withdraw.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableWithdraw;
