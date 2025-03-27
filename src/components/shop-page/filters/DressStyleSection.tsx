import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type FragranceStyle = {
  title: string;
  slug: string;
};

const fragranceStylesData: FragranceStyle[] = [
  {
    title: "Floral",
    slug: "/shop?style=floral",
  },
  {
    title: "Woody",
    slug: "/shop?style=woody",
  },
  {
    title: "Citrus",
    slug: "/shop?style=citrus",
  },
  {
    title: "Oriental",
    slug: "/shop?style=oriental",
  },
];

const FragranceStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Fragrance Style
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {fragranceStylesData.map((fStyle, idx) => (
              <Link
                key={idx}
                href={fStyle.slug}
                className="flex items-center justify-between py-2 hover:text-black transition-colors"
              >
                {fStyle.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FragranceStyleSection;