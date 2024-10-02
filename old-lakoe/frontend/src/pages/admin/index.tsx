/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Dropdown from "./components/dropDownSort";
import IconInput from "./components/iconInput";
import CardItem from "./components/cardItem";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Navbar from "./components/navbar";
import useStore from "@/z-context";
import Axios from "axios";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { name: "Semua", id: "all" },
  { name: "Menunggu", id: "waiting" },
  { name: "Dalam Proses", id: "process" },
  { name: "Selesai", id: "done" },
  { name: "Ditolak", id: "rejected" },
];

const AdminPage = () => {
  const user = useStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("all");

  const action = [
    "Terakhir Diubah",
    "Permintaan Terbaru",
    "Permintaan Terlama",
    "Nominal Tertinggi",
    "Nominal Terendah",
  ];

  const setWithdraw = useStore((state) => state.SET_WITHDRAW);
  const dataWithdraw = useStore((state) => state.withdraw);

  const fetchWithdraw = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    const res = await Axios({
      method: "get",
      url: `${api}/withdraw/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWithdraw(res.data);
  };

  const { refetch: refetchWithdraw } = useQuery({
    queryKey: ["withdrawStatus"],
    queryFn: fetchWithdraw,
  });

  // fetch withdraw
  useEffect(() => {
    const fetchWithdraw = async () => {
      const token = localStorage.getItem("token");
      const userId = user.id;
      const res = await Axios({
        method: "get",
        url: `${api}/withdraw/admin/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWithdraw(res.data);
    };

    fetchWithdraw();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("Terakhir Diubah");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortAction = (action: string) => {
    setSelectedAction(action);
  };

  const matchTab = (data: IDataWithdraw) => {
    switch (activeTab) {
      case "waiting":
        return data.status === "Menunggu";
      case "process":
        return data.status === "Diproses";
      case "done":
        return data.status === "Selesai";
      case "rejected":
        return data.status === "Ditolak";
      default:
        return data;
    }
  };

  const sortDataWithdraw = (data: IDataWithdraw[]) => {
    switch (selectedAction) {
      case "Permintaan Terbaru":
        return [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
        );
      case "Permintaan Terlama":
        return [...data].sort(
          (a, b) =>
            new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()
        );
      case "Nominal Tertinggi":
        return [...data].sort((a, b) => b.nominal - a.nominal);
      case "Nominal Terendah":
        return [...data].sort((a, b) => a.nominal - b.nominal);
      default:
        return data;
    }
  };

  const filteredDataWithdraw = dataWithdraw.filter((data) => {
    const matchSearch = data.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchTab(data) && matchSearch;
  });

  const sortedAndFilteredData = sortDataWithdraw(filteredDataWithdraw);

  const countTab = (status: string) => {
    const count = dataWithdraw.filter((data: any) => {
      switch (status) {
        case "waiting":
          return data.status === "Menunggu";
        case "process":
          return data.status === "Diproses";
        case "done":
          return data.status === "Selesai";
        case "rejected":
          return data.status === "Ditolak";
        case "all":
        default:
          return true;
      }
    }).length;

    return count > 9 ? "9+" : count;
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-4 pt-24 bg-slate-800">
        <div className="w-full bg-white min-h-screen rounded p-8">
          <p className="text-2xl font-bold">Daftar Permintaan</p>

          {/* tab */}
          <div className="w-full flex mt-4 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full py-2 text-lg ${activeTab === tab.id ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex justify-center items-center gap-2">
                  <div className="min-w-6 min-h-6 flex justify-center items-center px-2 text-white bg-blue-600 rounded-full">
                    {countTab(tab.id)}
                  </div>
                  {tab.name}
                </div>
              </button>
            ))}
          </div>

          {/* search & sort */}
          <div className="h-full flex gap-2 my-4">
            {/* search sort */}
            <IconInput value={searchTerm} onChange={handleSearchChange} />

            {/* action sort */}
            <Dropdown
              options={action && action}
              selectedOption={selectedAction}
              onSelect={handleSortAction}
            />
          </div>

          {/* result */}
          {sortedAndFilteredData.length === 0 ? (
            <div className="w-full flex justify-center items-center gap-4 border p-4 rounded shadow-md">
              <FaFileInvoiceDollar size={"4rem"} color="#909090" />
              <div>
                <p className="text-xl font-bold">Tidak ada permintaan</p>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col gap-2 overflow-y-auto">
              {sortedAndFilteredData.map((data) => (
                <CardItem
                  key={data.id}
                  dataWithdraw={data}
                  refetch={refetchWithdraw}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
