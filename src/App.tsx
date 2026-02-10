import { useEffect } from "react";
import TopicList from "./components/TopicList";
import AddTopic from "./components/AddTopic";
import QuestionDrawer from "./components/QuestionDrawer";
import { useSheetStore } from "./store/useSheetStore";

export default function App() {
  const { topics, fetchData, loading } = useSheetStore() as any;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Bonus: Calculate progress across all questions
  const allQuestions = topics.flatMap((t: any) => t.subTopics.flatMap((st: any) => st.questions));
  const completed = allQuestions.filter((q: any) => q.done).length;
  const progress = allQuestions.length > 0 ? Math.round((completed / allQuestions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Question Management Sheet</h1>
          <p className="text-neutral-400 text-sm">Organize and track your Strivers A2Z DSA progress.</p>
        </header>

        {/* Progress Bar Bonus Feature */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-neutral-500 font-medium">
            <span>Overall Progress</span>
            <span>{progress}% Completed</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
            <div 
              className="h-full bg-orange-500 transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        <AddTopic />

        {loading && topics.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 animate-pulse">Loading Striver Sheet...</div>
        ) : (
          <div className="bg-neutral-900/30 rounded-2xl border border-neutral-800 p-1">
            <TopicList topics={topics} />
          </div>
        )}
      </div>
      <QuestionDrawer />
    </div>
  );
}