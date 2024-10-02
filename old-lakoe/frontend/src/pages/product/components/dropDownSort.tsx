import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IDropDownProps {
  options: ICategories[] | IActions[] | undefined;
  selectedOption: string;
  onSelect: (selectedOption: string) => void;
}

const DropdownSort: FC<IDropDownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const handleOptionClick = (option: string) => {
    onSelect(option);
  };

  //   console.log("Options", options);
  return (
    <Select onValueChange={handleOptionClick}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={selectedOption} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Semua">Semua</SelectItem>
        {options ? (
          options.map((option) => (
            <SelectItem key={option?.id} value={option?.id}>
              {option?.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="empty" disabled>
            Belum ada kategori
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default DropdownSort;
