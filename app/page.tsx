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
import AddActionItem from "@/components/AddActionItem";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [data, setData] = useState<Transcript | null>(null);
  const [history, setHistory] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");

  // Fetch transcript history
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

  // Extract transcript
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

  // Toggle status
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

  // Delete item
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

  // Update after edit
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

  // Apply filter
  const filteredItems =
    data?.items.filter((item) => {
      if (filter === "ALL") return true;
      return item.status === filter;
    }) ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
        {/* Main Workspace */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              Meeting Action Items Tracker
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Paste your meeting transcript and extract structured action items.
              Edit, manage, and track completion status.
            </p>
          </div>

          {/* Transcript Input Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <TranscriptInput
              transcript={transcript}
              loading={loading}
              onChange={setTranscript}
              onSubmit={handleSubmit}
            />
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm">{error}</p>
          )}

          {!data && (
            <p className="text-gray-500 mt-6 text-sm">
              No transcript processed yet.
            </p>
          )}

          {data && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">
                Action Items
              </h2>

              {/* Add Item */}
              <AddActionItem
                transcriptId={data.id}
                onCreate={(item) =>
                  setData((prev) =>
                    prev
                      ? {
                          ...prev,
                          items: [...prev.items, item],
                        }
                      : prev
                  )
                }
                onError={setError}
              />

              {/* Filters */}
              <div className="flex gap-2 mt-4 mb-6">
                {["ALL", "OPEN", "DONE"].map((value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setFilter(value as Filter)
                    }
                    className={`px-4 py-1.5 text-sm rounded-md border transition ${
                      filter === value
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
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

        {/* Sidebar */}
        <HistorySidebar
          history={history}
          onSelect={setData}
        />
      </div>
    </main>
  );
}
