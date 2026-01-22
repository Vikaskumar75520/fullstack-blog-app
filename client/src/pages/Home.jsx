import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts?search=${search}&page=${page}&limit=6`
        );
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* HERO */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Discover Inspiring Stories
          </h1>
          <p className="text-gray-300 mt-3">
            Read insights, tutorials and experiences shared by our community.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search by title or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-95">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* POSTS */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            >
              {post.imageURL ? (
                <img
                  src={post.imageURL}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="h-44 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-semibold">
                  No Image
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold uppercase">
                    {post.username?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/post/${post._id}`}
                  className="inline-block mt-5 text-blue-600 font-medium hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 border rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 border rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
