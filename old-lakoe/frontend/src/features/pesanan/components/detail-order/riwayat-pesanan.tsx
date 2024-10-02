import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ListRiwayatPesanan } from "./list-riwayat-pesanan";

export function RiwayatPesanan(props : any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen ? (
        <>
          <h2
            className="font-bold text-blue-500 text-l flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Sembunyikan Riwayat Pesanan <IoIosArrowUp />
          </h2>

          <ListRiwayatPesanan status={props?.status} invoice={props?.invoice} />
        </>
      ) : (
        <>
          <h2
            className="font-bold text-blue-500 text-l flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Lihat Riwayat Pesanan <IoIosArrowDown />
          </h2>
        </>
      )}
    </>
  );
}
