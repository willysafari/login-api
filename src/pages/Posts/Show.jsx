import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";


export default function Show() {
     const navigate = useNavigate();
    const { id } = useParams();
    const { user, token } = useContext(AppContext);

    // console.log(id);
    // const { token} = useContext(AppContext);
    const [post, setPost] = useState(null);

    async function getPost() {

        const res = await fetch(`/api/blog/${id}`);

        const text = await res.json();


        console.log(text.data);

        // let data = null;
        // setPost(data);

        if (res.ok) {
            setPost(text.data)
        }
    }
    async function handleDelete(e) {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`,

                {
                    method: "delete",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json;

            if(res.ok){
             navigate("/");
            }

            console.log(data);


        }




    }
    useEffect(() => {
        getPost();
    }, [])
    // function for time management 
    function getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else if (diffInDays < 7) {
            return `${Math.floor(diffInDays)} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
    return (
        <>
            {post ? (
                <article>
                    <div key={post.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                        <div className="mb-2 flex items-start justify-between">
                            <div><h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-xs text-slate-600">Created by {post.user.name}
                                    {' '}
                                    {getRelativeTime(post.created_at)}
                                </small>
                            </div>
                        </div>
                        <p className="max-h-24 overflow-hidden">
                            {post.content}
                        </p>
                        {user && (Number(user.id) === Number(post.user_id)) && <div className="flex items-center justify-end  gap-4">
                            <Link to={`/posts/update/${id}`} className=" bg-green-400
                                      text-white text-sm rounded-lg px-3 py-1">
                                Update </Link>
                            <form action="delete" onSubmit={handleDelete}>
                                <button className="bg-red-600 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                            </form>
                        </div>
                        }
                    </div>
                </article>
            ) : (
                <p>Loading or no data available.</p>
            )}
        </>
    );
}