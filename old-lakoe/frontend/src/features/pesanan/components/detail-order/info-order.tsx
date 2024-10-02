import { CgProfile } from "react-icons/cg";
import { FaRegCalendar, FaRegCopy, FaWhatsapp } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";

export function InfoOrder(props : any) {
  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="py-4 px-3 text-xl">
            <FaRegCalendar />
          </div>
          <div className="w-full mr-5 flex justify-between">
            <p className="font-bold">Tanggal</p>
            <p>{new Date(props.invoice?.created_at).toString()}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="py-4 px-3 text-xl">
            <TbFileInvoice />
          </div>
          <div className="w-full mr-5 flex justify-between">
            <p className="font-bold">Invoice</p>
            <p className="flex gap-2 items-center">
              <FaRegCopy /> {props.invoice?.id}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="py-4 px-3 text-xl">
            <CgProfile />
          </div>
          <div className="w-full mr-5 flex justify-between">
            <p className="font-bold">Pembeli</p>
            <p className="flex gap-2 items-center">
              <FaWhatsapp /> {props.user?.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
