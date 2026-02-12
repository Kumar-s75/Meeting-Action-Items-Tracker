"use client";

import { ActionItem } from "@/types";

interface Props {
  item: ActionItem;
  onToggle: (id: string, status: string) => void;
}

export default function ActionItemCard({ item, onToggle }: Props) {
  return (
    <li className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <p
          className={`font-medium ${
            item.status === "DONE"
              ? "line-through text-gray-400"
              : ""
          }`}
        >
          {item.task}
        </p>

        <p className="text-sm text-gray-600">
          Owner: {item.owner || "—"}
        </p>

        <p className="text-sm text-gray-600">
          Due: {item.dueDate || "—"}
        </p>
      </div>

      <button
        onClick={() => onToggle(item.id, item.status)}
        className={`px-3 py-1 rounded text-white ${
          item.status === "OPEN"
            ? "bg-green-600"
            : "bg-gray-500"
        }`}
      >
        {item.status === "OPEN"
          ? "Mark Done"
          : "Reopen"}
      </button>
    </li>
  );
}
