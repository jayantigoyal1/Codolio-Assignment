import { useState } from "react";
import { useSheetStore } from "../store/useSheetStore";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const addTopic = useSheetStore((state) => state.addTopic);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTopic(title.trim());
    setTitle("");
  };

  return (
    <div className="group relative flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-2 rounded-xl focus-within:border-orange-500/50 transition-all shadow-xl">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create a new topic (e.g. Dynamic Programming)..."
        className="flex-1 bg-transparent px-4 py-2 text-sm outline-none text-white placeholder:text-neutral-600"
      />
      <button
        onClick={handleAdd}
        className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors active:scale-95"
      >
        Add Topic
      </button>
    </div>
  );
}