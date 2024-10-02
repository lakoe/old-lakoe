import { InformasiContext } from "@/context/InformasiContext";
import { Informasi } from "@/datas/type";
import React, { useContext } from "react";

interface UpdateInformasiProps {
  inform: Informasi;
  onUpdate: () => void;
}

export const UpdateInformasi: React.FC<UpdateInformasiProps> = ({
  inform,
  onUpdate,
}) => {
  const context = useContext(InformasiContext);

  if (!context) {
    return null;
  }

  console.log("inform", inform);
  // const { informs, setInforms } = context;
};
// const [namaToko, setNamaToko] = useState(inform.namaToko);
// const [selogan, setSelogan] = useState(inform.selogan);
// const [deskripsi, setDeskripsi] = useState(inform.deskripsi);
// const [image, setImage] = useState(inform.image);

//     const handleUpdate = () => {
//         const updatedInforms = informs.map(info =>
//             info.id === inform.id ? { ...info, namaToko, selogan, deskripsi, image } : info
//         );
//         setInforms(updatedInforms);
//         onUpdate();
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={namaToko}
//                 onChange={(e) => setNamaToko(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={selogan}
//                 onChange={(e) => setSelogan(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={deskripsi}
//                 onChange={(e) => setDeskripsi(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//             />
//             <button onClick={handleUpdate}>Update</button>
//         </div>
//     );
// };
