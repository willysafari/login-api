import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const res = await fetch("api/posts");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.status === "success") {
        setPosts(result.data);
      } else {
        console.error("API returned error status:", result.status);
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    }
  }

  useEffect(() => { getPosts(); }, []);

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
      <h2 className="title">Latest post</h2>


      {posts.length > 0 ? (posts.map(
        (post) => (
          <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
            <div className="mb-2 flex items-start justify-between">
              <div><h2 className="font-bold text-2xl">{post.title}</h2>
                <small className="text-xs text-slate-600">Created by {post.user.name}
                  {' '}
                  {getRelativeTime(post.created_at)}
                </small>
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="bg-blue-500 text-white text-sm rounded-xl px-3 py-1"
              >
                Read more
              </Link>
            </div>
            <p  className="max-h-24 overflow-hidden">{post.content}</p>
          </div>
        )

      )) : (<p> No post available</p>)}
    </>

  );
}   