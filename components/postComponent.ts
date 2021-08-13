import axios from 'axios';
import { editPostInterface } from './postComponentInterface';

const postUrl: string = 'https://jsonplaceholder.typicode.com/';

export default class PostComponent {

    public constructor() { }

    public async postListing() {
        const postListingUrl: string = `${postUrl}posts`;
        const response = await axios.get(postListingUrl);
        return response.data;
    }

    public async editPost(id: string) {
        const editPostUrl: string = `${postUrl}posts/${id}`;
        const response = await axios.get(editPostUrl);
        return response.data;
    }

    public async updatePost(id: string, body: editPostInterface) {
        const editPostUrl: string = `${postUrl}posts/${id}`;
        const response = await axios.put(editPostUrl, { body });
        return response.data.body;
    }
}