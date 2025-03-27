"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoritesBtn = () => {
    const { favorites } = useAppSelector((state: RootState) => state.favorites);

    return (
        <Link href="/favorites" className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Favorites"
            >
                <Heart size={18} strokeWidth={2} aria-hidden="true" />
                {favorites && favorites.totalItems > 0 && (
                    <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                        {favorites.totalItems > 99 ? "99+" : favorites.totalItems}
                    </Badge>
                )}
            </Button>
        </Link>
    );
};

export default FavoritesBtn;