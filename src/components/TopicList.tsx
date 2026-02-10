import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSheetStore } from "../store/useSheetStore";
import Accordion from "./Accordion";
import SortableQuestion from "./SortableQuestion";
import AddSubTopic from "./AddSubTopic";
import AddQuestion from "./AddQuestion";
import EditableTitle from "./EditableTitle";

function SortableTopicItem({ topic, idx }: { topic: any; idx: number }) {
  const {
    updateTopic,
    deleteTopic,
    updateSubTopic,
    deleteSubTopic,
    setActiveQuestion,
    reorderQuestions
  } = useSheetStore() as any;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Accordion
        title={
          <div className="flex items-center gap-3 w-full">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-neutral-600 p-1 hover:text-neutral-400"
            >
              ⠿
            </div>
            <EditableTitle
              initialTitle={topic.title}
              onSave={(val) => updateTopic(topic.id, val)}
              onDelete={() => deleteTopic(topic.id)}
              className="text-sm font-bold"
            />
          </div>
        }
        right={
          <span className="text-xs text-neutral-500 font-mono">
            STEP {idx + 1}
          </span>
        }
      >
        <div className="space-y-4 pl-4 border-l border-neutral-800 ml-2">
          {topic.subTopics.map((sub: any) => (
            <div
              key={sub.id}
              className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-800"
            >
              <EditableTitle
                initialTitle={sub.title}
                onSave={(val) => updateSubTopic(topic.id, sub.id, val)}
                onDelete={() => deleteSubTopic(topic.id, sub.id)}
                className="text-xs font-semibold mb-2 text-neutral-400"
              />

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={(e: DragEndEvent) => {
                  const { active, over } = e;
                  if (over && active.id !== over.id) {
                    reorderQuestions(
                      topic.id,
                      sub.id,
                      active.id as string,
                      over.id as string
                    );
                  }
                }}
              >
                <SortableContext
                  items={sub.questions.map((q: any) => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-1">
                    {sub.questions.map((q: any) => (
                      <SortableQuestion
                        key={q.id}
                        id={q.id}
                        topicId={topic.id}
                        subId={sub.id}
                        title={q.title}
                        done={q.done}
                        onClick={() =>
                          setActiveQuestion({
                            topicId: topic.id,
                            subTopicId: sub.id,
                            questionId: q.id
                          })
                        }
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <AddQuestion subTopicId={sub.id} />
            </div>
          ))}
          <AddSubTopic topicId={topic.id} />
        </div>
      </Accordion>
    </div>
  );
}

export default function TopicList({ topics }: { topics: any[] }) {
  const reorderTopics = useSheetStore((s: any) => s.reorderTopics);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
          reorderTopics(active.id as string, over.id as string);
        }
      }}
    >
      <SortableContext
        items={topics.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col">
          {topics.map((topic, idx) => (
            <SortableTopicItem
              key={topic.id}
              topic={topic}
              idx={idx}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
