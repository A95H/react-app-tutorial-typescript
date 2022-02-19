import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import Post from "../../models/postModel";
import PostService from '../../services/postService';

interface PostDetailsPageProps {

}

const PostDetailsPage: FunctionComponent<PostDetailsPageProps> = () => {
    const postService = new PostService();
    const [post, setPost] = React.useState<Post | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);
    let { postId } = useParams();
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        var res = await postService.getOne(`${postId}`);
        setLoading(false);
        if (res) {
            setPost(res);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (post == undefined) {
        return <div>Post not found</div>
    }
    return (
        <div className="container">
            <h1>Post Details</h1>
            <hr />
            <h5>ID : </h5>
            <p>{post.id}</p>
            <h4>Title : </h4>
            <p>{post.title}</p>
            <br />
            <h3>Body : </h3>
            <p>{post.body}</p>
        </div>
    );
}

export default PostDetailsPage;