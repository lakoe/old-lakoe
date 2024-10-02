import { MainSetting } from "@/features/mainInformasi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: () => (
    <div>
      <MainSetting />
      {/* <LocationContextProvider><CardLokasi onSave={function (): void {
      throw new Error('Function not implemented.')
    }} /></LocationContextProvider> */}
      {/* <MapComponent /> */}
    </div>
  ),
});
