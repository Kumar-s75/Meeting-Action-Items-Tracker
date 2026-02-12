"use client";

import { useState, useEffect } from "react";
import {
  extractTranscript,
  fetchTranscripts,
  updateActionItem,
  deleteActionItem,
} from "@/lib/api";
import { Transcript, ActionItem, Filter } from "@/types";
import TranscriptInput from "@/components/TranscriptInput";
import ActionItemList from "@/components/ActionItemList";
import HistorySidebar from "@/components/HistorySidebar";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [data, setData] = useState<Transcript | null>(null);
  const [history, setHistory] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");

  const fetchHistory = async () => {
    try {
      const json = await fetchTranscripts();
      setHistory(json);
    } catch {
      setError("Failed to load transcript history.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      setError("Transcript cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const json = await extractTranscript(transcript);

      setData(json);
      setTranscript("");
      fetchHistory();
    } catch {
      setError("Failed to extract action items.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (
    id: string,
    currentStatus: string
  ) => {
    const newStatus =
      currentStatus === "OPEN" ? "DONE" : "OPEN";

    try {
      await updateActionItem(id, { status: newStatus });

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
    } catch {
      setError("Failed to update item status.");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteActionItem(id);

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
    } catch {
      setError("Failed to delete item.");
    }
  };

  const updateItem = (updatedItem: ActionItem) => {
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

  const filteredItems =
    data?.items.filter((item) => {
      if (filter === "ALL") return true;
      return item.status === filter;
    }) ?? [];

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

        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}

        {!data && (
          <p className="text-gray-500 mt-6">
            No transcript processed yet.
          </p>
        )}

        {data && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Action Items
            </h2>

            <div className="flex gap-2 mb-4">
              {["ALL", "OPEN", "DONE"].map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    setFilter(value as Filter)
                  }
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
