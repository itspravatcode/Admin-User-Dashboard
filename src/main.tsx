import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersProvider } from "./Contexts/userContext.tsx";
import { CompaniesProvider } from "./Contexts/companyContext.tsx";
import { BlogsProvider, CommentsProvider } from "./Contexts/blogsContext.tsx";
import AuthProvider from "./Contexts/AuthContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>     
  <BrowserRouter>
    <AuthProvider>
      <CompaniesProvider>
        <UsersProvider>
          <BlogsProvider>
            <CommentsProvider>
         
                <App />
    
            </CommentsProvider>
          </BlogsProvider>
        </UsersProvider>
      </CompaniesProvider>
    </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
