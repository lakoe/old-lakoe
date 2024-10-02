import { Button } from "@/components/button";
import { Label } from "@/components/label";
import AddCategoriesDialog from "./addCategoriesDialog";
import AddVoucherDialog from "./addVoucherDialog";
import { Link } from "@tanstack/react-router";
import useStore from "@/z-context";

const Navbar = () => {
  const logOutUser = useStore((state) => state.logout);
  return (
    <div className="w-full flex items-center p-4 px-8 bg-orange-500 fixed z-50 shadow-lg">
      <Link
        to="/auth/login"
        className="[&.active]:font-bold text-lg flex justify-end gap-2 items-center me-4"
        onClick={logOutUser}
      >
        <Button className="bg-red-600 px-4 py-1 text-white rounded-lg text-lg">
          Logout
        </Button>
      </Link>
      <div className="flex flex-1">
        <Label className="text-2xl font-bold text-white">Lakoe Admin</Label>
      </div>

      <div className="flex items-center gap-2">
        <AddCategoriesDialog />
        <AddVoucherDialog />
      </div>
    </div>
  );
};

export default Navbar;
