import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

type Post={
    id: string,
    title: string,
    body: string    
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const firebasePosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(firebasePosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []);


    if(loading) return <p>Loading posts...</p>

    return(
        <>
        <Navbar />
        <div className="container">
            <h1>Mini Blog</h1>
            {posts.map((post) => (
                <div key={post.id} className="post-preview">
                    <h2>{post.title}</h2>
                    <p>{post.body.slice(0, 100)}</p>
                    <Link to={`/post/${post.id}`}><p>Read more</p></Link>
                </div>
            ))}
        </div>
        </>
    ) 
}

export default Home

