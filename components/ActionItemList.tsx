"use client";

import { ActionItem } from "@/types";
import ActionItemCard from "./ActionItemCard";

interface Props {
  items: ActionItem[];
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (updated: ActionItem) => void;
}

export default function ActionItemList({
  items,
  onToggle,
  onDelete,
  onUpdate,
}: Props) {
  if (!items.length) {
    return <p className="text-gray-500">No action items.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <ActionItemCard
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
