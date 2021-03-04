import { NEWS_API_KEY } from '@env';

export const apiKey = NEWS_API_KEY;
export const topHeadlinesEndpoint: string =
    'https://newsapi.org/v2/top-headlines?';

export const searchEndpoint: string =
    'https://newsapi.org/v2/everything?';
