"use client";

import { useState } from "react";
import { createActionItem } from "@/lib/api";
import { ActionItem } from "@/types";

interface Props {
  transcriptId: string;
  onCreate: (item: ActionItem) => void;
  onError: (message: string) => void;
}

export default function AddActionItem({
  transcriptId,
  onCreate,
  onError,
}: Props) {
  const [adding, setAdding] = useState(false);
  const [task, setTask] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = async () => {
    if (!task.trim()) {
      onError("Task is required.");
      return;
    }

    try {
      const created = await createActionItem({
        transcriptId,
        task,
        owner,
        dueDate,
      });

      onCreate(created);

      setTask("");
      setOwner("");
      setDueDate("");
      setAdding(false);
    } catch {
      onError("Failed to create action item.");
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-1 rounded bg-blue-600 text-white"
        >
          + Add Item
        </button>
      </div>

      {adding && (
        <div className="bg-white p-4 rounded shadow mb-4 space-y-2">
          <input
            className="w-full border p-2 rounded"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="px-3 py-1 rounded bg-black text-white"
            >
              Save
            </button>
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1 rounded bg-gray-400 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
