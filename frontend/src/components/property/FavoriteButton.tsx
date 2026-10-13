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
      type="button"
      onClick={handleToggle}
      disabled={loading}
      aria-label={
        favorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={favorite}
      className={`
        group flex h-9 w-9 items-center justify-center
        rounded-full
        transition-all duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-brass-400/40
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${
          favorite
            ? "bg-rose-50 hover:bg-rose-100"
            : "bg-transparent hover:bg-slate-100"
        }
      `}
    >
      <Heart
        size={19}
        strokeWidth={2}
        className={`
          transition-all duration-200
          ${
            favorite
              ? "fill-rose-500 text-rose-500"
              : "text-slate-500 group-hover:scale-110 group-hover:text-slate-700"
          }
        `}
      />
    </button>
  );
}