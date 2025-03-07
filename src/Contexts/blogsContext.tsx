import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { fetchBlogs, fetchComments } from "../ApiCalls/fetchBlogs";
import { Blog, Comment, BlogContextType, CommentContextType } from "../components/Types/Blogs";


const BlogsContext = createContext<BlogContextType | null>(null);

export const BlogsProvider = ({ children }: { children: ReactNode }) => {
  const { data: blogs, error, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const value = useMemo(
    () => ({
      blogs,
      error,
      isLoading,
    }),
    [blogs, error, isLoading]
  );

  return <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>;
};

export const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogsProvider");
  }
  return context;
};


const CommentsContext = createContext<CommentContextType | null>(null);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const { data: comments, error, isLoading } = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  const value = useMemo(
    () => ({
      comments,
      error,
      isLoading,
    }),
    [comments, error, isLoading]
  );

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};
