"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function ClampText({
  text,
  lines,
  className = "max-w-prose",
}: {
  text: string;
  lines: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // ensure we measure in the clamped state
    el.classList.remove("line-clamp-none");
    el.classList.add(`line-clamp-${lines}`);
    requestAnimationFrame(() => {
      setCanExpand(el.scrollHeight > el.clientHeight + 1);
    });
  }, [text]);

  return (
    <div className={className}>
      <p ref={ref} className={open ? "line-clamp-none" : `line-clamp-${lines}`}>
        {text}
      </p>

      {canExpand && (
        <button
          type="button"
          className="mt-2 text-sm text-slate-700 hover:underline flex items-center gap-1"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Show less" : "Show more"}{" "}
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}
