import type { Topic } from "../types/sheet";

export const sampleData: Topic[] = [
  {
    id: "t1",
    title: "Arrays",
    subTopics: [
      {
        id: "st1",
        title: "Basics",
        questions: [
          { id: "q1", title: "Find the largest element" },
          { id: "q2", title: "Second largest element" },
        ],
      },
    ],
  },
  {
    id: "t2",
    title: "Linked List",
    subTopics: [
      {
        id: "st2",
        title: "Single LL",
        questions: [
          { id: "q3", title: "Reverse a linked list" },
        ],
      },
    ],
  },
];
