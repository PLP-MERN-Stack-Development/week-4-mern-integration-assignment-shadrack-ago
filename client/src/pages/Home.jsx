import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsAPI.getAll();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Welcome to MERN Blog</h1>
      <div className="posts-grid">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <p className="post-meta">
                By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="post-category">{post.category}</p>
              <p className="post-excerpt">
                {post.content.substring(0, 150)}...
              </p>
              <Link to={`/post/${post._id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 