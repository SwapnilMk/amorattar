// src/components/ProductCard.tsx
"use client";

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { addToFavorites } from "@/lib/features/favorites/favoritesSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Importing icons

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: [], // Assuming no attributes for simplicity; adjust if needed
        discount: data.discount,
        quantity: 1,
      })
    );
  };

  const handleAddToFavorites = () => {
    dispatch(
      addToFavorites({
        id: data.id,
        name: data.title,
        brand: data.brand || "AMORATTAR",
        price: data.price,
        srcUrl: data.srcUrl,
        fragranceType: data.fragranceType || "Perfume",
      })
    );
  };

  const discountedPrice =
    data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
        ? data.price - data.discount.amount
        : data.price;

  return (
    <div className="flex flex-col items-start aspect-auto">
      <Link
        href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
        className="w-full"
      >
        <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
          <Image
            src={data.srcUrl}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            priority
          />
        </div>
        <strong className="text-black xl:text-xl">{data.title}</strong>
        <div className="flex items-end mb-1 xl:mb-2">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
            {data.rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
        <div className="flex items-center space-x-[5px] xl:space-x-2.5">
          <span className="font-bold text-black text-xl xl:text-2xl">
            ${discountedPrice}
          </span>
          {(data.discount.percentage > 0 || data.discount.amount > 0) && (
            <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
              ${data.price}
            </span>
          )}
          {data.discount.percentage > 0 ? (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-${data.discount.percentage}%`}
            </span>
          ) : (
            data.discount.amount > 0 && (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-$${data.discount.amount}`}
              </span>
            )
          )}
        </div>
      </Link>
      <div className="flex space-x-2 mt-2">
        <Button
          onClick={handleAddToCart}
          className="bg-black text-white rounded-full flex items-center space-x-2 px-4"
        >
          <FaShoppingCart className="text-sm" />
        </Button>
        <Button
          onClick={handleAddToFavorites}
          variant="outline"
          className="rounded-full flex items-center space-x-2 px-4"
        >
          <FaHeart className="text-sm" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;