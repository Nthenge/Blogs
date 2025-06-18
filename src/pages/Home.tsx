import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

type Post = {
  id: string;
  title: string;
  body: string;
};

const POSTS_PER_PAGE = 3;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const fetchPosts = async (loadMore = false) => {
    setLoading(true);
    try {
      const baseQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        ...(loadMore && lastDoc ? [startAfter(lastDoc)] : []),
        limit(POSTS_PER_PAGE)
      );

      const querySnapshot = await getDocs(baseQuery);

      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { title: string; body: string }),
      }));

      setPosts((prev) => (loadMore ? [...prev, ...newPosts] : newPosts));

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      if (querySnapshot.docs.length < POSTS_PER_PAGE) {
        setNoMorePosts(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Blogs</h1>
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}</p>
            <Link to={`/post/${post.id}`} className="back-link">
              Read more |
            </Link>
            <Link to={`/edit/${post.id}`} className="back-link">
             | Edit
            </Link>
          </div>
        ))}

        {!loading && !noMorePosts && (
          <button className="load-more" onClick={() => fetchPosts(true)}>
            Load More
          </button>
        )}

        {loading && <p>Loading posts...</p>}
        {noMorePosts && <p>No more posts to show.</p>}
      </div>
    </>
  );
};

export default Home;
