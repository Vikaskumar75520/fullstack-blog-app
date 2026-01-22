import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MyPosts() {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        const allPosts = res.data.posts || res.data;

        const myPosts = allPosts.filter(
          (post) => post.user === user.id || post.user === user._id
        );

        setPosts(myPosts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">My Posts</h2>
            <p className="text-gray-500">
              Manage your published content
            </p>
          </div>

          <Link
            to="/create"
            className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + New Post
          </Link>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm">
              Start by creating your first blog post
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              {post.imageURL ? (
                <img
                  src={post.imageURL}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-semibold">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/post/${post._id}`}
                    className="flex-1 text-center border py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/create/${post._id}`}
                    className="flex-1 text-center border py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
