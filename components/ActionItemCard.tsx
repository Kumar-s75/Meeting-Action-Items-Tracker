"use client";

import { useState } from "react";
import { ActionItem } from "@/types";

interface Props {
  item: ActionItem;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (updated: ActionItem) => void;
}

export default function ActionItemCard({
  item,
  onToggle,
  onDelete,
  onUpdate,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(item.task);
  const [owner, setOwner] = useState(item.owner || "");
  const [dueDate, setDueDate] = useState(item.dueDate || "");

  const handleSave = async () => {
    const res = await fetch(`/api/action-item/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        owner,
        dueDate,
        status: item.status,
      }),
    });

    const updated = await res.json();
    onUpdate(updated);
    setEditing(false);
  };

  return (
    <li className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex justify-between items-start">
      <div className="flex-1">
        {editing ? (
          <div className="space-y-2">
            <input
              className="w-full border border-gray-200 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              className="w-full border border-gray-200 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <input
              className="w-full border border-gray-200 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Due date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        ) : (
          <>
            <p
              className={`font-medium text-sm ${
                item.status === "DONE"
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }`}
            >
              {item.task}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Owner: {item.owner || "—"}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Due: {item.dueDate || "—"}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-6">
        {!editing ? (
          <>
            <button
              onClick={() =>
                onToggle(item.id, item.status)
              }
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                item.status === "OPEN"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-400 text-white hover:bg-gray-500"
              }`}
            >
              {item.status === "OPEN"
                ? "Mark Done"
                : "Reopen"}
            </button>

            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 text-xs rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(item.id)}
              className="px-3 py-1 text-xs rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs rounded-md font-medium bg-black text-white hover:opacity-90 transition"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 text-xs rounded-md font-medium bg-gray-400 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}
