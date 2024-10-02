/* eslint-disable */
import { TemplatePesan } from "@/datas/type";
import { CardTemplate } from "./cardTemplatePesan";
// import { TemplatePesanHeader } from "./headerPengaturan";

export function TemplatePesan() {
  return (
    <>
      {/* <TemplatePesanHeader /> */}
      <CardTemplate onSave={function (templates: TemplatePesan[]): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
}
