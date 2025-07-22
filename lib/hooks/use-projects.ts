"use client";

import { useEffect, useState } from "react";

export interface IProject {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
}

const SAMPLE_PROJECTS: IProject[] = [
  {
    id: "1",
    name: "Chatbot Hưng Yên",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Chatbot Thái Bình",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export function useProjects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("1");
  
  useEffect(() => {
    const storedProjectId = localStorage.getItem("selectedProjectId");
    if (storedProjectId) {
      setSelectedProjectId(storedProjectId);
    }
  }, []);

  const projects = SAMPLE_PROJECTS;
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    localStorage.setItem("selectedProjectId", projectId);
  };

  return {
    projects,
    selectedProject,
    selectedProjectId,
    selectProject,
  };
}
