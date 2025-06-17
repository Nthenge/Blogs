import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

type Post = {
  id: string;
  title: string;
  body: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const firebasePosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(firebasePosts);
        setFilteredPosts(firebasePosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Mini Blog</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.6rem",
            width: "100%",
            marginBottom: "1rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-preview">
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
            <Link to={`/post/${post.id}`} className="back-link">
              Read more
            </Link>{" "}
            |{" "}
            <Link to={`/edit/${post.id}`} className="back-link">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
