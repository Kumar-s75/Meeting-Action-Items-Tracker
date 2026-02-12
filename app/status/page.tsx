"use client";

import { useEffect, useState } from "react";

interface Status {
  backend: string;
  database: string;
  llm: string;
}

export default function StatusPage() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  const renderBadge = (value: string) => {
    const color =
      value === "ok"
        ? "bg-green-500"
        : "bg-red-500";

    return (
      <span
        className={`px-3 py-1 rounded text-white ${color}`}
      >
        {value}
      </span>
    );
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        System Status
      </h1>

      {!status && <p>Checking system health...</p>}

      {status && (
        <div className="space-y-4">
          <div className="flex justify-between bg-white p-4 rounded shadow">
            <span>Backend</span>
            {renderBadge(status.backend)}
          </div>

          <div className="flex justify-between bg-white p-4 rounded shadow">
            <span>Database</span>
            {renderBadge(status.database)}
          </div>

          <div className="flex justify-between bg-white p-4 rounded shadow">
            <span>LLM Connection</span>
            {renderBadge(status.llm)}
          </div>
        </div>
      )}
    </main>
  );
}
