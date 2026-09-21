export interface ArticleManage {
  id: number;
  title: string;
  content: string;
  image: string | null;
  category: string;
  archived: boolean;   // ⚡ corriger ici
  created_at: string;
  updated_at: string;
}
