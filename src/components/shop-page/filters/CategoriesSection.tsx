import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Perfumes",
    slug: "/shop?category=perfumes",
  },
  {
    title: "Attars",
    slug: "/shop?category=attars",
  },
  {
    title: "Home Fragrances",
    slug: "/shop?category=home-fragrances",
  },
  {
    title: "Body Sprays",
    slug: "/shop?category=body-sprays",
  },
  {
    title: "Signature Attars",
    slug: "/shop?category=signature-attars",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2 hover:text-black transition-colors"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
