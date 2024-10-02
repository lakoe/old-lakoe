/* eslint-disable */
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
``;

interface SearchControlProps {
  setPosition: (position: L.LatLng) => void;
}

export function SearchControl({ setPosition }: SearchControlProps) {
  {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        provider: provider,
        style: "bar",
        showMarker: true,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: true,
        },
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: "Enter address",
        keepResult: true,
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result: any) => {
        const latLng = L.latLng(result.location.y, result.location.x);
        setPosition(latLng);
        map.flyTo(result.location, map.getZoom());
      });

      return () => map.removeControl(searchControl);
    }, [map, setPosition]);

    return null;
  }
}
