import { AddLocation } from "@/components/AddLocationDialog copy";
import { LocationCard } from "@/components/LocationCard copy";

export function CardLokasi() {
  return (
    <>
      <div className="w-full">
        <AddLocation />
        <div className="bg-white">
          <LocationCard />
        </div>
      </div>
    </>
  );
}
