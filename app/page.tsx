"use client";

import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    const res = await fetch("/api/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        Meeting Action Items Tracker
      </h1>

      <textarea
        className="w-full p-4 border rounded mb-4"
        rows={5}
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Processing..." : "Extract Action Items"}
      </button>

      {data && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Action Items</h2>
          <ul className="space-y-3">
            {data.items.map((item: any) => (
              <li
                key={item.id}
                className="p-4 bg-white rounded shadow"
              >
                <p className="font-medium">{item.task}</p>
                <p className="text-sm text-gray-600">
                  Owner: {item.owner || "—"}
                </p>
                <p className="text-sm text-gray-600">
                  Due: {item.dueDate || "—"}
                </p>
                <p className="text-sm">
                  Status: {item.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
