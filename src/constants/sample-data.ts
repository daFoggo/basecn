import type { IOrganization } from "@/types/organization";
import type { IProject } from "@/types/project";
import type { IUser } from "@/types/user";

export const SAMPLE_ORGANIZATIONS: IOrganization[] = [
  {
    id: "org-1",
    name: "Acme Inc",
    slug: "acme-inc",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Acme",
    members: ["user-1", "user-2"],
  },
  {
    id: "org-2",
    name: "Stark Ind",
    slug: "stark-industries",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Stark",
    members: ["user-3", "user-4", "user-5"],
  },
  {
    id: "org-3",
    name: "Wayne Ent",
    slug: "wayne-enterprises",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Wayne",
    members: ["user-6"],
  },
  {
    id: "org-4",
    name: "Acme Inc",
    slug: "acme-inc",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Acme",
    members: ["user-1", "user-2"],
  },
  {
    id: "org-5",
    name: "Stark Ind",
    slug: "stark-industries",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Stark",
    members: ["user-3", "user-4", "user-5"],
  },
  {
    id: "org-6",
    name: "Wayne Ent",
    slug: "wayne-enterprises",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Wayne",
    members: ["user-6"],
  },
  {
    id: "org-7",
    name: "Acme Inc",
    slug: "acme-inc",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Acme",
    members: ["user-1", "user-2"],
  },
  {
    id: "org-8",
    name: "Stark Ind",
    slug: "stark-industries",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Stark",
    members: ["user-3", "user-4", "user-5"],
  },
  {
    id: "org-9",
    name: "Wayne Ent",
    slug: "wayne-enterprises",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=Wayne",
    members: ["user-6"],
  },
];

export const SAMPLE_PROJECTS: IProject[] = [
  {
    id: "proj-1",
    name: "Marketing Campaign",
    slug: "MKT",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Marketing",
    status: "active",
    members: ["user-1", "user-2", "user-3", "user-4"],
    timezone: "Asia/Ho_Chi_Minh",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    slug: "MOB",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Mobile",
    status: "active",
    members: ["user-2", "user-5", "user-6"],
    timezone: "Asia/Ho_Chi_Minh",
  },
  {
    id: "proj-3",
    name: "Website Redesign",
    slug: "WEB",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Website",
    status: "active",
    members: ["user-1", "user-3"],
    timezone: "Asia/Ho_Chi_Minh",
  },
  {
    id: "proj-4",
    name: "Customer Support",
    slug: "SUP",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Support",
    status: "inactive",
    members: ["user-4", "user-6", "user-7", "user-8", "user-9"],
    timezone: "Asia/Ho_Chi_Minh",
  },
  {
    id: "proj-5",
    name: "Data Migration",
    slug: "DAT",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Data",
    status: "archived",
    members: ["user-2", "user-5"],
    timezone: "Asia/Ho_Chi_Minh",
  },
  {
    id: "proj-6",
    name: "Brand Identity",
    slug: "BRD",
    logo: "https://api.dicebear.com/9.x/icons/svg?seed=Brand",
    status: "active",
    members: ["user-1", "user-3", "user-7"],
    timezone: "Asia/Ho_Chi_Minh",
  },
];

export const SAMPLE_USER: IUser = {
  name: "Felix",
  email: "felix@example.com",
  avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Felix",
  timezone: "Asia/Ho_Chi_Minh",
};
