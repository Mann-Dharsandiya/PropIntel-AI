 import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  IndianRupee,
  ArrowRight,
  Star,
  TrendingUp,
  ShieldCheck,
  Building2,
  Heart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Property } from "@/types/advisor";

interface Props {
  property: Property;
}

export default function PropertyCard({
  property,
}: Props) {

  const navigate = useNavigate();

  const imageUrl =
    property.images?.length
      ? property.images[0]
      : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200";

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN").format(price);

  const openDetails = () => {
    navigate(`/properties/${property._id}`);
  };

  return (

    <div
      onClick={openDetails}
      className="
      group
      cursor-pointer
      overflow-hidden
      rounded-3xl
      border
      border-gray-200
      bg-white
      shadow-md
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >

      {/* ================= IMAGE ================= */}

      <div className="relative h-60 overflow-hidden">

        <img
          src={imageUrl}
          alt={property.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200";
          }}
          className="
          h-full
          w-full
          object-cover
          duration-500
          group-hover:scale-110
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Property Type */}

        <div className="absolute left-4 top-4">

          <span
            className="
            rounded-full
            bg-blue-600
            px-4
            py-2
            text-xs
            font-bold
            text-white
            shadow-lg
            "
          >
            {property.propertyType}
          </span>

        </div>

        {/* Status */}

        <div className="absolute right-4 top-4">

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold shadow-lg ${
              property.status === "available"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {property.status.toUpperCase()}
          </span>

        </div>

        {/* Featured */}

        {property.featured && (

          <div
            className="
            absolute
            bottom-4
            left-4
            flex
            items-center
            gap-2
            rounded-full
            bg-yellow-400
            px-4
            py-2
            text-sm
            font-bold
            text-black
            "
          >

            ⭐ Featured

          </div>

        )}

      </div>

      {/* ================= BODY ================= */}

      <div className="p-6">

        {/* Builder */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Building2
              size={18}
              className="text-blue-600"
            />

            <span
              className="
              text-sm
              font-semibold
              text-blue-700
              "
            >
              {property.builder}
            </span>

          </div>

          {property.verified && (

            <div
              className="
              flex
              items-center
              gap-1
              rounded-full
              bg-green-100
              px-3
              py-1
              text-xs
              font-semibold
              text-green-700
              "
            >

              <ShieldCheck size={15} />

              Verified

            </div>

          )}

        </div>

        {/* Title */}

        <h2
          className="
          mt-3
          line-clamp-2
          text-2xl
          font-bold
          text-gray-900
          "
        >
          {property.title}
        </h2>

        {/* Location */}

        <div
          className="
          mt-3
          flex
          items-center
          gap-2
          text-gray-500
          "
        >

          <MapPin size={18} />

          <span>

            {property.locality}, {property.city}

          </span>

        </div>

        {/* Price */}

        <div
          className="
          mt-5
          flex
          items-center
          gap-2
          text-3xl
          font-bold
          text-green-600
          "
        >

          <IndianRupee size={24} />

          {formatPrice(property.price)}

        </div>

        {/* AI SCORE */}

        <div
          className="
          mt-6
          flex
          items-center
          justify-between
          rounded-2xl
          bg-blue-50
          p-4
          "
        >

          <div>

            <p className="text-sm text-gray-500">

              AI Property Score

            </p>

            <div className="mt-1 flex items-center gap-2">

              <Star
                className="text-yellow-500"
                size={20}
                fill="currentColor"
              />

              <span
                className="
                text-2xl
                font-bold
                text-blue-700
                "
              >
                {property.aiScore}/10
              </span>

            </div>

          </div>

          <TrendingUp
            className="text-green-600"
            size={40}
          />

        </div>
                {/* Property Features */}

        <div className="mt-6 grid grid-cols-3 gap-3">

          <div className="rounded-xl bg-gray-100 p-3 text-center">

            <BedDouble
              className="mx-auto text-blue-600"
              size={22}
            />

            <p className="mt-2 text-lg font-bold">
              {property.bedrooms}
            </p>

            <p className="text-xs text-gray-500">
              Bedrooms
            </p>

          </div>

          <div className="rounded-xl bg-gray-100 p-3 text-center">

            <Bath
              className="mx-auto text-blue-600"
              size={22}
            />

            <p className="mt-2 text-lg font-bold">
              {property.bathrooms}
            </p>

            <p className="text-xs text-gray-500">
              Bathrooms
            </p>

          </div>

          <div className="rounded-xl bg-gray-100 p-3 text-center">

            <Ruler
              className="mx-auto text-blue-600"
              size={22}
            />

            <p className="mt-2 text-lg font-bold">
              {property.area}
            </p>

            <p className="text-xs text-gray-500">
              Sq.ft
            </p>

          </div>

        </div>

        {/* Investment Analytics */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-green-50 p-4">

            <p className="text-sm text-gray-500">
              Rental Yield
            </p>

            <p className="mt-2 text-2xl font-bold text-green-700">
              {property.rentalYield}%
            </p>

          </div>

          <div className="rounded-2xl bg-purple-50 p-4">

            <p className="text-sm text-gray-500">
              Appreciation
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-700">
              {property.appreciation}%
            </p>

          </div>

        </div>

        {/* Investment Rating */}

        <div className="mt-6">

          <div className="mb-2 flex items-center justify-between">

            <span className="font-semibold">
              Investment Score
            </span>

            <span className="text-sm font-bold text-blue-600">
              {property.investmentScore}/5
            </span>

          </div>

          <div className="flex gap-1">

            {[1, 2, 3, 4, 5].map((star) => (

              <Star
                key={star}
                size={18}
                fill={
                  star <= property.investmentScore
                    ? "currentColor"
                    : "none"
                }
                className={
                  star <= property.investmentScore
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />

            ))}

          </div>

        </div>

        {/* Amenities */}

        <div className="mt-6">

          <h4 className="mb-3 font-semibold">
            Amenities
          </h4>

          <div className="flex flex-wrap gap-2">

            {property.amenities
              ?.slice(0, 4)
              .map((item) => (

                <span
                  key={item}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {item}
                </span>

              ))}

          </div>

        </div>

        {/* Nearby */}

        <div className="mt-6">

          <h4 className="mb-3 font-semibold">
            Nearby
          </h4>

          <div className="flex flex-wrap gap-2">

            {property.nearby
              ?.slice(0, 4)
              .map((item) => (

                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
                >
                  📍 {item}
                </span>

              ))}

          </div>

        </div>
                {/* Bottom Action Bar */}

        <div className="mt-8 border-t pt-5">

          <div className="flex items-center justify-between">

            {/* Favorite */}

            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2
                text-sm
                font-semibold
                transition
                hover:bg-red-50
              "
            >
              <Heart
                size={18}
                className="text-red-500"
              />

              Save

            </button>

            {/* View Details */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                openDetails();
              }}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >

              View Details

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}