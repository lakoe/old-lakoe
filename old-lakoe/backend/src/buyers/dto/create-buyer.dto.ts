export class CreateBuyerDto {}

type products = {
  name: string;
  // descriptions : string,
  // value : number,
  // length: number,
  // width : number,
  // height : number,
  // weight : number,
  // quantity : number
};

export class buyerData {
  destination_latitude: number;
  destination_longitude: number;
  items: products[];
}

export class confirmation_payment {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: number;
  signature_key: string;
  payment_type: string;
  order_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
  channel_response_message: string;
  channel_response_code: number;
  bank: string;
}

export class confirmation_courier {
  event: string;
  courier_tracking_id: string;
  courier_waybill_id: string;
  courier_company: string;
  courier_type: string;
  courier_driver_name: string;
  courier_driver_phone: string;
  courier_driver_photo_url: string;
  courier_driver_plate_number: string;
  courier_link: string;
  order_id: string;
  order_price: number;
  status: string;
}

export class buyProducts {
  courier_code: string;
  courier_service: string;
  service_charge: number;
  receiver_longitude: string;
  receiver_latitude: string;
  receiver_district: string;
  receiver_phone: string;
  receiver_address: string;
  receiver_name: string;
  user_id: string;
  store_id: string;
  discount_id : string;
  prices : number;
}
