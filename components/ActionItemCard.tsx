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
    <li className="p-4 bg-white rounded shadow flex justify-between items-start">
      <div className="flex-1">
        {editing ? (
          <div className="space-y-2">
            <input
              className="w-full border p-1 rounded"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              className="w-full border p-1 rounded"
              placeholder="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <input
              className="w-full border p-1 rounded"
              placeholder="Due date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-4">
        {!editing && (
          <>
            <button
              onClick={() =>
                onToggle(item.id, item.status)
              }
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              {item.status === "OPEN"
                ? "Done"
                : "Reopen"}
            </button>

            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(item.id)}
              className="px-3 py-1 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </>
        )}

        {editing && (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded bg-black text-white"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 rounded bg-gray-400 text-white"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}
