/* eslint-disable */
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { LuLink } from "react-icons/lu";
import ActivateProductDialog from "./activateProduct";
import DeleteProductDialog from "./deleteProductDialog";
import VariantItem from "./variantItem";

interface IProductItemProps {
    product: IProduct;
}

const ProductItem: FC<IProductItemProps> = ({ product }) => {

    return (
        <div className="w-full border p-4 rounded shadow-md">
            <div className="w-full flex items-center gap-4">
                {/* product image */}
                <img
                    src={product.variants[0].variant_option[0].variant_option_values.img}
                    alt={product.name}
                    width={"90rem"}
                />

                <div className="w-full">
                    <div className="flex flex-col gap-4">
                        <p className="flex flex-1 text-xl font-bold">{product.name}</p>
                        <div className={`flex items-center justify-center`}>
                            <div className="flex flex-1 items-center gap-2">
                                <VariantItem product={product} />
                                <Button variant={'outline'} className="gap-2 rounded-full">
                                    <LuLink />
                                    Lihat Halaman
                                </Button>
                                <DeleteProductDialog product={product} />
                            </div>

                            {/* activate & nonactivate product */}
                            <ActivateProductDialog product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
