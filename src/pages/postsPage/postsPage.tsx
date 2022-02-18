import axios, { Axios } from "axios";
import React, { FunctionComponent, useEffect } from "react";
import Post from "../../models/postModel";
import PostService from '../../services/postService';

interface PostsPageProps { }




const PostsPage: FunctionComponent<PostsPageProps> = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const postService = new PostService();

    async function handleDeletePost(id: number | undefined): Promise<void> {
        if (id) {
            var oldPost = posts.find(x => x.id === id) as Post;
            oldPost.deleting = true;
            setPosts([...posts]);
            var _deleted = await postService.delete(`${id}`);
            if (_deleted) {
                setPosts(posts.filter(post => post.id !== id));
            } else {
                oldPost.deleting = false;
                setPosts([...posts]);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        postService.getAll().then(posts => {
            setPosts(posts);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <h1>PostsPage</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>UserId</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>{item.userId}</td>
                                <td><button className="btn btn-danger" disabled={item.deleting} onClick={() => handleDeletePost(item.id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PostsPage;


