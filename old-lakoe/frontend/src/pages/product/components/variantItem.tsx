import { Button } from "@/components/ui/button";
import { FC } from "react";
import { GoDotFill } from "react-icons/go";
import { LuLink } from "react-icons/lu";
import UpdatePriceDialog from "./updatePriceDialog";
import UpdateStockDialog from "./updateStockDialog";
import ActivateProductDialog from "./activateProduct";
import DeleteProductDialog from "./deleteProductDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import DeleteVariantDialog from "./deleteVariantDialog";
import { formattedNumber } from "@/features/pesanan/components/status-order/card-pesanan";

interface IProductItemProps {
  product: IProduct;
  // onUpdatePrice: (id: string, newPrice: string) => void;
  // onUpdateStock: (id: string, newStock: string) => void;
}

const VariantItem: FC<IProductItemProps> = ({ product }) => {
  const handleUpdatePrice = (newPrice: string) => {
    // onUpdatePrice(product.id, newPrice);
  };

  const handleUpdateStock = (newStock: string) => {
    // onUpdateStock(product.id, newStock);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="rounded-full">
          {product.variants[0].variant_option[0].name} -{" "}
          {product.variants.length} Varian
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>
            Varian{" "}
            <span className="font-bold">
              {product.variants[0].variant_option[0].name}
            </span>
          </DialogTitle>
          <DialogDescription>
            {product.variants.map((data) => (
              <div className="w-full border p-4 mt-4 rounded shadow-md">
                <div className="w-full flex items-center gap-4">
                  {/* product image */}
                  <img
                    src={data.variant_option[0].variant_option_values.img}
                    alt={product.name}
                    width={"100rem"}
                  />

                  <div className="w-full">
                    <div className="flex">
                      {/* variant name */}
                      <p className="flex flex-1 text-xl text-black font-bold">
                        {data.variant_option[0].name}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 mt-2 text-lg">
                        <p className="font-bold">
                          {formattedNumber(
                            data.variant_option[0].variant_option_values.price
                          )}
                        </p>
                        <GoDotFill fill="#909090" size={".8rem"} />
                        <p className="text-gray-500">
                          Stock :{" "}
                          {data.variant_option[0].variant_option_values.stock}
                        </p>
                        <GoDotFill fill="#909090" size={".8rem"} />
                        <p className="text-gray-500">
                          SKU :{" "}
                          {data.variant_option[0].variant_option_values.sku}
                        </p>
                      </div>

                      <div
                        className={`flex items-center ${data.variant_option[0].variant_option_values.is_active ? "justify-center" : "justify-end"}`}
                      >
                        {product.is_active && (
                          <div className="flex flex-1 items-center gap-2">
                            {/* <UpdatePriceDialog productVariant={data} />
                            <UpdateStockDialog productVariant={data} />
                            <DeleteVariantDialog productVariant={data} /> */}
                          </div>
                        )}

                        {/* activate product */}
                        <ActivateProductDialog product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VariantItem;
