import { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  IndianRupee,
  X,
} from "lucide-react";

import { usePortfolio } from "@/context/PortfolioContext";

import type {
  PortfolioInvestment,
  UpdateInvestmentPayload,
} from "@/types/portfolio";

interface EditInvestmentModalProps {
  open: boolean;
  investment: PortfolioInvestment | null;
  onClose: () => void;
}

interface EditForm {
  propertyName: string;
  city: string;
  propertyType: string;
  purchasePrice: string;
  currentValue: string;
  purchaseDate: string;
  monthlyRent: string;
  loanAmount: string;
  notes: string;
}

const createFormFromInvestment = (
  investment: PortfolioInvestment
): EditForm => ({
  propertyName: investment.propertyName ?? "",
  city: investment.city ?? "",
  propertyType:
    investment.propertyType ?? "Apartment",
  purchasePrice: String(
    investment.purchasePrice ?? ""
  ),
  currentValue: String(
    investment.currentValue ?? ""
  ),
  purchaseDate: investment.purchaseDate
    ? investment.purchaseDate.slice(0, 10)
    : "",
  monthlyRent: String(
    investment.monthlyRent ?? 0
  ),
  loanAmount: String(
    investment.loanAmount ?? 0
  ),
  notes: investment.notes ?? "",
});

export default function EditInvestmentModal({
  open,
  investment,
  onClose,
}: EditInvestmentModalProps) {
  const { updateInvestment } =
    usePortfolio();

  const [form, setForm] = useState<EditForm>({
    propertyName: "",
    city: "",
    propertyType: "Apartment",
    purchasePrice: "",
    currentValue: "",
    purchaseDate: "",
    monthlyRent: "0",
    loanAmount: "0",
    notes: "",
  });

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (investment) {
      setForm(
        createFormFromInvestment(
          investment
        )
      );

      setError("");
    }
  }, [investment]);

  if (!open || !investment) {
    return null;
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (
      !form.propertyName.trim() ||
      !form.city.trim() ||
      !form.purchasePrice ||
      !form.currentValue ||
      !form.purchaseDate
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    if (
      Number(form.purchasePrice) < 0 ||
      Number(form.currentValue) < 0 ||
      Number(form.monthlyRent) < 0 ||
      Number(form.loanAmount) < 0
    ) {
      setError(
        "Financial values cannot be negative."
      );

      return;
    }

    try {
      setSaving(true);

      const payload: UpdateInvestmentPayload =
        {
          propertyName:
            form.propertyName.trim(),

          city: form.city.trim(),

          propertyType:
            form.propertyType,

          purchasePrice:
            Number(form.purchasePrice),

          currentValue:
            Number(form.currentValue),

          purchaseDate:
            form.purchaseDate,

          monthlyRent:
            Number(form.monthlyRent) || 0,

          loanAmount:
            Number(form.loanAmount) || 0,

          notes:
            form.notes.trim(),
        };

      await updateInvestment(
        investment._id,
        payload
      );

      onClose();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to update investment. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) {
      return;
    }

    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <Building2
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Edit Investment
              </h2>

              <p className="text-sm text-slate-500">
                Update your property investment details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Property information */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
              Property Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Property Name *
                </label>

                <input
                  name="propertyName"
                  value={form.propertyName}
                  onChange={handleChange}
                  placeholder="e.g. Sky Heights Apartment"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  City *
                </label>

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Ahmedabad"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Property Type *
                </label>

                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="Villa">
                    Villa
                  </option>

                  <option value="House">
                    House
                  </option>

                  <option value="Plot">
                    Plot
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>

                  <option value="Office">
                    Office
                  </option>

                  <option value="Shop">
                    Shop
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial information */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
              Financial Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Purchase Price *
                </label>

                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    name="purchasePrice"
                    value={
                      form.purchasePrice
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Current Value *
                </label>

                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    name="currentValue"
                    value={
                      form.currentValue
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Purchase Date *
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    name="purchaseDate"
                    value={
                      form.purchaseDate
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Monthly Rent
                </label>

                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    name="monthlyRent"
                    value={
                      form.monthlyRent
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Loan Amount
                </label>

                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    name="loanAmount"
                    value={
                      form.loanAmount
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Investment Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add important information about this investment..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}