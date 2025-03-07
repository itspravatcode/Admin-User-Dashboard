
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../components/Types/User";

interface UserState {
  users: User[];
  deletedUserIds: number[];
  updatedUsers: Record<number, User>;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: number, updatedData: Omit<User, "id">) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      deletedUserIds: [],
      updatedUsers: {},
      addUser: (user: Omit<User, "id">) => {
        const newId = Date.now();
        const newUser: User = { id: newId, ...user };
        set((state) => ({ users: [...state.users, newUser] }));
      },
      updateUser: (id: number, updatedData: Omit<User, "id">) => {
        const { users } = get();
        const index = users.findIndex((u) => u.id === id);
        if (index !== -1) {
          const updatedUser: User = { id, ...updatedData };
          const newUsers = [...users];
          newUsers[index] = updatedUser;
          set({ users: newUsers });
        } else {
          set((state) => ({
            updatedUsers: {
              ...state.updatedUsers,
              [id]: { id, ...updatedData },
            },
          }));
        }
      },
      deleteUser: (id: number) => {
        const { users } = get();
        const existsInPersisted = users.some((u) => u.id === id);
        if (existsInPersisted) {
          set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
        } else {
          set((state) => ({
            deletedUserIds: [...state.deletedUserIds, id],
          }));
        }
      },
    }),
    {
      name: "users-storage",
    }
  )
);
