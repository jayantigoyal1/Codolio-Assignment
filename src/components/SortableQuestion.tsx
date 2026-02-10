import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSheetStore } from "../store/useSheetStore";

export default function SortableQuestion({ id, title, topicId, subId, done, onClick }: any) {
  const toggleQuestionDone = (useSheetStore() as any).toggleQuestionDone;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-800/50 group transition-all">
      {/* 1. Styled Checkbox - Ensure this exists! */}
      <input 
        type="checkbox" 
        checked={done || false}
        onChange={() => toggleQuestionDone(topicId, subId, id)}
        className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-orange-500 focus:ring-orange-500/20 cursor-pointer"
      />

      {/* 2. Drag Handle */}
      <div {...attributes} {...listeners} className="cursor-grab text-neutral-700 hover:text-neutral-400 px-1 select-none">
        ⠿
      </div>

      {/* 3. Title with progress styling */}
      <div 
        onClick={onClick} 
        className={`flex-1 text-sm transition-all cursor-pointer ${done ? "text-neutral-600 line-through" : "text-neutral-300 group-hover:text-white"}`}
      >
        {title}
      </div>

      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${done ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}>
        {done ? "DONE" : "MEDIUM"}
      </span>
    </div>
  );
}