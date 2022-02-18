import ApiService from './apiService';
import Post from '../models/postModel';

class PostService extends ApiService<Post, Post, any, boolean> {
    endpoint = 'posts';

    fromJson(data: any): Post {
        return Post.fromJson(data);
    }
    fromJsonArray(data: any): Post[] {
        return Post.fromJsonArray(data);
    }
    fromJsonCreate(data: any): Post {
        throw new Error('Method not implemented.');
    }
    fromJsonUpdate(data: any) {
        throw new Error('Method not implemented.');
    }
    fromJsonDelete(status: number, data?: any): boolean {
        return status === 204 || status === 200;
    }
}

export default PostService;
