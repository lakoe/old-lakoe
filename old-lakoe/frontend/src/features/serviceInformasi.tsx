

// =================================================================================
import { store } from "@/datas/type";

const LOCAL_STORAGE_KEY = "datas";

export const StoreService = {
  //Get Store
  getStore: (): store[] => {
    const datasStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return datasStr ? JSON.parse(datasStr) : [];
  },

  //Adding Store
  addStore: (
    namaToko: string,
    selogan: string,
    deskripsi: string,
    image: File | string
  ): store => {
    const datas = StoreService.getStore();
    const newStore: store = {
      id: datas.length + 1,
      namaToko,
      selogan,
      deskripsi,
      image,
      completed: false
    };
    const updateStore = [...datas, newStore];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateStore));
    return newStore;
  },

  //Updating The Store
  updateStore: (data: store): store => {
    const datas = StoreService.getStore();
    const updateStore = datas.map((d) => (d.id === data.id ? data : d));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateStore));
    return data;
  },

  //!Delete the store
  deleteStore: (id: number): void => {
    const datas = StoreService.getStore();

    const updatedStore = datas.filter((data) => data.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedStore));
  },
};
