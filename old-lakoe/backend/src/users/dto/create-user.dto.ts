export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role_id: number;
}

export class bank {
  bank: string;
  acc_number: string;
  acc_name: string;
}

export class ChangePasswordDTO {
  id: string;
  password: string;
}

export class location {
  name: string;
  contact_name: string;
  contact_phone: number;
  address: string;
  postal_code: string;
  latitude: string;
  longitude: string;
}

export class addLocation {
  name: string;
  address: string;
  postal_code: string;
  city_district: string;
  lattitude: string;
  longitude: string;
  store_id: string;
  is_main_location: boolean;
}

export class editStores {
  slogan: string;
  name: string;
  description: string;
  logo_attachment: File | null;
}
