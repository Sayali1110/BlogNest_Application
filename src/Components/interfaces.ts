export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  followersCount: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;      
  updatedAt: string;       
  tagList: string[];       
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}

export interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}

export interface itags{
  tags: string[];
}

export interface user{
  bio:string;
  emmail:string;
  image:string;
  token:string;
  username: string;
}



 

