import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropdownUrutan() {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Urutkan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paling lama">Paling Lama</SelectItem>
          <SelectItem value="paling baru">Paling Baru</SelectItem>
          <SelectItem value="respon tercepat">Respon Tercepat</SelectItem>
          <SelectItem value="respon terlama">Respon Terlama</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
