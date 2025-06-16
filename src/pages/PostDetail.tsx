import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


type Post = {
  id: string;
  title: string;
  body: string;
};


const PostDetail: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);

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
        setPost(null); // Not found
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [id]);


    if(loading) return <p>Loading post...</p>
    if(!post) return <p>Post not found</p>
    return(
        <>
        <Navbar />
        <div className="container">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link to="/" className="back-link">Go back</Link>
        </div>
        </>
    )
}

export default PostDetail;