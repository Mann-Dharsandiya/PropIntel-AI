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
  CalendarDays,
  Phone,
  Mail,
  Share2,
  Scale,
  Sparkles,
  CheckCircle2,
  Navigation,
  ExternalLink,
} from "lucide-react";

import { getProperty, Property } from "@/api/property";
import { addRecentlyViewed } from "@/api/recentlyViewed";
import FavoriteButton from "@/components/property/FavoriteButton";
import ScheduleVisitModal from "@/components/property/ScheduleVisitModal";

/* =========================================================
   FALLBACK GALLERY IMAGES
========================================================= */

function getFallbackGallery(propertyType: string): string[] {
  switch (propertyType) {
    case "Apartment":
      return [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
      ];

    case "Villa":
      return [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      ];

    case "House":
      return [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1400&q=85",
      ];

    case "Plot":
      return [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1400&q=85",
      ];

    case "Commercial":
      return [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=85",
      ];

    default:
      return [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1400&q=85",
      ];
  }
}

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

        const data = await getProperty(id);

        setProperty(data);

        console.log("PROPERTY =", data);
        console.log("IMAGES =", data.images);
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

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="pi-page flex min-h-screen items-center justify-center">
        <div className="px-6 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-blue-600 border-t-transparent" />
          </div>

          <h2 className="mt-6 font-display text-2xl font-bold text-ink">
            Loading Property
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Preparing property details for you...
          </p>

        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="pi-page flex min-h-screen items-center justify-center px-5">
        <div className="pi-card w-full max-w-md p-8 text-center md:p-10">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="pi-btn pi-btn-primary mt-7 w-full"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

        </div>
      </div>
    );
  }

  /* =========================================================
     PROPERTY NOT FOUND
  ========================================================= */

  if (!property) {
    return (
      <div className="pi-page flex min-h-[70vh] items-center justify-center px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl shadow-sm">
            🏡
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold text-ink">
            Property not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The property you're looking for is unavailable.
          </p>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="pi-btn pi-btn-primary mt-6"
          >
            Browse Properties
          </button>

        </div>
      </div>
    );
  }

  /* =========================================================
     IMAGE GALLERY LOGIC
  ========================================================= */

  const fallbackImages =
    getFallbackGallery(property.propertyType);

  const backendImages =
    Array.isArray(property.images)
      ? property.images.filter(
          (image): image is string =>
            typeof image === "string" &&
            image.trim().length > 0
        )
      : [];

  const images = [
    ...backendImages,
    ...fallbackImages.filter(
      (image) =>
        !backendImages.includes(image)
    ),
  ].slice(0, 5);

  if (images.length === 0) {
    images.push(
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=85"
    );
  }

  const safeSelectedImage =
    selectedImage >= images.length
      ? 0
      : selectedImage;

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev >= images.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev <= 0
        ? images.length - 1
        : prev - 1
    );
  };

  /* =========================================================
     SHARE
  ========================================================= */

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} on PropIntel AI.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "Property link copied to clipboard."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pi-page min-h-screen">

      <div className="pi-container py-6 md:py-8 lg:py-10">

        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="pi-btn pi-btn-secondary mb-6"
        >
          <ArrowLeft size={17} />
          Back to Listings
        </button>

        {/* =====================================================
            IMAGE GALLERY
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">

          <div className="grid gap-3 lg:grid-cols-[112px_minmax(0,1fr)]">

            {/* =================================================
                THUMBNAILS
            ================================================== */}

            <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0">

              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage(index)
                  }
                  aria-label={`View property image ${index + 1}`}
                  className={`
                    group relative shrink-0 overflow-hidden
                    rounded-2xl border-2
                    transition-all duration-300
                    ${
                      safeSelectedImage === index
                        ? "border-blue-600 shadow-md"
                        : "border-transparent hover:border-slate-300"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.src =
                        fallbackImages[
                          index %
                            fallbackImages.length
                        ];
                    }}
                    className="h-20 w-24 object-cover transition-transform duration-500 group-hover:scale-105 lg:h-[92px] lg:w-full"
                  />

                  {safeSelectedImage === index && (
                    <div className="absolute inset-0 border-2 border-blue-500/20" />
                  )}
                </button>
              ))}

            </div>

            {/* =================================================
                MAIN IMAGE
            ================================================== */}

            <div className="relative order-1 min-w-0 lg:order-2">

              <div className="relative overflow-hidden rounded-2xl">

                <img
                  src={images[safeSelectedImage]}
                  alt={property.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      fallbackImages[
                        safeSelectedImage %
                          fallbackImages.length
                      ];
                  }}
                  className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[570px]"
                />

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/10" />

                {/* Featured */}
                {property.featured && (
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-lg backdrop-blur-md">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-brass-400"
                    />
                    Featured
                  </div>
                )}

                {/* Verified */}
                {property.verified && (
                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-600/90 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                    <ShieldCheck size={16} />
                    Verified
                  </div>
                )}

                {/* Property type */}
                <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-slate-950/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                  {property.propertyType}
                </div>

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    {safeSelectedImage + 1} / {images.length}
                  </div>
                )}

                {/* Previous */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Next */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            HERO / PROPERTY HEADER
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-static relative overflow-hidden p-6 md:p-8">

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-brass-100/40 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

              <div className="min-w-0">

                {/* Builder */}
                <div className="flex flex-wrap items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <Building2
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-sm font-semibold text-blue-700">
                    {property.builder}
                  </span>

                  {property.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  )}

                </div>

                {/* Title */}
                <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  {property.title}
                </h1>

                {/* Location */}
                <div className="mt-5 flex items-start gap-2.5 text-sm text-slate-500">

                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-brass-500"
                  />

                  <span>
                    {property.address},{" "}
                    {property.locality},{" "}
                    {property.city}
                  </span>

                </div>

                {/* Price */}
                <div className="mt-6 flex flex-wrap items-baseline gap-2">

                  <IndianRupee
                    size={29}
                    className="text-brass-600"
                  />

                  <span className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {property.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="text-sm font-medium text-slate-400">
                    Property Price
                  </span>

                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">

                <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                  <FavoriteButton
                    propertyId={property._id}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="pi-btn pi-btn-secondary"
                >
                  <Share2 size={17} />
                  <span className="hidden sm:inline">
                    Share
                  </span>
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            AI ANALYTICS
        ====================================================== */}

        <section className="mt-8">

          <div className="mb-5">
            <div className="pi-section-label">
              Property Intelligence
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
              AI Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Key investment indicators generated from property data.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* AI Score */}
            <div className="pi-card-static p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    AI Score
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <Star
                      size={21}
                      fill="currentColor"
                      className="text-brass-500"
                    />

                    <span className="font-display text-3xl font-bold text-ink">
                      {property.aiScore}
                      <span className="text-base text-slate-400">
                        /10
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles size={18} />
                </div>

              </div>

            </div>

            {/* Rental Yield */}
            <div className="pi-card-static p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Rental Yield
                  </p>

                  <p className="mt-3 font-display text-3xl font-bold text-emerald-700">
                    {property.rentalYield}%
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={18} />
                </div>

              </div>

            </div>

            {/* Appreciation */}
            <div className="pi-card-static p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Appreciation
                  </p>

                  <p className="mt-3 font-display text-3xl font-bold text-violet-700">
                    {property.appreciation}%
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <TrendingUp size={18} />
                </div>

              </div>

            </div>

            {/* Investment Score */}
            <div className="pi-card-static p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Investment Score
                  </p>

                  <p className="mt-3 font-display text-3xl font-bold text-orange-700">
                    {property.investmentScore}
                    <span className="text-base text-slate-400">
                      /5
                    </span>
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <TrendingUp size={18} />
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROPERTY FEATURES
        ====================================================== */}

        <section className="mt-8">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Bedrooms */}
            <div className="pi-card-static p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <BedDouble size={23} />
                </div>

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {property.bedrooms}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Bedrooms
                  </p>
                </div>

              </div>

            </div>

            {/* Bathrooms */}
            <div className="pi-card-static p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Bath size={23} />
                </div>

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {property.bathrooms}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Bathrooms
                  </p>
                </div>

              </div>

            </div>

            {/* Area */}
            <div className="pi-card-static p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brass-50 text-brass-600">
                  <Ruler size={23} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-display text-2xl font-bold text-ink">
                    {property.area}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Sq.ft
                  </p>
                </div>

              </div>

            </div>

            {/* Property Type */}
            <div className="pi-card-static p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Building2 size={23} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold text-ink">
                    {property.propertyType}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Property Type
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-static p-6 md:p-8">

            <div className="pi-section-label">
              Property Overview
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              About this Property
            </h2>

            <p className="mt-5 max-w-5xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              {property.description}
            </p>

          </div>

        </section>

        {/* =====================================================
            AMENITIES
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-static p-6 md:p-8">

            <div className="pi-section-label">
              Property Features
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Amenities
            </h2>

            {property.amenities?.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {property.amenities.map(
                  (amenity: string) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5"
                    >
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-500"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {amenity}
                      </span>
                    </div>
                  )
                )}

              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                No amenities listed for this property.
              </p>
            )}

          </div>

        </section>

        {/* =====================================================
            NEARBY
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-static p-6 md:p-8">

            <div className="pi-section-label">
              Location Intelligence
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Nearby Places
            </h2>

            {property.nearby?.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {property.nearby.map(
                  (place: string) => (
                    <div
                      key={place}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Navigation size={17} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {place}
                      </span>
                    </div>
                  )
                )}

              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                Nearby information is not available.
              </p>
            )}

          </div>

        </section>

        {/* =====================================================
            OWNER + QUICK ACTIONS
        ====================================================== */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* =================================================
              OWNER
          ================================================== */}

          <div className="pi-card-static p-6 md:p-8">

            <div className="pi-section-label">
              Contact
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
              Property Owner
            </h2>

            {property.owner ? (
              <>
                <div className="mt-6 space-y-4">

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Building2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-ink">
                        {property.owner.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-ink">
                        {property.owner.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Phone size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Phone
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-ink">
                        {property.owner.phone}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <a
                    href={`mailto:${property.owner.email}`}
                    className="pi-btn pi-btn-primary w-full"
                  >
                    <Mail size={17} />
                    Email Owner
                  </a>

                  <a
                    href={`tel:${property.owner.phone}`}
                    className="pi-btn w-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <Phone size={17} />
                    Call Owner
                  </a>

                </div>
              </>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Owner information not available.
                </p>
              </div>
            )}

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================== */}

          <div className="pi-card-dark relative overflow-hidden p-6 md:p-8">

            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-brass-400/10 blur-3xl" />

            <div className="relative">

              <div className="pi-section-label text-brass-300">
                Next Steps
              </div>

              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
                Quick Actions
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Take action on this property or continue your investment research.
              </p>

              <div className="mt-6 grid gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowVisitModal(true)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  <CalendarDays size={18} />
                  Schedule Visit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    property.owner &&
                    window.open(
                      `tel:${property.owner.phone}`
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  <Phone size={18} />
                  Contact Builder
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/compare-localities"
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-brass-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-brass-400"
                >
                  <Scale size={18} />
                  Compare Property
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Share2 size={18} />
                  Share Property
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            AI RECOMMENDATION
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-dark relative overflow-hidden p-6 md:p-8 lg:p-10">

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-brass-400/10 blur-3xl" />

            <div className="relative">

              <div className="flex flex-wrap items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brass-400/10 text-brass-300">
                  <Sparkles size={21} />
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-brass-300">
                    AI Intelligence
                  </div>

                  <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
                    AI Investment Insight
                  </h2>
                </div>

              </div>

              <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                Based on the property's AI score,
                investment score, rental yield,
                appreciation rate and location,
                this property is considered a{" "}
                <span className="font-semibold text-white">
                  strong investment opportunity
                </span>{" "}
                for long-term appreciation and
                rental income.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    AI Score
                  </p>

                  <p className="mt-2 font-display text-3xl font-bold text-white">
                    {property.aiScore}/10
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Appreciation
                  </p>

                  <p className="mt-2 font-display text-3xl font-bold text-white">
                    {property.appreciation}%
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Rental Yield
                  </p>

                  <p className="mt-2 font-display text-3xl font-bold text-white">
                    {property.rentalYield}%
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PRICE TREND
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-static p-6 md:p-8">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>
                <div className="pi-section-label">
                  Market Intelligence
                </div>

                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Price Trend
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Historical price trend based on the property's current value.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
                <TrendingUp size={15} />
                Historical View
              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">

              {[2021, 2022, 2023, 2024, 2025].map(
                (year, index) => {

                  const multiplier =
                    0.78 + index * 0.08;

                  const value =
                    Math.round(
                      property.price *
                        multiplier
                    );

                  return (
                    <div
                      key={year}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center"
                    >

                      <p className="text-xs font-semibold text-slate-400">
                        {year}
                      </p>

                      <div className="mx-auto mt-4 flex h-32 items-end justify-center">

                        <div
                          style={{
                            height: `${
                              50 +
                              index * 18
                            }px`,
                          }}
                          className="w-8 rounded-t-lg bg-gradient-to-t from-blue-700 to-blue-400 transition-all duration-500"
                        />

                      </div>

                      <p className="mt-4 font-display text-sm font-bold text-blue-700">
                        ₹{" "}
                        {(
                          value / 100000
                        ).toFixed(1)}
                        L
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            SIMILAR PROPERTIES
        ====================================================== */}

        <section className="mt-8">

          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <div className="pi-section-label">
                Recommendations
              </div>

              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Similar Properties
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore AI-powered property recommendations.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/properties")
              }
              className="pi-btn pi-btn-secondary"
            >
              View All
              <ExternalLink size={15} />
            </button>

          </div>

          <div className="pi-card-static overflow-hidden p-8 text-center md:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              🏡
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-ink">
              AI Similar Properties
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Similar property recommendations
              will appear here based on{" "}
              <strong className="text-slate-700">
                location
              </strong>
              ,{" "}
              <strong className="text-slate-700">
                AI score
              </strong>
              ,{" "}
              <strong className="text-slate-700">
                budget
              </strong>
              ,{" "}
              <strong className="text-slate-700">
                property type
              </strong>{" "}
              and{" "}
              <strong className="text-slate-700">
                investment potential
              </strong>
              .
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/recommendation"
                )
              }
              className="pi-btn pi-btn-primary mt-7"
            >
              <Sparkles size={17} />
              Explore AI Recommendations
            </button>

          </div>

        </section>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <section className="mt-8">

          <div className="pi-card-dark relative overflow-hidden p-8 text-center md:p-12">

            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-brass-400/10 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brass-400/20 bg-brass-400/10 text-brass-300">
                <Sparkles size={24} />
              </div>

              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
                Need AI Advice Before Buying?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Ask our AI Advisor to compare,
                analyse and recommend the best
                investment property for your
                budget.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/ai-advisor")
                }
                className="pi-btn pi-btn-brass mt-7"
              >
                <Sparkles size={17} />
                Open AI Advisor
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            SCHEDULE VISIT MODAL
        ====================================================== */}

        <ScheduleVisitModal
          open={showVisitModal}
          onClose={() =>
            setShowVisitModal(false)
          }
        />

      </div>
    </div>
  );
}