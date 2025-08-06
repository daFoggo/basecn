import { type IMember, SAMPLE_MEMBERS_DATA } from "@/features/overview";

const membersData: IMember[] = [...SAMPLE_MEMBERS_DATA];

export const membersManageServices = {
  getMembers: async (): Promise<IMember[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...membersData]);
      }, 1000);
    });
  },

  createMember: async (memberData: Omit<IMember, "id">): Promise<IMember> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingMember = membersData.find(
          (m) => m.email === memberData.email
        );
        if (existingMember) {
          reject(new Error("Email already exists"));
          return;
        }

        const newId = `mb_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const newMember: IMember = {
          ...memberData,
          id: newId,
        };

        membersData.push(newMember);
        resolve(newMember);
      }, 800);
    });
  },

  updateMember: async (
    id: string,
    updateData: Partial<Omit<IMember, "id">>
  ): Promise<IMember> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const memberIndex = membersData.findIndex((m) => m.id === id);

        if (memberIndex === -1) {
          reject(new Error("Member not found"));
          return;
        }

        if (updateData.email) {
          const existingMember = membersData.find(
            (m) => m.email === updateData.email && m.id !== id
          );
          if (existingMember) {
            reject(new Error("Email already exists"));
            return;
          }
        }

        const updatedMember: IMember = {
          ...membersData[memberIndex],
          ...updateData,
        };

        membersData[memberIndex] = updatedMember;
        resolve(updatedMember);
      }, 800);
    });
  },

  deleteMember: async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const memberIndex = membersData.findIndex((m) => m.id === id);

        if (memberIndex === -1) {
          reject(new Error("Member not found"));
          return;
        }

        membersData.splice(memberIndex, 1);
        resolve(true);
      }, 600);
    });
  },

  bulkDeleteMembers: async (ids: string[]): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let deletedCount = 0;

        ids.forEach((id) => {
          const memberIndex = membersData.findIndex((m) => m.id === id);
          if (memberIndex !== -1) {
            membersData.splice(memberIndex, 1);
            deletedCount++;
          }
        });

        resolve(deletedCount);
      }, 1000);
    });
  },
};
