
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Company } from '../components/Types/Company';


interface CompanyState {
    companies: Company[];
    deletedCompanyIds: number[];
    updatedCompanies: Record<number, Company>;
    addCompany: (company: Omit<Company, 'id'>) => void;
    deleteCompany: (id: number) => void;
    updateCompany: (id: number, updatedData: Omit<Company, 'id'>) => void;
  }
  
  export const useCompanyStore = create<CompanyState>()(
    persist(
      (set, get) => ({
        companies: [],
        deletedCompanyIds: [],
        updatedCompanies: {},
        addCompany: (company: Omit<Company, 'id'>) => {
       
          const newId = Date.now();
          const newCompany: Company = { id: newId, ...company };
          set((state) => ({ companies: [...state.companies, newCompany] }));
        },
        deleteCompany: (id: number) => {
          const { companies } = get();
          const existsInPersisted = companies.some(c => c.id === id);
          if (existsInPersisted) {
        
            set((state) => ({ companies: state.companies.filter(c => c.id !== id) }));
          } else {
         
            set((state) => ({
              deletedCompanyIds: [...state.deletedCompanyIds, id]
            }));
          }
        },
        updateCompany: (id: number, updatedData: Omit<Company, 'id'>) => {
          const { companies } = get();

          const index = companies.findIndex(c => c.id === id);
          if (index !== -1) {
            const updatedCompany: Company = { id, ...updatedData };
            const newCompanies = [...companies];
            newCompanies[index] = updatedCompany;
            set({ companies: newCompanies });
          } else {
  
            set((state) => ({
              updatedCompanies: {
                ...state.updatedCompanies,
                [id]: { id, ...updatedData },
              },
            }));
          }
        },
      }),
      {
        name: 'companies-storage', 
      }
    )
  );
