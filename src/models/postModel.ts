import MasterModel from './masterModel';

class Post implements MasterModel<Post> {
    title: string;
    body: string;
    id?: number;
    userId?: number;

    constructor({ title, body, id, userId }: { title: string; body: string; id?: number; userId?: number }) {
        this.title = title;
        this.body = body;
        this.id = id;
        this.userId = userId;
    }

    static fromJson(data: any): Post {
        return new Post({
            title: data.title,
            body: data.body,
            id: data.id,
            userId: data.userId,
        });
    }
    static fromJsonArray(data: any): Post[] {
        return data.map((item: any) => Post.fromJson(item));
    }

    toJson(): Map<String, any> {
        throw new Error('Method not implemented.');
    }
}
export default Post;
