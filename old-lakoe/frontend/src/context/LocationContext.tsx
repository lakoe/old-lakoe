import { Location } from '@/datas/type';
import React, { createContext, useState } from 'react';

interface LocationContext {
    locations: Location[];
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

export const LocationContext = createContext<LocationContext | undefined>(undefined);

export const LocationContextProvider: React.FC<({ children: React.ReactNode })> = ({ children }) => {
    const [locations, setLocations] = useState<Location[]>([]);

    return (
        <LocationContext.Provider value={{ locations, setLocations }}>
            {children}
        </LocationContext.Provider >
    );
}

