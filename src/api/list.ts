import axios from "axios";

export const getList = async (page: number) => await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);

export type ListType = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}