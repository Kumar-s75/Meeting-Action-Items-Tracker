export type Status = "OPEN" | "DONE";

export interface ActionItem {
  id: string;
  task: string;
  owner?: string | null;
  dueDate?: string | null;
  status: Status;
  transcriptId: string;
  createdAt: string;
}

export interface Transcript {
  id: string;
  content: string;
  createdAt: string;
  items: ActionItem[];
}
