import { NEWS_API_KEY } from '@env';

export const apiKey = NEWS_API_KEY;
export const topHeadlinesEndpoint: string =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

export const searchEndpoint: string =
    'https://newsapi.org/v2/everything?&sortBy=popularity&apiKey=' + apiKey;
