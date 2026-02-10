import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import sheetData from "../data/sheet.json"; 

export interface Question { id: string; title: string; difficulty: string; done?: boolean; }
export interface SubTopic { id: string; title: string; questions: Question[]; }
export interface Topic { id: string; title: string; subTopics: SubTopic[]; }

type ActiveQuestion = { topicId: string; subTopicId: string; questionId: string; } | null;

type SheetStore = {
  topics: Topic[];
  activeQuestion: ActiveQuestion;
  loading: boolean;
  fetchData: (forceReset?: boolean) => Promise<void>;
  addTopic: (title: string) => void;
  updateTopic: (id: string, title: string) => void;
  deleteTopic: (id: string) => void;
  reorderTopics: (fromId: string, toId: string) => void;
  addSubTopic: (topicId: string, title: string) => void;
  updateSubTopic: (topicId: string, subId: string, title: string) => void;
  deleteSubTopic: (topicId: string, subId: string) => void;
  addQuestion: (subTopicId: string, title: string) => void;
  updateQuestion: (topicId: string, subId: string, qId: string, title: string) => void;
  deleteQuestion: (topicId: string, subId: string, qId: string) => void;
  toggleQuestionDone: (topicId: string, subId: string, qId: string) => void;
  reorderQuestions: (topicId: string, subId: string, fromId: string, toId: string) => void;
  setActiveQuestion: (payload: ActiveQuestion) => void;
};

export const useSheetStore = create<SheetStore>()(
  persist(
    (set, get) => ({
      topics: [],
      activeQuestion: null,
      loading: false,

      fetchData: async (forceReset = false) => {
        if (get().topics.length > 0 && !forceReset) return;
        set({ loading: true });

        try {
          const questions = sheetData?.data?.questions || [];
          const topicMap: Record<string, Topic> = {};

          questions.forEach((q: any) => {
            const topicName = q.topic || "Uncategorized";
            const subTopicName = q.subTopic || "General";

            if (!topicMap[topicName]) {
              topicMap[topicName] = { id: crypto.randomUUID(), title: topicName, subTopics: [] };
            }

            let subTopic = topicMap[topicName].subTopics.find(st => st.title === subTopicName);
            if (!subTopic) {
              subTopic = { id: crypto.randomUUID(), title: subTopicName, questions: [] };
              topicMap[topicName].subTopics.push(subTopic);
            }

            subTopic.questions.push({
              id: q._id || crypto.randomUUID(),
              title: q.title || q.questionId?.name || "Untitled",
              difficulty: q.questionId?.difficulty || "Medium",
              done: q.isSolved || false
            });
          });

          set({ topics: Object.values(topicMap), loading: false });
        } catch (error) {
          console.error("Data processing error:", error);
          set({ loading: false });
        }
      },

      addTopic: (title) => set((s) => ({
        topics: [...s.topics, { id: crypto.randomUUID(), title, subTopics: [] }]
      })),
      updateTopic: (id, title) => set((s) => ({
        topics: s.topics.map((t) => (t.id === id ? { ...t, title } : t))
      })),
      deleteTopic: (id) => set((s) => ({
        topics: s.topics.filter((t) => t.id !== id)
      })),
      reorderTopics: (fromId, toId) => set((s) => {
        const oldIdx = s.topics.findIndex((t) => t.id === fromId);
        const newIdx = s.topics.findIndex((t) => t.id === toId);
        return { topics: arrayMove(s.topics, oldIdx, newIdx) };
      }),
      addSubTopic: (topicId, title) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: [...t.subTopics, { id: crypto.randomUUID(), title, questions: [] }]
        } : t)
      })),
      updateSubTopic: (topicId, subId, title) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? { ...st, title } : st)
        } : t)
      })),
      deleteSubTopic: (topicId, subId) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.filter((st) => st.id !== subId)
        } : t)
      })),
      addQuestion: (subId, title) => set((s) => ({
        topics: s.topics.map((t) => ({
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? {
            ...st, questions: [...st.questions, { id: crypto.randomUUID(), title, difficulty: "Medium", done: false }]
          } : st)
        }))
      })),
      updateQuestion: (topicId, subId, qId, title) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? {
            ...st, questions: st.questions.map((q) => q.id === qId ? { ...q, title } : q)
          } : st)
        } : t)
      })),
      deleteQuestion: (topicId, subId, qId) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? {
            ...st, questions: st.questions.filter((q) => q.id !== qId)
          } : st)
        } : t)
      })),
      toggleQuestionDone: (topicId, subId, qId) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? {
            ...st, questions: st.questions.map((q) => q.id === qId ? { ...q, done: !q.done } : q)
          } : st)
        } : t)
      })),
      reorderQuestions: (topicId, subId, fromId, toId) => set((s) => ({
        topics: s.topics.map((t) => t.id === topicId ? {
          ...t, subTopics: t.subTopics.map((st) => st.id === subId ? {
            ...st, questions: arrayMove(st.questions, 
              st.questions.findIndex((q) => q.id === fromId),
              st.questions.findIndex((q) => q.id === toId))
          } : st)
        } : t)
      })),
      setActiveQuestion: (payload) => set({ activeQuestion: payload }),
    }),
    { name: "question-sheet-storage" }
  )
);