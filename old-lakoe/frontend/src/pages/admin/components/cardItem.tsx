import { FC } from "react";
import { GoDotFill } from "react-icons/go";
import ProcessDialog from "./processDialog";
import RejectDialog from "./rejectDialog";
import DoneDialog from "./doneDialog";

interface ICardItemProps {
  dataWithdraw: IDataWithdraw;
  refetch: any;
}

const CardItem: FC<ICardItemProps> = ({ dataWithdraw, refetch }) => {
  return (
    <div className="w-full border p-4 rounded shadow-md">
      <div className="w-full flex items-center gap-4">
        <img
          src="https://cdn-icons-png.freepik.com/512/10074/10074041.png"
          alt={dataWithdraw.name}
          width={"90rem"}
        />

        <div className="w-full">
          <div className="flex flex-col">
            <p className="flex flex-1 text-2xl font-bold">
              {dataWithdraw.name}
            </p>

            <div className="flex">
              <div className="flex flex-1 items-center gap-2">
                <p className="text-xl">Rp{dataWithdraw.nominal}</p>
                <GoDotFill color="#909090" />
                <p className="text-xl">{dataWithdraw.bank}</p>
                <GoDotFill color="#909090" />
                <p className="text-xl">{dataWithdraw.rekening}</p>
              </div>
              {dataWithdraw.status === "Menunggu" && (
                <div className="flex gap-2">
                  <RejectDialog dataWithdraw={dataWithdraw} refetch={refetch} />

                  <ProcessDialog
                    dataWithdraw={dataWithdraw}
                    refetch={refetch}
                  />
                </div>
              )}

              {dataWithdraw.status === "Diproses" && (
                <DoneDialog dataWithdraw={dataWithdraw} />
              )}

              {dataWithdraw.status === "Ditolak" && (
                <p className="text-red-600">* Permintaan ditolak</p>
              )}

              {dataWithdraw.status === "Selesai" && (
                <p className="text-green-600">* Permintaan selesai</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
