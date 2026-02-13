"use client";

import { useEffect, useState } from "react";

type StatusResponse = {
  backend: string;
  database: string;
  llm: string;
};

export default function StatusPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/status");
      const json = await res.json();
      setStatus(json);
    } catch {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const StatusCard = ({
    title,
    value,
  }: {
    title: string;
    value?: string;
  }) => {
    const isOk = value === "ok";

    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center">
        <div>
         
          <p
            className={`text-sm font-medium ${
              loading
                ? "text-gray-400"
                : isOk
                ? "text-gray-800"
                : "text-red-500"
            }`}
          >
            {title}
          </p>

          <p className="text-lg font-semibold mt-1 text-gray-900">
            {loading ? "Checking..." : value ?? "Unavailable"}
          </p>
        </div>

     
        <div
          className={`h-3 w-3 rounded-full ${
            loading
              ? "bg-gray-300"
              : isOk
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            System Status
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Health overview of backend services, database connectivity, and LLM integration.
          </p>
        </div>

        <div className="space-y-4">
          <StatusCard title="Backend API" value={status?.backend} />
          <StatusCard title="Database Connection" value={status?.database} />
          <StatusCard title="LLM Connection" value={status?.llm} />
        </div>

        <button
          onClick={fetchStatus}
          className="mt-8 px-4 py-2 text-sm rounded-md bg-black text-white hover:opacity-90 transition"
        >
          Refresh Status
        </button>
      </div>
    </main>
  );
}
