export interface Post {
    id: number;
    content: string;
    username: string;
    displayName: string;
    password: string;
    createdAt: Date;
    isEditing?: boolean;
    updatedContent?:string;
  }