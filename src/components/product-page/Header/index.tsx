"use client";

import React, { useState } from "react";
import PhotoSection from "./PhotoSection";
import { Product, Color } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import AddToCardSection from "./AddToCardSection";
import { Badge } from "@/components/ui/badge";

const Header = ({ data }: { data: Product }) => {
  const [selectedVolume, setSelectedVolume] = useState(data.volumeOptions[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(data.selectedColor);

  const handleVolumeChange = (ml: number) => {
    const volume = data.volumeOptions.find(v => v.ml === ml);
    if (volume) {
      setSelectedVolume(volume);
    }
  };

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={{ ...data, srcUrl: selectedColor.imageUrl }} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
            ])}
          >
            {data.title}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.rating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            <span className="font-bold text-black text-2xl sm:text-[32px]">
              ₹{selectedVolume.price}
            </span>
            {data.discount.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ₹{selectedVolume.price + (selectedVolume.price * data.discount.percentage / 100)}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            )}
            {data.isSale && (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-green-500/10 text-green-500">
                Sale
              </span>
            )}
          </div>

          {/* Gender Badges */}
          <div className="flex gap-2 mb-5">
            {data.gender.map((gender) => (
              <Badge
                key={gender}
                variant="outline"
                className={cn(
                  "px-3 py-1 text-sm",
                  gender === 'male' && "bg-blue-100 text-blue-800",
                  gender === 'female' && "bg-pink-100 text-pink-800",
                  gender === 'unisex' && "bg-purple-100 text-purple-800"
                )}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Badge>
            ))}
          </div>

          <p className="text-sm sm:text-base text-black/60 mb-5">
            {data.description}
          </p>
          <hr className="h-[1px] border-t-black/10 mb-5" />

          {/* Color Selection */}
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Select Color</h3>
            <ColorSelection
              colors={data.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          </div>

          <hr className="h-[1px] border-t-black/10 my-5" />

          {/* Volume Selection */}
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Select Volume</h3>
            <div className="flex gap-2">
              {data.volumeOptions.map((option) => (
                <button
                  key={option.ml}
                  onClick={() => handleVolumeChange(option.ml)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm",
                    selectedVolume.ml === option.ml
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-black"
                  )}
                >
                  {option.ml}ml
                </button>
              ))}
            </div>
          </div>

          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
