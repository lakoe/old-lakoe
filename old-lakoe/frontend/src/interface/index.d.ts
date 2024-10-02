interface IVariantOptionValues {
    id: string;
    variant_option_id: string;
    sku: string;
    weight: number;
    stock: number;
    price: number;
    is_active: boolean;
    img?: string;
    created_at: Date;
    updated_at: Date;
}

interface IVariantOptions {
    id: string;
    name: string;
    variant_id: string;
    variant_option_values: IVariantOptionValues;
    created_at: Date;
    updated_at: Date;
}

interface IVariants {
    id: string;
    name: string;
    is_active: boolean;
    product_id: string;
    variant_option: IVariantOptions[];
    created_at: Date;
    updated_at: Date;
}

interface IProduct {
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
}

interface ICategories {
    id: string;
    name: string;
    products_id: IProduct[];
    created_at: Date;
    updated_at: Date;
}

interface IActions {
    id: string;
    name: string;
}

interface IBankAccount {
    id: string;
    bank: string;
    acc_number: string;
    acc_name: string;
    store_id: string;
    created_at: Date;
    updated_at: Date;
}

interface IAddBank {
    bank: string;
    acc_number: string;
    acc_name: string;
    store_id: string;
}

interface IWithdraw {
    nominal: number;
}

interface IDataWithdraw {
    id: string;
    nominal: number;
    bank: string;
    rekening: string;
    name: string;
    status: string;
    user_id: string;
    createdAt: Date;
}

interface IAddCategories {
    name: string;
}

interface IDataVoucher {
    id: string;
    amount: number;
    code: string;
    createdAt: Date;
}

interface IAddVoucher {
    amount: number;
    code: string;
}

interface IInvoice {
    id: string;
    prices: number;
    service_charge: number;
    status: string;
    receiver_longitude: string;
    receiver_latitude: string;
    receiver_district: string;
    receiver_phone: string;
    receiver_address: string;
    receiver_name: string;
    receiver_postal_code: number;
    invoice_number: string;
    cart_id: string;
    store_id: string;
    midtrans_token_id: string;
    user_id: string;
    created_at: Date;
    updated_at: date;
}