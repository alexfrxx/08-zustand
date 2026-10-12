export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: TagProps;
}

export type TagProps = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
export interface PostNote {
  title: string;
  content: string;
  tag: TagProps;
}
