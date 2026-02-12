"use client";

import { useState, useEffect } from "react";
import { Transcript } from "@/types";
import TranscriptInput from "@/components/TranscriptInput";
import ActionItemList from "@/components/ActionItemList";
import HistorySidebar from "@/components/HistorySidebar";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [data, setData] = useState<Transcript | null>(null);
  const [history, setHistory] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState<"ALL" | "OPEN" | "DONE">("ALL");

  const fetchHistory = async () => {
    const res = await fetch("/api/transcripts");
    const json = await res.json();
    setHistory(json);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    const res = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    const json = await res.json();
    setData(json);
    setTranscript("");
    setLoading(false);
    fetchHistory();
  };

  const toggleStatus = async (
    id: string,
    currentStatus: string
  ) => {
    const newStatus =
      currentStatus === "OPEN" ? "DONE" : "OPEN";

    await fetch(`/api/action-item/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setData((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.map((item) =>
              item.id === id
                ? { ...item, status: newStatus }
                : item
            ),
          }
        : prev
    );
  };
const deleteItem = async (id: string) => {
  await fetch(`/api/action-item/${id}`, {
    method: "DELETE",
  });

  setData((prev) =>
    prev
      ? {
          ...prev,
          items: prev.items.filter(
            (item) => item.id !== id
          ),
        }
      : prev
  );
};
const filteredItems =
  data?.items.filter((item) => {
    if (filter === "ALL") return true;
    return item.status === filter;
  }) ?? [];
const updateItem = (updatedItem: any) => {
  setData((prev) =>
    prev
      ? {
          ...prev,
          items: prev.items.map((item) =>
            item.id === updatedItem.id
              ? updatedItem
              : item
          ),
        }
      : prev
  );
};

  return (
    <main className="min-h-screen p-10 bg-gray-50 flex gap-10">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">
          Meeting Action Items Tracker
        </h1>

        <TranscriptInput
          transcript={transcript}
          loading={loading}
          onChange={setTranscript}
          onSubmit={handleSubmit}
        />

        {data && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Action Items
            </h2>
{data && (
  <div className="mt-6 flex gap-2 mb-4">
    {["ALL", "OPEN", "DONE"].map((value) => (
      <button
        key={value}
        onClick={() => setFilter(value as any)}
        className={`px-4 py-1 rounded border ${
          filter === value
            ? "bg-black text-white"
            : "bg-white"
        }`}
      >
        {value}
      </button>
    ))}
  </div>
)}

<ActionItemList
  items={filteredItems}
  onToggle={toggleStatus}
  onDelete={deleteItem}
  onUpdate={updateItem}
/>



          </div>
        )}
      </div>

      <HistorySidebar
        history={history}
        onSelect={setData}
      />
    </main>
  );
}
