import axios from "axios";
import { useQuery } from "react-query";
import { Article } from "../models/articles";


export class NewsAPI {
    constructor() {}

    useTopArticles() {
        return useQuery('topHeadlines', async () => {
            const {data} = await axios.get<Article>(
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=7b9fb000e2244968b0f05ce6dd04c9d2',
            );
            return data;
        });
    }
}
