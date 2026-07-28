 import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  checkFavorite,
  toggleFavorite,
} from "@/api/favorite";

interface FavoriteButtonProps {
  propertyId: string;
}

export default function FavoriteButton({
  propertyId,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFavorite() {
      try {
        const isFavorite = await checkFavorite(propertyId);
        setFavorite(isFavorite);
      } catch (error) {
        console.error(error);
      }
    }

    loadFavorite();
  }, [propertyId]);

  async function handleToggle() {
    try {
      setLoading(true);

      const result = await toggleFavorite(propertyId);

      setFavorite(result.favorite);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
    >
      <Heart
        size={22}
        className={
          favorite
            ? "fill-red-500 text-red-500"
            : "text-gray-400"
        }
      />
    </button>
  );
}