import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import './PostDetail.css';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getById(id);
        setPost(response.data);
      } catch (err) {
        setError('Post not found');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span className="category">{post.category}</span>
        </div>
      </div>
      
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="post-actions">
        <button onClick={() => navigate('/')} className="back-button">
          Back to Posts
        </button>
      </div>
    </div>
  );
};

export default PostDetail; 