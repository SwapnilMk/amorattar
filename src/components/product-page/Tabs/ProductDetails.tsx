import React from "react";
import { Product } from "@/types/product.types";

type ProductDetailsProps = {
  data: Product;
};

const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <>
      {Object.entries(data.specifications).map(([key, value], i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {key}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
