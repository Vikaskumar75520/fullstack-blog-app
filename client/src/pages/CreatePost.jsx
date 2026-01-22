import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/posts/${id}`
          );
          setTitle(res.data.title);
          setImageURL(res.data.imageURL || "");
          setContent(res.data.content);
        } catch (error) {
          toast.error("Failed to load post");
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }

    if (content.length < 50) {
      toast.error("Content must be at least 50 characters");
      return;
    }

    try {
      setLoading(true);

      if (id) {
        await axios.put(
          `http://localhost:5000/api/posts/${id}`,
          { title, imageURL, content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Post updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/posts",
          { title, imageURL, content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Post created successfully!");
      }

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            {id ? "Edit Post" : "Create New Post"}
          </h2>
          <p className="text-gray-500 mt-1">
            Share your thoughts with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              className="mt-1 w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Cover Image URL (optional)
            </label>
            <input
              type="text"
              placeholder="Paste image URL..."
              className="mt-1 w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>

          {/* Preview */}
          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl shadow"
            />
          )}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Content
            </label>
            <textarea
              placeholder="Write your story here..."
              className="mt-1 w-full border rounded-lg px-4 py-3 h-48 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition flex justify-center items-center gap-2"
          >
            {loading
              ? id
                ? "Updating..."
                : "Publishing..."
              : id
              ? "Update Post"
              : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
