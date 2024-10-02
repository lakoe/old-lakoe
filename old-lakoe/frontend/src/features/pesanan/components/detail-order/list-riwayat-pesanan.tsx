import { useEffect } from "react";

export function ListRiwayatPesanan(props: any) {
  useEffect(() => {
    console.log("histories", props.invoice?.invoice_histories);
  }, []);
  return (
    <>
      <div className="border rounded-lg p-5 pl-7 mt-1 text-sm">
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {props.invoice?.invoice_histories.map((value: any) => {
            return (
              <li className="mb-5 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <svg
                    className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">{value.status}</h3>
                <p className="text-sm">
                  {new Date(value.created_at).toString()}
                </p>
              </li>
            );
          })}

          {/* <li className="mb-5 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Produk Telah Dikirim</h3>
            <p className="text-sm">Sen, 12 Agustus 2024 - 10:00 WIB</p>
          </li>
          <li className="mb-5 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Pesanan Diproses</h3>
            <p className="text-sm">Sen, 12 Agustus 2024 - 10:00 WIB</p>
          </li>
          <li className="mb-5 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">
              Pembayaran Terverifikasi
            </h3>
            <p className="text-sm">Sen, 12 Agustus 2024 - 10:00 WIB</p>
          </li>
          <li className="ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Pesanan Dibuat</h3>
            <p className="text-sm">Sen, 12 Agustus 2024 - 10:00 WIB</p>
          </li> */}
        </ol>
      </div>
    </>
  );
}
