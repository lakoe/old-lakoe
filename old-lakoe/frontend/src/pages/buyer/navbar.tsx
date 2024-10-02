import { TableCart } from "@/buyer/pages/table-cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import useStore from "@/z-context";
import { Link } from "@tanstack/react-router";

export function Navbar(props: any) {
  const logOutUser = useStore((state) => state.logout);
  const user = useStore((state) => state.user);
  return (
    <div className="fixed right-0 left-0 top-0 z-50 flex justify-between items-center font-bold p-2 px-10 drop-shadow-sm pb-4 shadow-black bg-orange-500 ">
      <Link to="/buyer/dashboard">
        <h1 className="font-extrabold text-2xl text-white">LAKOEBUYER</h1>
      </Link>
      {/* <h1 className="text-xl text-white">Daftar Produk</h1> */}

      <div className="flex items-center gap-4">
        <TableCart refetch={props?.refetch} />

        <Dialog>
          <DialogTrigger asChild>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"
              className="rounded-full h-12 object-contain hover:cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className="text-sm">
            <DialogHeader className="border-b-2 py-3">
              <DialogTitle>My Profile</DialogTitle>
            </DialogHeader>

            <div className="flex gap-5">
              <p className="font-bold text-xl mb-1">{user.name}</p>
            </div>

            <Link
              to="/auth/login"
              className="[&.active]:font-bold text-lg flex justify-end gap-2 items-center"
              onClick={logOutUser}
            >
              <button className="bg-red-600 px-4 py-1 text-white rounded-lg">
                Logout
              </button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
