'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type FiltersState = {
  category: string | null;
  setCategory: (value: string | null) => void;
  style: string | null;
  setStyle: (value: string | null) => void;
  minPrice: number | null;
  setMinPrice: (value: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  sizeMl: number | null;
  setSizeMl: (value: number | null) => void;
  colorLabel: string | null;
  setColorLabel: (value: string | null) => void;
};

const FiltersContext = createContext<FiltersState | undefined>(undefined);

export const FiltersProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sizeMl, setSizeMl] = useState<number | null>(null);
  const [colorLabel, setColorLabel] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      category,
      setCategory,
      style,
      setStyle,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      sizeMl,
      setSizeMl,
      colorLabel,
      setColorLabel
    }),
    [category, style, minPrice, maxPrice, sizeMl, colorLabel]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersState => {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return ctx;
};
