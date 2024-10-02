import { Outlet } from "@tanstack/react-router";
// import { Toaster } from "./components/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import { useEffect } from "react";
import useStore from "./z-context";
import { api } from "./lib/api";

const queryClient = new QueryClient();

function App() {
  // const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.SET_USER);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function auth() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/login/auth`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("res", response.data);
        return setUser(response.data);
      } catch (error) {
        return localStorage.removeItem("token");
      }
    }
    auth();
  }, []);
  return (
    <>
      <div className="w-full bg-slate-800 h-screen">
        {/* <img src="/bg.jpg" className="w-full h-full z-0 absolute object-cover bg-cover"></img> */}
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}

export default App;
