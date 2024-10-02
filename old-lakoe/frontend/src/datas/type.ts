export type store = {
  id: number | null;
  namaToko: string;
  selogan: string;
  deskripsi: string;
  image?: string | null | File | undefined;
  completed: boolean;
};


export type Location = {
  id: number;
  namaLokasi: string;
  alamat: string;
  selectedProvinsiId: string;
  // kota: string;
  // kodePos: string;
  pinPoint: [number, number];
  completed?: boolean;
};

export type Informasi = {
  id: string;
  namaToko: string;
  selogan: string;
  deskripsi: string;
  image?: string | null | File | undefined;
  completed?: boolean;
}

export type TemplatePesan = {
  map(arg0: (temp: { id: number; }) => { id: number; } | { judulPesan: string; daftarIsiPesan: string[]; namaPembeli: string; namaProduk: string; namaToko: string; id: number; }): unknown;
  id: number;
  judulPesan: string;
  daftarIsiPesan: string[];
  namaPembeli: string;
  namaProduk: string;
  namaToko: string;
}