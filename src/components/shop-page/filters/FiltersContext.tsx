import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type PriceRange = {
  min: number;
  max: number;
};

type ColorOption = {
  id: string;
  label: string;
  value: string;
  color: string;
};

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
  // Available options
  availableOptions: {
    priceRange: PriceRange;
    sizes: number[];
    colors: ColorOption[];
    fragrances: string[];
    categories: string[];
  } | null;
  loadingOptions: boolean;
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

  const [availableOptions, setAvailableOptions] = useState<FiltersState['availableOptions']>(null);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/products/filters');
        const data = await response.json();
        setAvailableOptions(data);
        // Set initial price range if not set
        if (data.priceRange) {
          // setMinPrice(data.priceRange.min);
          // setMaxPrice(data.priceRange.max);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

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
      setColorLabel,
      availableOptions,
      loadingOptions
    }),
    [category, style, minPrice, maxPrice, sizeMl, colorLabel, availableOptions, loadingOptions]
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
