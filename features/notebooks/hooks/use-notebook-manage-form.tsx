"use client"

import { create } from "zustand"

interface NotebookManageFormStore {
  isOpen: boolean
  formType: "update" | "delete"
  setIsOpen: (isOpen: boolean) => void
  setFormType: (formType: "update" | "delete") => void
}

export const useNotebookManageForm = create<NotebookManageFormStore>((set) => ({
  isOpen: false,
  formType: "update",
  setIsOpen: (isOpen) => set({ isOpen }),
  setFormType: (formType) => set({ formType }),
}))
