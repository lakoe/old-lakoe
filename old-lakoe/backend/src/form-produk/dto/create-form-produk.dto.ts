export class CreateFormProdukDto {

        produk_nama: string
        produk_url_checkout: string
        produk_kategori: string
        produk_deskripsi: string
        produk_foto: File | null
        produk_foto_1: File | null
        produk_foto_2: File | null
        produk_foto_3: File | null
        produk_foto_4: File | null
        produk_harga: number
        produk_min_beli: number
        produk_stok: number
        produk_sku: string
        produk_berat: number
        produk_panjang: number
        produk_lebar: number
        produk_tinggi: number
        produk_ukuran_option: string
        produk_ukuran_option_weight: string
        produk_ukuran_option_img: File[]
        produk_ukuran_option_sku: string
        produk_ukuran_option_stock: string
        produk_ukuran_option_price: string
        produk_ukuran_option_is_active: boolean | true
        produk_ukuran_option_panjang: string
        produk_ukuran_option_lebar: string
        produk_ukuran_option_tinggi: string
        data: any
}

export class kurir_list {
  courier_name : string
  courier_code : string
  file : File | null
}