import React, { FunctionComponent, useEffect, useReducer, useState } from "react";
import Post from "../../models/postModel";
import PostService from '../../services/postService';

interface PostsPageProps { }




const PostsPage: FunctionComponent<PostsPageProps> = () => {
    const [newPost, setNewPost] = useState(new Post({}));

    const [posts, setPosts] = React.useState<Post[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
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

    function handleChange(event: React.ChangeEvent<any>) {
        var post = newPost.clone();
        var fieldName = event.currentTarget.name;
        if (fieldName === "title") {
            post.title = event.currentTarget.value;
        }
        if (fieldName === "body") {
            post.body = event.currentTarget.value;
        }
        if (fieldName === "userId") {
            post.userId = parseInt(event.currentTarget.value);
        }
        setNewPost(post);
    }

    async function handleCreatePost(): Promise<void> {
        if (newPost.title && newPost.body) {
            setIsAdding(true);
            var _createdPost = await postService.create(newPost);
            if (_createdPost != null) {
                _createdPost.id = posts.length + 1;
                console.log(_createdPost)
                setPosts([_createdPost, ...posts]);
                setNewPost(new Post({}))
            }
            setIsAdding(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        postService.getAll().then(posts => {
            setPosts(posts);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <h1>PostsPage</h1>
            <div className="container" >
                <div className="row">
                    <div className="col" >
                        <input type="text" placeholder="Title" name="title" value={newPost.title ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col" >
                        <textarea placeholder="Body" name="body" value={newPost.body ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        UserId :
                        <select name="userId" id="userId" onChange={handleChange} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col" >
                        <button className="btn btn-primary" disabled={isAdding} onClick={handleCreatePost} >Create</button>
                    </div>
                </div>
                {isLoading && <h1>Loading...</h1>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>UserId</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item) => (
                                <tr key={item.id ?? Date.now()}>
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
        </div>
    );
}

export default PostsPage;


