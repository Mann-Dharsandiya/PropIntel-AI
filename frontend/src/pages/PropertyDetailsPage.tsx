 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  ShieldCheck,
  Star,
  TrendingUp,
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";

import { getProperty, Property } from "@/api/property";
import { addRecentlyViewed } from "@/api/recentlyViewed";
import FavoriteButton from "@/components/property/FavoriteButton";
import ScheduleVisitModal from "@/components/property/ScheduleVisitModal";

export default function PropertyDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(0);
    const [showVisitModal, setShowVisitModal] =
  useState(false);

  useEffect(() => {

    async function loadProperty() {

      try {

        if (!id) return;

        const data =
          await getProperty(id);

        setProperty(data);
        console.log("PROPERTY =", data);
console.log("IMAGE URL =", data.images[0]);

      } catch (err) {

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load property."
        );

      } finally {

        setLoading(false);

      }

    }

    loadProperty();

  }, [id]);

  useEffect(() => {

    if (!property?._id) return;

    addRecentlyViewed(property._id)
      .catch(console.error);

  }, [property?._id]);

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-6 text-xl font-semibold">

            Loading Property...

          </p>

        </div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="flex h-screen items-center justify-center">

        <div className="text-center">

          <div className="text-7xl">

            ⚠️

          </div>

          <h2 className="mt-5 text-4xl font-bold">

            Something went wrong

          </h2>

          <p className="mt-3 text-gray-500">

            {error}

          </p>

          <button

            onClick={() => navigate(-1)}

            className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"

          >

            Go Back

          </button>

        </div>

      </div>

    );

  }

  if (!property) {

    return (

      <div className="py-24 text-center text-2xl">

        Property not found.

      </div>

    );

  }

  const images =
    property.images?.length
      ? property.images
      : [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
        ];

  const nextImage = () => {

    setSelectedImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );

  };

  const previousImage = () => {

    setSelectedImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );

  };

  return (

    <div className="mx-auto max-w-7xl p-6">

        {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 rounded-xl border bg-white px-5 py-3 shadow transition hover:bg-gray-100"
      >
        <ArrowLeft size={18} />
        Back to Listings
      </button>

      {/* ================= IMAGE GALLERY ================= */}

      <div className="grid gap-6 lg:grid-cols-4">

        {/* Thumbnails */}

        <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:flex-col">

          {images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt={`Property ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={`h-24 w-28 cursor-pointer rounded-2xl border-2 object-cover transition-all duration-300 hover:scale-105 ${
                selectedImage === index
                  ? "border-blue-600 shadow-lg"
                  : "border-transparent"
              }`}
            />

          ))}

        </div>

        {/* Main Image */}

        <div className="relative order-1 lg:order-2 lg:col-span-3">

          <img
            src={images[selectedImage]}
            alt={property.title}
            className="h-[560px] w-full rounded-3xl object-cover shadow-xl"
          />

          {/* Previous */}

          <button
            onClick={previousImage}
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}

          <button
            onClick={nextImage}
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Featured */}

          {property.featured && (

            <div className="absolute left-6 top-6 rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black shadow-lg">

              ⭐ Featured

            </div>

          )}

          {/* Verified */}

          {property.verified && (

            <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">

              <ShieldCheck size={18} />

              Verified

            </div>

          )}

          {/* Property Type */}

          <div className="absolute bottom-6 left-6 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">

            {property.propertyType}

          </div>

        </div>

      </div>

      {/* ================= HERO ================= */}

      <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row">

        <div className="flex-1">

          <div className="flex items-center gap-2 text-blue-600">

            <Building2 size={20} />

            <span className="font-semibold">

              {property.builder}

            </span>

          </div>

          <h1 className="mt-3 text-5xl font-bold leading-tight">

            {property.title}

          </h1>

          <div className="mt-5 flex items-center gap-2 text-gray-500">

            <MapPin size={20} />

            <span>

              {property.address},
              {" "}
              {property.locality},
              {" "}
              {property.city}

            </span>

          </div>

          <div className="mt-6 flex items-center gap-3 text-5xl font-bold text-green-600">

            <IndianRupee size={40} />

            {property.price.toLocaleString("en-IN")}

          </div>

        </div>

        {/* Favorite */}

        <div>

          <FavoriteButton
            propertyId={property._id}
          />

        </div>

      </div>

      {/* ================= AI ANALYTICS ================= */}

      <div className="mt-10 grid gap-5 md:grid-cols-4">

        <div className="rounded-3xl bg-blue-50 p-6 shadow">

          <p className="text-sm text-gray-500">

            AI Score

          </p>

          <div className="mt-3 flex items-center gap-2">

            <Star
              className="text-yellow-500"
              fill="currentColor"
            />

            <span className="text-3xl font-bold text-blue-700">

              {property.aiScore}/10

            </span>

          </div>

        </div>

        <div className="rounded-3xl bg-green-50 p-6 shadow">

          <p className="text-sm text-gray-500">

            Rental Yield

          </p>

          <p className="mt-3 text-3xl font-bold text-green-700">

            {property.rentalYield}%

          </p>

        </div>

        <div className="rounded-3xl bg-purple-50 p-6 shadow">

          <p className="text-sm text-gray-500">

            Appreciation

          </p>

          <p className="mt-3 text-3xl font-bold text-purple-700">

            {property.appreciation}%

          </p>

        </div>

        <div className="rounded-3xl bg-orange-50 p-6 shadow">

          <p className="text-sm text-gray-500">

            Investment Score

          </p>

          <div className="mt-3 flex items-center gap-2">

            <TrendingUp className="text-orange-600" />

            <span className="text-3xl font-bold text-orange-700">

              {property.investmentScore}/5

            </span>

          </div>

        </div>

      </div>
            {/* ================= PROPERTY FEATURES ================= */}

      <div className="mt-10 grid gap-5 md:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

          <BedDouble
            size={34}
            className="mx-auto text-blue-600"
          />

          <p className="mt-4 text-3xl font-bold">
            {property.bedrooms}
          </p>

          <p className="text-gray-500">
            Bedrooms
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

          <Bath
            size={34}
            className="mx-auto text-blue-600"
          />

          <p className="mt-4 text-3xl font-bold">
            {property.bathrooms}
          </p>

          <p className="text-gray-500">
            Bathrooms
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

          <Ruler
            size={34}
            className="mx-auto text-blue-600"
          />

          <p className="mt-4 text-3xl font-bold">
            {property.area}
          </p>

          <p className="text-gray-500">
            Sq.ft
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

          <Building2
            size={34}
            className="mx-auto text-blue-600"
          />

          <p className="mt-4 text-xl font-bold">
            {property.propertyType}
          </p>

          <p className="text-gray-500">
            Property Type
          </p>

        </div>

      </div>

      {/* ================= DESCRIPTION ================= */}

      <div className="mt-12 rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-5 text-3xl font-bold">

          About this Property

        </h2>

        <p className="leading-8 text-gray-700">

          {property.description}

        </p>

      </div>

      {/* ================= AMENITIES ================= */}

      <div className="mt-12 rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-3xl font-bold">

          Amenities

        </h2>

        <div className="flex flex-wrap gap-4">

          {property.amenities?.map((amenity: string) => (

            <div
              key={amenity}
              className="rounded-full bg-blue-100 px-5 py-3 font-medium text-blue-700"
            >

              ✅ {amenity}

            </div>

          ))}

        </div>

      </div>

      {/* ================= NEARBY ================= */}

      <div className="mt-12 rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-3xl font-bold">

          Nearby Places

        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {property.nearby?.map((place: string) => (

            <div
              key={place}
              className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4"
            >

              <MapPin
                size={20}
                className="text-red-500"
              />

              <span className="font-medium">

                {place}

              </span>

            </div>

          ))}

        </div>

      </div>
            {/* ================= OWNER + ACTIONS ================= */}

      <div className="mt-12 grid gap-8 lg:grid-cols-2">

        {/* Owner */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-3xl font-bold">

            Property Owner

          </h2>

          {property.owner ? (

            <>

              <div className="space-y-4">

                <p>

                  👤 <strong>Name:</strong>{" "}
                  {property.owner.name}

                </p>

                <p>

                  📧 <strong>Email:</strong>{" "}
                  {property.owner.email}

                </p>

                <p>

                  📞 <strong>Phone:</strong>{" "}
                  {property.owner.phone}

                </p>

              </div>

             <div className="mt-8 grid grid-cols-2 gap-4">

  <a
    href={`mailto:${property.owner.email}`}
    className="
      flex items-center justify-center gap-2
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      px-6 py-3
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-xl
    "
  >
    📧
    Email Owner
  </a>

  <a
    href={`tel:${property.owner.phone}`}
    className="
      flex items-center justify-center gap-2
      rounded-2xl
      bg-gradient-to-r
      from-green-600
      to-emerald-600
      px-6 py-3
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-xl
    "
  >
    📞
    Call Owner
  </a>

</div>
            </>

          ) : (

            <p className="text-gray-500">

              Owner information not available.

            </p>

          )}

        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-3xl font-bold">

            Quick Actions

          </h2>

          <div className="grid gap-4">

      <button
  onClick={() => setShowVisitModal(true)}
  className="rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
>
  📅 Schedule Visit
</button>

            <button
  onClick={() =>
    property.owner &&
    window.open(`tel:${property.owner.phone}`)
  }
  className="rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
>
  💬 Contact Builder
</button>

         <button
  onClick={() => navigate("/compare-localities")}
  className="rounded-xl bg-orange-500 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
>
  ⚖ Compare Property
</button>

          <button
  onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    alert("Property link copied to clipboard.");
  }}
  className="rounded-xl border py-4 text-lg font-semibold transition hover:bg-gray-100"
>
  📤 Share Property
</button>

          </div>

        </div>

      </div>

      {/* ================= AI RECOMMENDATION ================= */}

      <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

        <div className="flex items-center gap-3">

          <Star
            fill="currentColor"
            className="text-yellow-300"
          />

          <h2 className="text-3xl font-bold">

            AI Investment Insight

          </h2>

        </div>

        <p className="mt-6 text-lg leading-8 text-blue-100">

          Based on the property's AI score,
          investment score, rental yield,
          appreciation rate and location,
          this property is considered a
          <span className="font-bold text-white">

            {" "}strong investment opportunity{" "}

          </span>

          for long-term appreciation and
          rental income.

        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 p-5">

            <h3 className="font-semibold">

              AI Score

            </h3>

            <p className="mt-2 text-4xl font-bold">

              {property.aiScore}/10

            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-5">

            <h3 className="font-semibold">

              Appreciation

            </h3>

            <p className="mt-2 text-4xl font-bold">

              {property.appreciation}%

            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-5">

            <h3 className="font-semibold">

              Rental Yield

            </h3>

            <p className="mt-2 text-4xl font-bold">

              {property.rentalYield}%

            </p>

          </div>

        </div>

      </div>
            {/* ================= PRICE TREND ================= */}

      <div className="mt-12 rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-3xl font-bold">

          Price Trend

        </h2>

        <div className="grid grid-cols-5 gap-3">

          {[2021, 2022, 2023, 2024, 2025].map(
            (year, index) => {

              const multiplier =
                0.78 + index * 0.08;

              const value = Math.round(
                property.price * multiplier
              );

              return (

                <div
                  key={year}
                  className="rounded-2xl bg-blue-50 p-5 text-center"
                >

                  <p className="text-gray-500">

                    {year}

                  </p>

                  <div
                    className="mx-auto mt-5 flex h-32 items-end justify-center"
                  >

                    <div
                      style={{
                        height: `${50 + index * 18}px`,
                      }}
                      className="w-10 rounded-t-xl bg-blue-600"
                    />

                  </div>

                  <p className="mt-4 font-bold text-blue-700">

                    ₹ {(value / 100000).toFixed(1)}L

                  </p>

                </div>

              );

            }
          )}

        </div>

      </div>

      {/* ================= SIMILAR PROPERTIES ================= */}

      <div className="mt-12">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">

            Similar Properties

          </h2>

          <button
            onClick={() =>
              navigate("/properties")
            }
            className="rounded-xl border px-5 py-2 hover:bg-gray-100"
          >

            View All

          </button>

        </div>

        <div className="rounded-3xl border bg-gray-50 p-10 text-center">

          <div className="text-6xl">

            🏡

          </div>

          <h3 className="mt-6 text-2xl font-bold">

            AI Similar Properties

          </h3>

          <p className="mt-4 text-gray-500">

            Similar property recommendations
            will appear here based on

            <strong>

              {" "}
              location,

            </strong>

            <strong>

              {" "}
              AI score,

            </strong>

            <strong>

              {" "}
              budget,

            </strong>

            <strong>

              {" "}
              property type

            </strong>

            and

            <strong>

              {" "}
              investment potential.

            </strong>

          </p>

          <button
            onClick={() =>
              navigate("/recommendation")
            }
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >

            Explore AI Recommendations

          </button>

        </div>

      </div>

      {/* ================= BOTTOM CTA ================= */}

      <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-10 text-center text-white shadow-xl">

        <h2 className="text-4xl font-bold">

          Need AI Advice Before Buying?

        </h2>

        <p className="mt-4 text-lg text-blue-100">

          Ask our AI Advisor to compare,
          analyse and recommend the best
          investment property for your
          budget.

        </p>

        <button
          onClick={() =>
            navigate("/ai-advisor")
          }
          className="mt-8 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:scale-105"
        >

          🤖 Open AI Advisor

        </button>

        </div>

      <ScheduleVisitModal
        open={showVisitModal}
        onClose={() => setShowVisitModal(false)}
      />

    </div>

  );

}