import { useState } from "react";

export default function Accordion({
  title,
  right,
  children,
  defaultOpen = false
}: {
  title: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral-800/40 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className={`text-[10px] transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
            ▶
          </span>
          <div className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
            {title}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {right}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 space-y-2 border-t border-neutral-800/50 bg-neutral-950/20">
          {children}
        </div>
      )}
    </div>
  );
}