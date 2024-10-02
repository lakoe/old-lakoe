/* eslint-disable */
import { Button } from "@/components/button";
import { useState } from "react";

interface opsiPengirimanType {
  nama: string;
  harga: number;
  image: string;
  IsAvailableForCOD: boolean;
}

const opsiPengiriman: opsiPengirimanType[] = [
  {
    harga: 10000,
    image: "https://static.desty.app/desty-store/jnt.png",
    IsAvailableForCOD: true,
    nama: "jnt",
  },
  {
    harga: 30000,
    image: "https://static.desty.app/desty-store/logistic-files/anteraja.png",
    IsAvailableForCOD: false,
    nama: "anteraja",
  },
  {
    harga: 50000,
    image: "https://static.desty.app/desty-store/logistic-files/jne.png",
    IsAvailableForCOD: true,
    nama: "jne",
  },
];

export default function DeliveryMethodsModal() {
  const [open, setOpen] = useState(false);
  const { setValue } = hookForm;
  const [deliveryMethod, setDeliveryMethod] = useState<
    opsiPengirimanType | undefined
  >(undefined);
  console.log("delivery method", deliveryMethod);
  return (
    <div>
      {/* Tombol Pemicu */}

      {!deliveryMethod ? (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-1 border-none bg-cyan px-14 py-6"
        >
          <p className="mx-2 text-md font-semibold">Pilih Metode Pengiriman</p>
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-sm p-3 border border-blue-400 bg-blue-100 w-72 h-20 flex justify-between hover:bg-blue-100"
        >
          <div className="w-1/3 h-full flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src={deliveryMethod.image} alt="" className="w-20 h-10" />
              <p className="text-black relative top-1 font-semibold">Reguler</p>
            </div>

            <div>
              <p className="text-slate-600 font-thin text-sm text-left">
                2-4 hari estimasi pengiriman
              </p>
            </div>
          </div>
          <div className="w-2/3 flex justify-end">
            <p className="font-bold text-blue-500">
              {formatToIDR(deliveryMethod.harga)}
            </p>
          </div>
        </Button>
      )}

      {/* Background Overlay */}
      {open && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>}

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform px-8 py-3 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-gray-50 flex items-center justify-center border-b pb-3 mb-6">
                <Button
                  variant="outline"
                  className="p-2 border-none hover:bg-white absolute top-0 right-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <LiaTimesSolid />
                </Button>
                <p className="text-xl font-semibold">Pilih metode pengiriman</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Reguler (2-4 hari)</p>
                <p>Pengiriman diatas jam 3 berpotensi dikirim besok</p>

                <div className="flex flex-col gap-2">
                  {opsiPengiriman.map((data) => (
                    <Button
                      key={data.nama}
                      onClick={() => {
                        setOpen(false);
                        setValue("deliveryMethod", data.nama);
                        setDeliveryMethod({
                          harga: data.harga,
                          image: data.image,
                          IsAvailableForCOD: data.IsAvailableForCOD,
                          nama: data.nama,
                        });
                      }}
                      className="bg-white p-2 h-14 hover:bg-blue-200 rounded-sm"
                    >
                      <DeliveryOptionCard
                        key={data.nama}
                        IsAvailableForCOD={data.IsAvailableForCOD}
                        deliveryName={data.nama}
                        img={data.image}
                        price={data.harga}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
