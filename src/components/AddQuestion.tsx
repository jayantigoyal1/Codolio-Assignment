import { useState } from "react";
import { useSheetStore } from "../store/useSheetStore";

export default function AddQuestion({ subTopicId }: { subTopicId: string }) {
  const [title, setTitle] = useState("");
  const addQuestion = useSheetStore((s) => s.addQuestion);

  const handleAdd = () => {
    if (!title.trim()) return;
    addQuestion(subTopicId, title.trim());
    setTitle("");
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New question"
        className="flex-1 border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={handleAdd}
        className="text-sm bg-gray-700 text-white px-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
