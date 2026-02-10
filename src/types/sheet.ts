export type Question = {
  id: string;
  title: string;
  done?: boolean;
  difficulty?: "Easy" | "Medium" | "Hard";
  notes?: string;
};


export type SubTopic = {
  id: string;
  title: string;
  questions: Question[];
};

export type Topic = {
  id: string;
  title: string;
  subTopics: SubTopic[];
};
