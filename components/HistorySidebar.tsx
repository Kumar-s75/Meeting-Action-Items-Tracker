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
    <div className="w-80 bg-white p-4 rounded shadow h-fit">
      <h2 className="text-lg font-semibold mb-3">
        Recent Transcripts
      </h2>

      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(item)}
          >
            <p className="text-sm truncate">
              {item.content}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
