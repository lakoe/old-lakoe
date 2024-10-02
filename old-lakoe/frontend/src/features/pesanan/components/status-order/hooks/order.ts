import { api } from "@/lib/api";
import Axios from "axios";
import { useForm } from "react-hook-form";

export const formCourier = (invID : string) => {
    const formOrderCourier = useForm();
    async function onSubmit(){
        await Axios({
            method: "post",
            url: `${api}/form-produk/order-couriers/${invID}`,
            headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
             },
            })
    }

    return {
        formOrderCourier,
        onSubmit
    }
}