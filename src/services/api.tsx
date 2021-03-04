import axios from 'axios';
import { useQuery } from 'react-query';
import { topHeadlinesEndpoint } from '../constants/newsAPIEndpoints';
import { Article } from '../models/articles';

export class NewsAPI {
    constructor() {}

    getTopArticles() {
        return useQuery('topHeadlines', async () => {
            const { data } = await axios.get<Article>(topHeadlinesEndpoint);
            return data;
        });
    }

    searchArticles(searchValue: string) {
        return useQuery('searchArticles', async () => {
            const { data } = await axios.get<Article>(
                topHeadlinesEndpoint + '&q=' + searchValue,
            );
            return data;
        });
    }
}
