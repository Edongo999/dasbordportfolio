import { ArticleManage } from "@/components/types/ArticleManage";

export interface PaginatedArticles {
  data: ArticleManage[];
  current_page: number;
  last_page: number;
  per_page: number;   // garde obligatoire
  total: number;
}
