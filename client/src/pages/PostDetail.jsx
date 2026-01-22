import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!post) {
    return <p className="text-center mt-20">Post not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 sm:p-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold uppercase">
            {post.username?.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium">{post.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Image */}
        {post.imageURL && (
          <img
            src={post.imageURL}
            alt={post.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {post.content.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        {/* Back */}
        <div className="mt-12">
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
