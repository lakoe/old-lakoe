import { Card } from "@/components/card";
import { HeaderPengaturan } from "@/features/headerPengaturan";
import { MainSetting } from "@/features/mainInformasi";

export function Setting() {
  return (
    <>
      <Card className="">
        <HeaderPengaturan />
        <MainSetting />
      </Card>
    </>
  );
}
