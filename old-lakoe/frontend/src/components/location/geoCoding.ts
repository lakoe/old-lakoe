export const getAddress = async (lat: number, lng:number): Promise<string> => {
    const api = "b3d7a327ad46434a8a8c04918a75b894"
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api}`)
    const data = await response.json()

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted;
  } else {
    return "Address Not Found!!";
  }
};
