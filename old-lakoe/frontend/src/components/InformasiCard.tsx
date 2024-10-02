import React, { useContext, useState } from 'react';
import { InformasiContext } from '@/context/InformasiContext';
import { UpdateInformasi } from '@/components/UpdateInformasi';
import { Informasi } from '@/datas/type';
import { InformasiContextProvider } from "@/context/InformasiContext"

export const InformasiList: React.FC = () => {
    const context = useContext(InformasiContext);
    const [editingInformasi, setEditingInformasi] = useState<Informasi | null>(null);

    if (!context) {
        return null;
    }

    // const { informs, setInforms } = context;

    // const handleDelete = (id: number) => {
    //     setInforms(informs.filter(inform => inform.id !== id));
    // };

    // const handleEdit = (inform: Informasi) => {
    //     setEditingInformasi(inform);
    // };

    const handleUpdate = () => {
        setEditingInformasi(null);
    };

    return (
        <>
            <InformasiContextProvider>
                <div>
                    {/* <h2>Location List</h2>
                    <ul>
                        {informs.map(inform => (
                            <li key={inform.id}>
                                {inform.namaToko} - {inform.selogan}-
                                {inform.deskripsi}
                                <button onClick={() => handleDelete(inform.id)}>Delete</button>
                                <button onClick={() => handleEdit(inform)}>Edit</button>
                            </li>
                        ))}
                    </ul> */}
                    {editingInformasi && (
                        <UpdateInformasi inform={editingInformasi} onUpdate={handleUpdate} />
                    )}
                </div>
            </InformasiContextProvider>
        </>
    )
};
