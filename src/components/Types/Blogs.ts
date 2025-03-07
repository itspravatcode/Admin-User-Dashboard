export type Blog = {
    userId: number,
    id: number,
    title: string,
    body:string,
    link: string,
    comment_count: number
  };

  export type Comment={
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
  }

  export interface BlogContextType{
    blogs?: Blog[];
    error: unknown;
    isLoading: boolean;
  }

  export interface CommentContextType{
    comments?: Comment[];
    error: unknown;
    isLoading: boolean;
  }