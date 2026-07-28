import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import {
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "@/api/favorite";

interface Props {
  propertyId: string;
}

export default function FavoriteButton({
  propertyId,
}: Props) {
  const [favorite, setFavorite] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    load();
  }, [propertyId]);

  async function load() {
    try {
      const res = await checkFavorite(
        propertyId
      );

      setFavorite(res.data.isFavorite);
    } catch {}
  }

  async function toggleFavorite() {
    if (loading) return;

    try {
      setLoading(true);

      if (favorite) {
        await removeFavorite(propertyId);

        setFavorite(false);
      } else {
        await addFavorite(propertyId);

        setFavorite(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="rounded-full bg-white p-2 shadow hover:scale-110 transition"
    >
      <Heart
        size={22}
        fill={
          favorite ? "#ef4444" : "transparent"
        }
        className={
          favorite
            ? "text-red-500"
            : "text-gray-500"
        }
      />
    </button>
  );
}