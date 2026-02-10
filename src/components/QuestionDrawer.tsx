import { useState } from "react";
import { useSheetStore } from "../store/useSheetStore";

export default function QuestionDrawer() {
  const active = useSheetStore((s) => s.activeQuestion);
  const setActive = useSheetStore((s) => s.setActiveQuestion);

  const [tab, setTab] = useState<"overview" | "notes">("overview");

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm"
        onClick={() => setActive(null)}
      />

      {/* Drawer */}
      <div className="w-[420px] h-full bg-neutral-900 border-l border-neutral-800 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-base font-medium tracking-tight">
            Question Details
          </h2>
          <button
            onClick={() => setActive(null)}
            className="text-neutral-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4">
          <div className="flex gap-6 text-sm border-b border-neutral-800">
            <button
              onClick={() => setTab("overview")}
              className={`pb-2 transition ${
                tab === "overview"
                  ? "text-white border-b-2 border-orange-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("notes")}
              className={`pb-2 transition ${
                tab === "notes"
                  ? "text-white border-b-2 border-orange-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Notes
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-4 overflow-y-auto text-sm">
          {tab === "overview" && (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-400 mb-1">
                  Difficulty
                </div>
                <div className="text-yellow-400 font-medium">
                  Medium
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-400 mb-1">
                  Sheet
                </div>
                <div className="text-neutral-200">
                  Strivers A2Z DSA Sheet
                </div>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <textarea
              placeholder="Write your notes here..."
              className="w-full h-full bg-neutral-800 rounded-md p-3 text-sm
                         focus:outline-none focus:ring-1 focus:ring-orange-500
                         resize-none"
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-neutral-800">
          <button
            className="w-full bg-orange-500 hover:bg-orange-400
                       text-black py-2 rounded-md text-sm font-medium transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
