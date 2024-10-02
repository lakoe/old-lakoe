import { Input } from "@/components/input";
import { ChangeEvent, FC } from "react";
import { LuPackageSearch } from "react-icons/lu";

interface IIconInputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const IconInput: FC<IIconInputProps> = ({ value, onChange }) => {
    return (
        <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-gray-500">
                <LuPackageSearch size={'1.5rem'} />
            </span>
            <Input
                type="text"
                className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Cari Transaksi'
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default IconInput;