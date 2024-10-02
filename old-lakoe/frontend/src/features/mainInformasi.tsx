import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { HeaderInformasiToko } from "./headerPengaturan";
import { FormInformasiToko } from "./informasi";
// import { TemplatePesan } from "./templatePesan";
import { Label } from "@/components/label";
import { TemplateContextProvider } from "@/context/TemplateContext";
import { CardLokasi } from "./cardLokasi copy";
import { CardTemplate } from "./cardTemplatePesan";
import useStore from "@/z-context";

export function MainSetting() {
  const user = useStore((state) => state.user);
  return (
    <>
      <div className="m-4 p-10 rounded-sm bg-white h-screen">
        <div className="mb-5">
          <Label className="font-bold text-2xl">{user.store.name}</Label>
        </div>
        <Tabs defaultValue="informasi">
          <div>
            <TabsList className="border-b-2">
              <TabsTrigger value="informasi">Informasi</TabsTrigger>
              <TabsTrigger value="lokasi">Lokasi</TabsTrigger>
              <TabsTrigger value="templatePesan">Template Pesan</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="informasi">
            <HeaderInformasiToko />
            {/* <InformasiList /> */}
            <FormInformasiToko />
          </TabsContent>
          <TabsContent value="lokasi">
            {/* <LocationContextProvider> */}
            <CardLokasi />
            {/* </LocationContextProvider> */}
          </TabsContent>
          <TabsContent value="templatePesan">
            <TemplateContextProvider>
              <CardTemplate
                onSave={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </TemplateContextProvider>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
