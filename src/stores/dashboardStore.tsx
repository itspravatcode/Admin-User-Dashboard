import { create } from "zustand";

interface DashboardState {
  roles: any[];
  companies: any[];
  posts: any[];
  users: any[];
  setRoles: (roles: any[]) => void;
  setCompanies: (companies: any[]) => void;
  setPosts: (posts: any[]) => void;
  setUsers: (users: any[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  roles: [],
  companies: [],
  posts: [],
  users: [],
  setRoles: (roles) => set((state) => ({ ...state, roles })),
  setCompanies: (companies) => set((state) => ({ ...state, companies })),
  setPosts: (posts) => set((state) => ({ ...state, posts })),
  setUsers: (users) => set((state) => ({ ...state, users })),
}));
