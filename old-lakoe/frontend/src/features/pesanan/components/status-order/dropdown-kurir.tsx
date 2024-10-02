import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropdownKurir() {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Kurir" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grab">Grab</SelectItem>
          <SelectItem value="tiki">TIKI</SelectItem>
          <SelectItem value="gojek">Gojek</SelectItem>
          <SelectItem value="jne">JNE</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
