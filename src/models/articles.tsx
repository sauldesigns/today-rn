export interface Article {
    status: string;
    totalResults: number;
    articles: ArticleElement[];
}

export interface ArticleElement {
    id?: string;
    source: Source;
    author: null | string;
    title: string;
    description: null | string;
    url: string;
    urlToImage: null | string;
    publishedAt: Date;
    content: null | string;
}

export interface Source {
    id: null | string;
    name: string;
}
