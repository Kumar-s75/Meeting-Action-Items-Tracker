export async function extractTranscript(transcript: string) {
  const res = await fetch("/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  if (!res.ok) {
    throw new Error("Failed to extract transcript");
  }

  return res.json();
}

export async function fetchTranscripts() {
  const res = await fetch("/api/transcripts");

  if (!res.ok) {
    throw new Error("Failed to fetch transcripts");
  }

  return res.json();
}

export async function updateActionItem(
  id: string,
  payload: Record<string, unknown>
) {
  const res = await fetch(`/api/action-item/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update action item");
  }

  return res.json();
}

export async function deleteActionItem(id: string) {
  const res = await fetch(`/api/action-item/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete action item");
  }

  return true;
}

export async function createActionItem(
  payload: Record<string, unknown>
) {
  const res = await fetch(`/api/action-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create action item");
  }

  return res.json();
}
