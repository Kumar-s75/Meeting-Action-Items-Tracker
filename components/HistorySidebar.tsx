"use client";

import { Transcript } from "@/types";

interface Props {
  history: Transcript[];
  onSelect: (t: Transcript) => void;
}

export default function HistorySidebar({
  history,
  onSelect,
}: Props) {
  return (
    <aside className="w-80 bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">
        Recent Transcripts
      </h2>

      {history.length === 0 ? (
        <p className="text-xs text-gray-500">
          No transcripts processed yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-xs text-gray-800 truncate">
                {item.content}
              </p>

              <p className="text-[11px] text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
