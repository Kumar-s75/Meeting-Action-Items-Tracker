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
        className="w-full p-4 border rounded mb-4"
        rows={5}
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        onClick={onSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Processing..." : "Extract Action Items"}
      </button>
    </>
  );
}
