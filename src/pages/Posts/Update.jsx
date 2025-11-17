import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const navigate = useNavigate();
    const { token, user } = useContext(AppContext);
    const { id } = useParams();

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({ ...prev, user_id: user.id }));
        }
    }, [user]);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        blog_category_id: "",
        user_id: "",
        excerpt: "",
        status: "",
    });
    const [errors, setErrors] = useState({});

    async function getPosts() {
        const res = await fetch(`/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await res.json();
        // console.log(result.data.user_id);
        // console.log(user.id);
       if(res.ok){

          if(result.data.user_id !== user.id){
            navigate("/");
          }
             setFormData({
            title: result.data.title,
            content: result.data.content, // Handle both 'body' and 'content'
            blog_category_id: result.data.blog_category_id,
            excerpt: result.data.excerpt, // Fixed typo: 'except' to 'excerpt'
            status: result.data.status,
        });
       }
     
    }

    async function handleUpdates(e) {
        e.preventDefault();

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Full API response:", data);

            // Handle different response formats
            if (res.ok) {
                // Success case

                console.log("successfully post updates");
                navigate("/");
            } else {
                setErrors(data);
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrors({ general: ["Network error - please try again"] });
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            <h1 className="title">Update post</h1>

            <form onSubmit={handleUpdates} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="name"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                    />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>
                <div>
                    <input
                        type="integer"
                        placeholder="blog category"
                        value={formData.blog_category_id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                blog_category_id: e.target.value,
                            })
                        }
                    />
                    {errors.blog_category_id && (
                        <p className="error">{errors.blog_category_id[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Post Status"
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: e.target.value,
                            })
                        }
                    />
                    {errors.status && <p className="error">{errors.status[0]}</p>}
                </div>
                {/* excerpt of the post */}
                <div>
                    <input
                        type="text"
                        placeholder=" excerpt of the post"
                        value={formData.excerpt}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                excerpt: e.target.value,
                            })
                        }
                    />
                    {errors.excerpt && <p className="error">{errors.excerpt[0]}</p>}
                </div>
                <div>
                    <textarea
                        rows="6"
                        placeholder="Post Content"
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                content: e.target.value,
                            })
                        }
                    >
                        {" "}
                    </textarea>
                    {errors.content && <p className="error">{errors.content[0]}</p>}
                </div>
                <button className="primary-btn">Update Post</button>
            </form>
        </>
    );
}
