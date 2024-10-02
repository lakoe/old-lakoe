/* eslint-disable */
import { Location } from "@/datas/type";

const LOCAL_STORAGE_KEY = "datas";

export const LocationService = {
  //Get Store
  getStore: (): Location[] => {
    const datasLct = localStorage.getItem(LOCAL_STORAGE_KEY);
    return datasLct ? JSON.parse(datasLct) : [];
  },

  //Adding Store
  addStore: (
    namaLokasi: string,
    alamat: string,
    kota: string,
    kodePos: string,
    pinPoint: string
  ): Location => {
    const datas = LocationService.getStore();
    const newLocation: Location = {
      id: datas.length + 1,
      namaLokasi,
      alamat,
      kota,
      kodePos,
      pinPoint,
      completed: false,
    };
    const updateLocation = [...datas, newLocation];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateLocation));
    return newLocation;
  },

  //Updating The Store
  updateStore: (data: Location): Location => {
    const datas = LocationService.getStore();
    const updateLocation = datas.map((d) => (d.id === data.id ? data : d));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateLocation));
    return data;
  },

  //!Delete the store
  deleteStore: (id: number): void => {
    const datas = LocationService.getStore();

    const updateLocation = datas.filter((data) => data.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateLocation));
  },
};
