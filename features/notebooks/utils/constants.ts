import { INoteBook } from "./types";

export const SAMPLE_NOTEBOOKS: INoteBook[] = [
  {
    id: "1",
    title: "Sample Notebook 1",
    description: "This is a sample notebook for demonstration purposes.",
    sources: [
      { id: "1", title: "Source 1" },
      { id: "2", title: "Source 2" },
      { id: "3", title: "Source 3" },
      { id: "4", title: "Source 4" },
      { id: "5", title: "Source 5" },
    ],
    updatedAt: "2023-10-01T12:00:00Z",
  },
  {
    id: "2",
    title: "",
    description: "",
    sources: [
      { id: "3", title: "Source 3" },
      { id: "4", title: "Source 4" },
    ],
    updatedAt: "2023-10-02T12:00:00Z",
  },
];
