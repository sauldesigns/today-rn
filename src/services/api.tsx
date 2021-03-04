import axios from 'axios';
import { useQuery } from 'react-query';
import {
    searchEndpoint,
    topHeadlinesEndpoint,
    apiKey,
} from '../constants/newsAPIEndpoints';
import { Article } from '../models/articles';

export class NewsAPI {
    constructor() {}

    getTopArticles() {
        return useQuery('topHeadlines', async () => {
            const { data } = await axios.get<Article>(
                topHeadlinesEndpoint + 'country=us&apiKey=' + apiKey,
            );
            return data;
        });
    }

    searchArticles(searchValue: string) {
        if (searchValue.trim() === '') {
            return this.getTopArticles();
        }
        return useQuery('searchArticles', async () => {
            const { data } = await axios.get<Article>(
                searchEndpoint +
                    'qInTitle=' +
                    searchValue.trim() +
                    '&sortBy=popularity&apiKey=' +
                    apiKey,
            );
            return data;
        });
    }
}
