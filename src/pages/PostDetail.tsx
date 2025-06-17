import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "../style.css";

type Post = {
  id: string;
  title: string;
  body: string;
};

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...(docSnap.data() as { title: string; body: string }),
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed || !id) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <Link to="/" className="back-link">Go back</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
