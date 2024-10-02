import useStore from "@/z-context";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../components/use-toast";
import { api } from "@/lib/api";


export type formDTO = {
  produk_nama: string,
  produk_url_checkout: string,
  produk_kategori: string,
  produk_deskripsi: string,
  produk_foto: any
  produk_foto_1: any
  produk_foto_2: any
  produk_foto_3: any
  produk_foto_4: any
  produk_harga: number,
  produk_min_beli: number,
  produk_stok: number,
  produk_sku: string,
  produk_berat: number,
  produk_panjang: number,
  produk_lebar: number,
  produk_tinggi: number,
  produk_ukuran_option: string[]
  produk_ukuran_option_weight: number[]
  produk_ukuran_option_img: any[]
  produk_ukuran_option_sku: string[]
  produk_ukuran_option_stock: number[]
  produk_ukuran_option_price: number[]
  produk_ukuran_option_is_active: boolean[] | true
  produk_ukuran_option_panjang: number[]
  produk_ukuran_option_lebar: number[]
  produk_ukuran_option_tinggi: number[]
}

type variantDTO = {
  variant_name: string,
  variant_isActive: boolean | true
  variant_productID: string
  variant_optionID: string
  variant_options: variantOptionDTO[]
}

type variantOptionDTO = {
  variant_option_name: string
  variant_option_value: variantOptionValuesDTO[]
}

type variantOptionValuesDTO = {
  values_sku: string,
  values_weight: number,
  values_stock: number,
  values_price: number,
  values_is_active: boolean
}

export const addProdukSchema = z.object({
  produk_nama: z.string(),
  produk_url_checkout: z.string(),
  produk_kategori: z.string(),
  produk_deskripsi: z.string(),
  produk_foto: z.any(),
  produk_foto_1: z.any(),
  produk_foto_2: z.any(),
  produk_foto_3: z.any(),
  produk_foto_4: z.any(),
  produk_harga: z.number(),
  produk_min_beli: z.number(),
  produk_stok: z.number(),
  produk_sku: z.string(),
  produk_berat: z.number(),
  produk_panjang: z.number(),
  produk_lebar: z.number(),
  produk_tinggi: z.number(),
  produk_ukuran_option: z.any(),
  produk_ukuran_option_weight: z.any(),
  produk_ukuran_option_img: z.any(),
  produk_ukuran_option_sku: z.any(),
  produk_ukuran_option_stock: z.any(),
  produk_ukuran_option_price: z.any(),
  produk_ukuran_option_panjang: z.any(),
  produk_ukuran_option_lebar: z.any(),
  produk_ukuran_option_tinggi: z.any(),
  produk_ukuran_option_is_active: z.boolean().default(true),
});

export const useProdukForm = () => {
  const { toast } = useToast()
  const setProduct = useStore((state) => state.SET_PRODUCT);
  const product = useStore((state) => state.produk);
  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
    control,
    getValues
  } = useForm<z.infer<typeof addProdukSchema>>({
    mode: "all",
    resolver: zodResolver(addProdukSchema),
  });

  const onSubmitForm: SubmitHandler<z.infer<typeof addProdukSchema>> = async (data) => {
    try {
      let dataSubmit: z.infer<typeof addProdukSchema> = data;
      if (data.produk_ukuran_option) {
        dataSubmit = {
          ...dataSubmit,
          produk_ukuran_option_price: Object.values(data.produk_ukuran_option_price).map(item => Number(item)),
          produk_ukuran_option_weight: Object.values(data.produk_ukuran_option_weight).map(item => Number(item)),
          produk_ukuran_option_stock: Object.values(data.produk_ukuran_option_stock).map(item => Number(item)),
          produk_ukuran_option_panjang: Object.values(data.produk_ukuran_option_lebar).map(item => Number(item)),
          produk_ukuran_option_lebar: Object.values(data.produk_ukuran_option_lebar).map(item => Number(item)),
          produk_ukuran_option_tinggi: Object.values(data.produk_ukuran_option_tinggi).map(item => Number(item)),
          produk_ukuran_option_sku: Object.values(data.produk_ukuran_option_sku).map(item => String(item))
        }
      }

      let form_data = new FormData();

      for (let key in dataSubmit) {
        form_data.append(key, (dataSubmit as any)[key]);
      }
      if (data.produk_foto) form_data.append("produk_foto", data.produk_foto[0]);
      if (data.produk_foto_1) form_data.append("produk_foto_1", data.produk_foto_1[0]);
      if (data.produk_foto_2) form_data.append("produk_foto_2", data.produk_foto_2[0]);
      if (data.produk_foto_3) form_data.append("produk_foto_3", data.produk_foto_3[0]);
      if (data.produk_foto_4) form_data.append("produk_foto_4", data.produk_foto_4[0]);

      if (data.produk_ukuran_option_img) {
        for (let i = 0; i < data.produk_ukuran_option_img.length; i++) {
          // console.log("produk_ukuran_option_img", data.produk_ukuran_option_img[i])
          form_data.append("produk_ukuran_option_img", data.produk_ukuran_option_img[i]);
        }
      }

      console.log("img", form_data.getAll("produk_ukuran_option_img"));

      const response = await Axios({
        method: "post",
        url: `${api}/form-produk`,
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      setProduct(response.data);
      console.log("prod", product)

      console.log(response);
      toast({
        variant: "success",
        title: "Add Product Success",
        description: JSON.stringify(response.data),
      })
    } catch (error) {
      console.log("test", error)
      toast({
        variant: "destructive",
        title: "Add Product Falied",
        description: JSON.stringify(error),
      })
    }
  };

  return {
    register,
    unregister,
    handleSubmit,
    onSubmitForm,
    isSubmitted,
    errors,
    control,
    setValue,
    getValues,
    isSubmitting
  };
};
