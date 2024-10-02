
import { LocationContextProvider } from "@/context/LocationContext";
import { CardLokasi } from "./cardLokasi";
// import { Location } from "@/datas/type";
export function LokasiToko() {
  return (
    <LocationContextProvider>
      <CardLokasi onSave={function (): void {
        throw new Error("Function not implemented.");
      }} />
    </LocationContextProvider>
  );
}
