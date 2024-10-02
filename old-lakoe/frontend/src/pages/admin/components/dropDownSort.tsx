import { FC } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface IDropDownProps {
    options: string[];
    selectedOption: string;
    onSelect: (selectedOption: string) => void;
}

const Dropdown: FC<IDropDownProps> = ({ options, selectedOption, onSelect }) => {
    const handleOptionClick = (option: string) => {
        onSelect(option);
    };

    return (
        <Select onValueChange={handleOptionClick}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedOption} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Dropdown;