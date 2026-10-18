
import { useState } from "react";
import { FiDownload, FiShare2 } from "react-icons/fi";

type ReportHeaderProps = {
  title: string;
  industry: string;
  generatedAt: string;
  reportContent?: string;
};

function ReportHeader({
  title,
  industry,
  generatedAt,
  reportContent,
}: ReportHeaderProps) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const shareText = [
      title,
      `Repository: ${industry}`,
      `Generated: ${generatedAt}`,
      "",
      reportContent ?? "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: shareText,
        });
        setMessage("Report shared successfully.");
      } else {
        await navigator.clipboard.writeText(shareText);
        setMessage("Report details copied to your clipboard.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setMessage("Sharing was cancelled.");
      } else {
        setMessage("Unable to share the report.");
      }
    }

    window.setTimeout(() => setMessage(""), 2500);
  }

  function handleExport() {
    const content = [
      "INSIGHTFORGE AI REPORT",
      "",
      `Title: ${title}`,
      `Repository: ${industry}`,
      `Generated: ${generatedAt}`,
      "",
      reportContent || "No detailed report content is available yet.",
    ].join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "insightforge-report"}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setMessage("Report exported successfully.");
    window.setTimeout(() => setMessage(""), 2500);
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            InsightForge AI Report
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
            <span>Repository: {industry}</span>
            <span className="hidden sm:inline">•</span>
            <span>Generated {generatedAt}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FiShare2 size={16} />
            Share Report
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className="mt-5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-300"
        >
          {message}
        </p>
      )}
    </section>
  );
}

export default ReportHeader;
