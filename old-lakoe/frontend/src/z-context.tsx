import { create } from "zustand";

type courierType = {
  name: string;
  service: string;
  duration: string;
  price: number;
  logo: string;
};

type StoreLocation = {
  address: string;
};

type StoreUser = {
  name: string;
  slogan: string;
  description: string;
  logo_attachment: string;
  banner_attachment: string;
  location: StoreLocation[];
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role_id: number;
  isVerified: boolean;
  store_id: string;
  store: StoreUser;
};

type productCreated = {
  product_id: string;
  varian_id: string;
};

type discount = {
  id: string;
  code: string;
  amount: number;
};

type bankAccount = {
  id: string;
  bank: string;
  acc_number: string;
  acc_name: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
};

type withdraw = {
  id: string;
  nominal: number;
  bank: string;
  rekening: string;
  name: string;
  status: string;
  user_id: string;
  createdAt: Date;
};

type categories = {
  id: string;
  name: string;
};

type voucher = {
  id: string;
  amount: number;
  code: string;
  createdAt: Date;
};

type products = {
  id: string;
  name: string;
  description?: string;
  attachments: string[];
  is_active: boolean;
  variants: IVariants[];
  size: string;
  minimum_order: string;
  store_id?: string;
  categories_id?: string;
  created_at: Date;
  updated_at: Date;
};

type Store = {
  courier: courierType[];
  setCourier: (newCourier: courierType[]) => void;
  selectedCourier: courierType | undefined;
  setSelectedCourier: (newCourier: courierType | undefined) => void;
  user: User;
  SET_USER: (newUser: User) => void;
  produk: productCreated;
  SET_PRODUCT: (newProduct: productCreated) => void;
  discount: discount;
  SET_DISCOUNT: (newDisc: discount) => void;
  DELETE_DISCOUNT: () => void;
  totalPrice: number;
  SET_TOTAL: (newTotal: number) => void;
  DELETE_TOTAL: () => void;
  logout: () => void;
  SET_BANK: (newBank: bankAccount[]) => void;
  bank: bankAccount[];

  SET_WITHDRAW: (newWithdraw: withdraw[]) => void;
  withdraw: withdraw[];

  SET_CATEGORIES: (newCategories: categories[]) => void;
  categories: categories[];

  SET_VOUCHER: (newVoucher: voucher[]) => void;
  voucher: voucher[];

  SET_PRODUCTS: (newProducts: products[]) => void;
  products: products[];
};

const useStore = create<Store>()((set) => ({
  courier: [
    {
      name: "",
      service: "",
      duration: "",
      price: 0,
      logo: "",
    },
  ],
  setCourier: (newCourier: courierType[]) => set({ courier: newCourier }),
  selectedCourier: {
    name: "",
    service: "",
    duration: "",
    price: 0,
    logo: "",
  },
  setSelectedCourier: (newSelectedCourier: courierType | undefined) =>
    set({ selectedCourier: newSelectedCourier }),
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    role_id: NaN,
    isVerified: false,
    store_id: "",
    store: {
      name: "",
      slogan: "",
      description: "",
      logo_attachment: "",
      banner_attachment: "",
      location: [{ address: "" }],
    },
  },
  SET_USER: (newUser: User) => set({ user: newUser }),
  discount: {
    id: "",
    code: "",
    amount: 0,
  },
  totalPrice: 0,
  DELETE_TOTAL: () => {
    set({
      totalPrice: 0,
    });
  },
  SET_TOTAL: (newTotal: number) => set({ totalPrice: newTotal }),
  SET_DISCOUNT: (newDisc: discount) => set({ discount: newDisc }),
  DELETE_DISCOUNT: () => {
    set({
      discount: {
        id: "",
        code: "",
        amount: 0,
      },
    });
  },
  logout: () => {
    set({
      user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        role_id: NaN,
        isVerified: false,
        store_id: "",
        store: {
          name: "",
          slogan: "",
          description: "",
          logo_attachment: "",
          banner_attachment: "",
          location: [{ address: "" }],
        },
      },
    });
    localStorage.removeItem("token");
  },
  produk: {
    product_id: "",
    varian_id: "",
  },
  SET_PRODUCT: (newProduk: productCreated) => set({ produk: newProduk }),
  bank: [
    {
      id: "",
      bank: "",
      acc_number: "",
      acc_name: "",
      store_id: "",
      created_at: new Date(""),
      updated_at: new Date(""),
    },
  ],
  SET_BANK: (newBank: bankAccount[]) => set({ bank: newBank }),
  withdraw: [
    {
      id: "",
      nominal: 0,
      bank: "",
      rekening: "",
      name: "",
      status: "",
      user_id: "",
      createdAt: new Date(""),
    },
  ],
  SET_WITHDRAW: (newWithdraw: withdraw[]) => set({ withdraw: newWithdraw }),
  categories: [
    {
      id: "",
      name: "",
    },
  ],
  SET_CATEGORIES: (newCategories: categories[]) =>
    set({ categories: newCategories }),
  voucher: [
    {
      id: "",
      amount: 0,
      code: "",
      createdAt: new Date(""),
    },
  ],
  SET_VOUCHER: (newVoucher: voucher[]) => set({ voucher: newVoucher }),
  products: [
    {
      id: "",
      name: "",
      description: "",
      attachments: [],
      is_active: false,
      variants: [
        {
          id: "",
          name: "",
          is_active: false,
          product_id: "",
          variant_option: [
            {
              id: "",
              name: "",
              variant_id: "",
              variant_option_values: {
                id: "",
                variant_option_id: "",
                sku: "",
                weight: 0,
                stock: 0,
                price: 0,
                is_active: false,
                img: "",
                created_at: new Date(""),
                updated_at: new Date(""),
              },
              created_at: new Date(""),
              updated_at: new Date(""),
            },
          ],
          created_at: new Date(""),
          updated_at: new Date(""),
        },
      ],
      size: "",
      minimum_order: "",
      store_id: "",
      categories_id: "",
      created_at: new Date(""),
      updated_at: new Date(""),
    },
  ],
  SET_PRODUCTS: (newProducts: products[]) => set({ products: newProducts }),
}));

export default useStore;
