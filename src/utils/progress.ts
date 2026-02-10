import type { Topic, SubTopic } from "../types/sheet";

export function getSubTopicProgress(sub: SubTopic) {
  const total = sub.questions.length;
  const done = sub.questions.filter(q => q.done).length;
  return { done, total };
}

export function getTopicProgress(topic: Topic) {
  const questions = topic.subTopics.flatMap(s => s.questions);
  const total = questions.length;
  const done = questions.filter(q => q.done).length;
  return { done, total };
}
