import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";


export default function Create() {
    const navigate = useNavigate();
    const { token, user } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, user_id: user.id }));
        }
    }, [user]);


    const [formData, setFormData] = useState({
        title: "",
        content: "",
        blog_category_id: "",
        user_id: ""

    });


    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('/api/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log("Full API response:", data);

            // Handle different response formats
            if (res.ok) {
                // Success case
                console.log("successfully created post");
                setErrors({});
                navigate('/');
            } else {
                setErrors(data)
                // Error case - handle different error formats
                // if (data.errors) {
                //     setErrors(data.errors);
                // } else if (data.message) {
                //     setErrors({ general: [data.message] });
                // } else if (data.error) {
                //     setErrors({ general: [data.error] });
                // } else {
                //     setErrors({ general: ["Failed to create post"] });
                // }
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrors({ general: ["Network error - please try again"] });
        }
    }
    return (
        <>
            <h1 className="title">create post</h1>

            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="name"
                        value={formData.title} onChange={(e) => setFormData({
                            ...formData, title: e.target.value
                        })}

                    />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>
                <div>
                    <input type="integer" placeholder="blog category"
                        value={formData.blog_category_id} onChange={(e) => setFormData({
                            ...formData, blog_category_id: e.target.value
                        })}

                    />
                    {errors.blog_category_id && <p className="error">{errors.blog_category_id[0]}</p>}
                </div>
                <div>
                    <textarea rows="6" placeholder="Post Content"
                        value={formData.content}
                        onChange={(e) => setFormData({
                            ...formData, content: e.target.value
                        })}> </textarea>
                    {errors.content && <p className="error">{errors.content[0]}</p>}
                </div>
                <button className="primary-btn">Create Post</button>

            </form>
        </>
    );
}