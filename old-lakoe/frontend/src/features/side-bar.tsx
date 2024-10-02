import { Link } from "@tanstack/react-router";
import { FiBox } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";

import Axios from "axios";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import useStore from "@/z-context";
import { BsPerson } from "react-icons/bs";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/components/use-toast";

export function SideBar() {
  const user = useStore((state) => state.user);
  console.log("test user =", user);
  const logOutUser = useStore((state) => state.logout);
  const token = localStorage.getItem("token");
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/users/stores/${user.store_id}`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("store", response.data);
        setStoreData(response.data);
        // console.log(auth.data);
      } catch (err) {
        toast({
          variant: "destructive",
          title: `Error!`,
        });
      }
    }
    getUser();
  }, []);

  return (
    <>
      <div className="bg-orange-500 w-[320px] h-screen">
        <ul>
          <div className="text-xl text-white px-10 h-screen flex flex-col justify-between">
            <div>
              {/* <h1 className="font-bold ms-4 mt-4 text-2xl text-orange-500">Lakoe App</h1> */}
              <div className="flex w-full justify-start items-center mt-4">
                <img src="/mascot.png" className="w-8 object-contain" />
                <img src="/Lakoe-w.png" className="object-contain w-5/6" />
              </div>
              <div className="mt-2">
                <li>
                  <Link
                    to="/seller/dashboard"
                    className="[&.active]:font-bold flex gap-2 items-center py-3 hover:text-2xl duration-200"
                  >
                    <GoHome /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/pesanan"
                    className="[&.active]:font-bold flex gap-2 items-center pb-3 hover:text-2xl duration-200"
                  >
                    <FiBox /> Pesanan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/produk"
                    className="[&.active]:font-bold flex gap-2 items-center pb-3 hover:text-2xl duration-200"
                  >
                    <MdOutlineShoppingBag /> Produk
                  </Link>
                </li>
                <li>
                  {/* <Link
                      to="/seller/atur-toko"
                      className="[&.active]:font-bold flex gap-2 items-center pb-3"
                    >
                      <IoSettingsOutline/> Pengaturan
              </Link> */}
                  {/* <Link
                      to="/form-produk"
                      className="[&.active]:font-bold flex gap-2 items-center pb-3"
                    >
                       Form-varian
              </Link> */}
                  <Accordion
                    type="single"
                    className="border-none hover:text-2xl duration-200"
                    collapsible
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <Link
                          to="/seller/pengaturan"
                          className="[&.active]:font-bold flex gap-2 items-center pb-3 text-lg"
                        >
                          Atur Toko
                        </Link>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <Link
                          to="/seller/pengiriman"
                          className="[&.active]:font-bold flex gap-2 items-center pb-3 text-lg"
                        >
                          Pengiriman
                        </Link>
                      </AccordionContent>
                      {/* <AccordionContent className="m-0 p-0 ms-7">
                    <Link
                      to="/metode"
                      className="[&.active]:font-bold flex gap-2 items-center pb-3"
                    >
                      Metode Pembayaran
                    </Link>
                    </AccordionContent> */}
                    </AccordionItem>
                  </Accordion>
                </li>
              </div>
            </div>
            <div className="mb-5">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-5/6 rounded-lg py-3 mb-4 cursor-pointer">
                      <p className="flex gap-2 items-center font-bold">
                        <BsPerson /> Profile
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="text-sm">
                    <DialogHeader className="border-b-2 py-3">
                      <DialogTitle>Profile Store</DialogTitle>
                    </DialogHeader>

                    {/* <div>
                      <img src={storeData?.banner_attachment} alt="banner" />
                    </div> */}

                    <div className="flex gap-5">
                      <img
                        src={storeData?.logo_attachment}
                        alt="logo"
                        className="w-1/5"
                      />

                      <div>
                        <p className="font-bold text-xl mb-1">
                          {storeData?.name}
                        </p>
                        <p className="font-light italic mb-1">
                          {storeData?.slogan}
                        </p>
                        <p>{storeData?.location[0]?.address}</p>
                      </div>
                    </div>

                    <p>{storeData?.description}</p>

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
              </li>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
