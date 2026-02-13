"use client";

interface Props {
  transcript: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TranscriptInput({
  transcript,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <>
      <textarea
        className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition text-gray-950"
        rows={5}
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        onClick={onSubmit}
        className="mt-3 px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:opacity-90 transition"
      >
        {loading ? "Processing..." : "Extract Action Items"}
      </button>
    </>
  );
}
