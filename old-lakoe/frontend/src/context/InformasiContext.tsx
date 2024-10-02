// import { Informasi } from '@/datas/type';
// import React, { createContext, useState } from 'react';

// interface InformasiContext {
//     informs: Informasi[];
//     setInformasi: React.Dispatch<React.SetStateAction<Informasi[]>>;
// }

// export const InformasiContext = createContext<InformasiContext | null>(null);

// export function InformasiContextProvider({ children }: { children: React.ReactNode }) {
//     const [informs, setInformasi] = useState<Informasi[]>([]);

//     return (
//         <InformasiContext.Provider value={{ informs, setInformasi }}>
//             {children}
//         </InformasiContext.Provider>
//     );
// }


import { Informasi } from '@/datas/type';
import React, { createContext, useState } from 'react';

interface InformasiContext {
    informs: Informasi[];
    setInforms: React.Dispatch<React.SetStateAction<Informasi[]>>;
}

export const InformasiContext = createContext<InformasiContext | null>(null);

export function InformasiContextProvider({ children }: { children: React.ReactNode }) {
    const [informs, setInforms] = useState<Informasi[]>([]);
    return (
        <InformasiContext.Provider value={{ informs, setInforms }}>
            {children}
        </InformasiContext.Provider>
    );
}

