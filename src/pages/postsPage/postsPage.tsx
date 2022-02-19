import React, { FunctionComponent, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToFavoriteAction, RemoveFromFavoriteAction } from "../../actions/postFavoriteAction";
import Post from "../../models/postModel";
import PostService from '../../services/postService';
import { FavoriteReducer } from '../../reducers/favoriteReducer';
import { AppState } from "../../reducers";

interface PostsPageProps { }




const PostsPage: FunctionComponent<PostsPageProps> = () => {
    const [newPost, setNewPost] = useState(new Post({}));
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
    const postService = new PostService();
    const dispatch = useDispatch();

    async function handleDeletePost(id: number | undefined): Promise<void> {
        if (id) {
            var oldPost = posts.find(x => x.id === id) as Post;
            oldPost.deleting = true;
            setPosts([...posts]);
            var _deleted = await postService.delete(`${id}`);
            if (_deleted) {
                if (oldPost.favorite) {
                    dispatch(RemoveFromFavoriteAction());
                }
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

    async function toggleFavorite(id: number | undefined) {
        if (id) {
            var oldPost = posts.find(x => x.id === id) as Post;
            oldPost.favorite = !oldPost.favorite;
            if (oldPost.favorite) {
                dispatch(AddToFavoriteAction());
            } else {
                dispatch(RemoveFromFavoriteAction());
            }
            setPosts([...posts]);

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
                            <th>Favorite</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item) => (
                                <tr key={item.id ?? Date.now()}>
                                    <td>
                                        <Link to={"/post/" + item.id}>
                                            {item.id}
                                        </Link>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td>{item.userId}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { toggleFavorite(item.id) }}>{!item.favorite ? 'Add to favorite' : 'Remove From Favorite'}</button>
                                    </td>
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


