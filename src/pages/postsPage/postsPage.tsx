import React, { FunctionComponent, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToFavoriteAction, RemoveFromFavoriteAction } from "../../actions/postFavoriteAction";
import GenericForm, { InputType } from "../../components/genericFormComponent";
import Input from "../../components/inputComponent";
import Post from "../../models/postModel";
import PostService from '../../services/postService';
import Validators from "../../validators/validators";

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

    async function handleSubmit(post: any): Promise<void> {
        console.log(post)
        if (post.title && post.body) {
            setIsAdding(true);
            var _createdPost = await postService.create(post);
            if (_createdPost != null) {
                _createdPost.id = posts.length + 1;
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
                <GenericForm
                    onSubmit={handleSubmit}
                    model={newPost}
                    inputs={
                        [
                            {
                                propName: "title",
                                inputType: InputType.textField,
                                label: "Title",
                                id: "aa",
                                type: "email",
                                validations: [Validators.emailValidator],
                                placeholder: "Title",
                            },
                            {
                                propName: "body",
                                inputType: InputType.textField,
                                label: "Body",
                                id: "bb",
                                placeholder: "Body",
                            },
                            {
                                propName: "userId",
                                inputType: InputType.textField,
                                label: "UserID",
                                id: "UserID",
                                type: "number",
                                numberOptions: {
                                    min: 1,
                                    max: 10,
                                },
                                placeholder: "UserID",
                            },
                            {
                                id: "ww",
                                propName: "gender",
                                inputType: InputType.dropdown,
                                values: [
                                    {
                                        displayText: "Male",
                                        value: "male"
                                    },
                                    {
                                        displayText: "Female",
                                        value: "female"
                                    },
                                ],
                            },
                            {
                                id: "rr",
                                propName: "userType",
                                inputType: InputType.radioButton,
                                values: [
                                    {
                                        displayText: "Admin",
                                        value: "admin"
                                    },
                                    {
                                        displayText: "User",
                                        value: "user"

                                    }
                                ],
                            },
                            {
                                id: "qa",
                                propName: "hobbies",
                                inputType: InputType.checkbox,
                                values: [
                                    {
                                        displayText: "Football",
                                        value: "football"
                                    },
                                    {
                                        displayText: "Drawing",
                                        value: "draw"
                                    },
                                    {
                                        displayText: "Running",
                                        value: "run"
                                    }
                                ],
                            }

                        ]
                    }
                />
                <br />
                <div className="row">
                    <div className="col" >
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


