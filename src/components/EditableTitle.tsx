import { useState } from "react";

export default function EditableTitle({ 
  initialTitle, 
  onSave, 
  onDelete, 
  className = "" 
}: { 
  initialTitle: string; 
  onSave: (val: string) => void; 
  onDelete: () => void; 
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(initialTitle);

  const handleSave = () => {
    if (val.trim() && val !== initialTitle) onSave(val.trim());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input 
        autoFocus 
        className="bg-neutral-800 border border-orange-500 rounded px-2 py-1 text-sm w-full outline-none text-white"
        value={val} 
        onChange={(e) => setVal(e.target.value)} 
        onBlur={handleSave}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
      />
    );
  }

  return (
    // Use 'justify-between' and 'w-full' to push the delete button to the far right
    <div className={`flex items-center justify-between w-full group ${className}`}>
      <span 
        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} 
        className="cursor-pointer hover:text-white transition truncate pr-4"
      >
        {initialTitle}
      </span>
      <button 
        onClick={(e) => { 
          e.stopPropagation(); // Prevents accordion from toggling when deleting
          onDelete(); 
        }}
        className="opacity-0 group-hover:opacity-100 text-[10px] bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1 rounded transition-all font-bold uppercase tracking-tighter"
      >
        Delete
      </button>
    </div>
  );
}