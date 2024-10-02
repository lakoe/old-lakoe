import React from 'react';
import { InformasiContextProvider } from '@/context/InformasiContext';
import { InformasiList } from '@/components/InformasiCard';
import { AddInformasi } from '@/components/AddInformasi';

export const cardInformasi: React.FC = () => {
    return (
        <InformasiContextProvider>
            <AddInformasi />
            <InformasiList />
        </InformasiContextProvider>
    );
};