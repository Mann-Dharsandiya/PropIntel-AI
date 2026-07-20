import { Share2, Copy, Printer } from "lucide-react";

interface Props {
  first: any;
  second: any;
}

export default function ComparisonActions({
  first,
  second,
}: Props) {

  const copyLink = async () => {
    const url = window.location.href;

    await navigator.clipboard.writeText(url);

    alert("Comparison link copied!");
  };

  const printReport = () => {
    window.print();
  };

  const shareComparison = async () => {
    const title = `${first.locality} vs ${second.locality}`;

    const text = `Compare ${first.locality} and ${second.locality} using PropIntel AI`;

    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url: window.location.href,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8">

      <button
        onClick={copyLink}
        className="flex items-center gap-2 rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-800 transition"
      >
        <Copy size={18} />
        Copy Link
      </button>

      <button
        onClick={printReport}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        <Printer size={18} />
        Print
      </button>

      <button
        onClick={shareComparison}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
      >
        <Share2 size={18} />
        Share
      </button>

    </div>
  );
}