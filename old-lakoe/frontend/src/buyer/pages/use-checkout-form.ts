import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type checkoutForm = {
  courier_code: string;
  courier_service: string;
  service_charge: number;
  receiver_longitude: string;
  receiver_latitude: string;
  receiver_district: string;
  receiver_phone: string;
  receiver_address: string;
  receiver_name: string;
  prices: number;
  user_id: string;
  store_id: string;
};

const checkoutSchema = z.object({
  courier_code: z.any(),
  courier_service: z.any(),
  service_charge: z.any(),
  receiver_name: z.any(),
  receiver_phone: z.any(),
  receiver_district: z.any(),
  receiver_address: z.any(),
  receiver_latitude: z.any(),
  receiver_longitude: z.any(),
  prices: z.any(),
  user_id: z.any(),
  store_id: z.any(),
});

export const useCheckoutForm = () => {
  const form = useForm<checkoutForm>({
    mode: "onChange",
    resolver: zodResolver(checkoutSchema),
  });

  return form;
};
