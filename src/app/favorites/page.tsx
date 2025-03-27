"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { removeFromFavorites } from "@/lib/features/favorites/favoritesSlice";
import Image from "next/image";

const FavoritesPage = () => {
    const { favorites } = useAppSelector((state: RootState) => state.favorites);
    const dispatch = useAppDispatch();

    return (
        <div className="max-w-frame mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Your Favorite Fragrances</h1>
            {!favorites || favorites.totalItems === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.items.map((item) => (
                        <div key={item.id} className="border p-4 rounded-md">
                            <Image
                                src={item.srcUrl}
                                height={200}
                                width={200}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <p className="text-sm text-gray-600">{item.fragranceType}</p>
                            <p className="text-lg font-bold">${item.price}</p>
                            <button
                                onClick={() => dispatch(removeFromFavorites(item.id))}
                                className="mt-2 text-red-500 hover:underline"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;