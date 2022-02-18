import ApiService from './apiService';
import Post from '../models/postModel';

class PostService extends ApiService<Post, Post, any, any> {
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
    fromJsonDelete(data: any) {
        throw new Error('Method not implemented.');
    }
}

export default PostService;
