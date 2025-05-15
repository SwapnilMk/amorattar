"use client";

import { Color } from "@/types/product.types";
import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type ColorSelectionProps = {
  colors: Color[];
  selectedColor: Color;
  onColorChange: (color: Color) => void;
};

const ColorSelection = ({ colors, selectedColor, onColorChange }: ColorSelectionProps) => {

  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        {colors.map((color: Color) => (
          <button
            key={color.name}
            type="button"
            className={cn(
              "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border-2",
              selectedColor.name === color.name ? "border-black" : "border-transparent",
              color.code
            )}
            onClick={() => onColorChange(color)}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <IoMdCheckmark className="text-base text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
