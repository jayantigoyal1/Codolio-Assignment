import { useState } from "react";
import { useSheetStore } from "../store/useSheetStore";

export default function AddSubTopic({ topicId }: { topicId: string }) {
  const [title, setTitle] = useState("");
  const addSubTopic = useSheetStore((s) => s.addSubTopic);

  const handleAdd = () => {
    if (!title.trim()) return;
    addSubTopic(topicId, title.trim());
    setTitle("");
  };

  return (
    <div className="flex gap-2 mt-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New sub-topic"
        className="flex-1 border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={handleAdd}
        className="text-sm bg-gray-800 text-white px-3 rounded"
      >
        Add
      </button>
    </div>
  );
}
