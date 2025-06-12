/**
 * UTIL FUNCTIONS FOR TAILWIND CSS CLASS MANAGEMENT
 * DONT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
