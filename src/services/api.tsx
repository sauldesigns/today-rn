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
        return useQuery('searchArticles', async () => {
            const { data } = await axios.get<Article>(
                searchEndpoint +
                    '&q=' +
                    searchValue +
                    '&sortBy=popularity&apiKey=' +
                    apiKey,
            );
            return data;
        });
    }
}
