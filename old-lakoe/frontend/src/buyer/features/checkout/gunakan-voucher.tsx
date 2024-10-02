import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Input } from "@/components/input";
import useStore from "@/z-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import Axios from "axios";
import { api } from "@/lib/api";
import { useState } from "react";
import { BsTicket } from "react-icons/bs";

export function GunakanVoucher() {
  const setDisc = useStore((state) => state.SET_DISCOUNT);
  const deleteDisc = useStore((state) => state.DELETE_DISCOUNT);
  const disc = useStore((state) => state.discount);

  const [code, setCode] = useState("");

  async function onSumbitDisc() {
    try {
      console.log("hit", code);
      const response = await Axios({
        method: "get",
        url: `${api}/buyers/discount/${code}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const dataDiscount = {
          code: response.data.code,
          amount: response.data.amount,
          id: response.data.id,
        };

        setDisc(dataDiscount);
        console.log(disc);
      }
    } catch (err) {
      console.log(err);
      deleteDisc();
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="shadow text-white w-5/6 rounded-lg py-3 flex justify-center mb-4 cursor-pointer bg-slate-800 hover:bg-slate-500">
            <p className="flex gap-2 items-center font-bold">
              <BsTicket className="w-6 h-6" /> Gunakan / Masukkan Voucher{" "}
              <IoIosArrowForward />
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="text-sm">
          <DialogHeader className="border-b-2 py-3">
            <DialogTitle>Pilih Diskon Voucher</DialogTitle>

            <div className="flex gap-3 pt-3">
              <Input
                placeholder="Masukkan kode voucher"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                type="button"
                className="bg-slate-800"
                onClick={onSumbitDisc}
              >
                Terapkan
              </Button>
            </div>
          </DialogHeader>

          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                {disc.amount > 0 && (
                  <div className="flex justify-start items-center gap-4">
                    <p className="font-semibold">Discount Applied :</p>
                    <p className="font-bold text-lg">
                      {disc.code} - {disc.amount}% Off
                    </p>
                  </div>
                )}
                {/* <AccordionTrigger>Pilih voucher yang tersedia</AccordionTrigger>
                {disc && (
                  <AccordionContent>
                    {disc.code} & {disc.amount}
                  </AccordionContent>
                )} */}
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
