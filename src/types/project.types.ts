export interface IProject {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  status: TProjectStatus;
  members: string[];
}

export type TProjectStatus = "active" | "inactive" | "archived";
