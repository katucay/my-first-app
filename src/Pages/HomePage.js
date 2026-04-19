import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import '../App.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/posts')
      .then(res => {
        console.log("POSTS:", res.data);
        setPosts(res.data || []);
      })
      .catch(err => {
        console.error("ERROR FETCHING POSTS:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section>
        <div className="preview-images">
          <img src="/assets/cam.jpg" alt="" />
          <img src="/assets/phonecam.jpg" alt="" />
          <img src="/assets/cam.jpg" alt="" />
          <img src="/assets/phonecam.jpg" alt="" />
        </div>

        <div className="hero-text">
          <h2>A Love That Blooms Through the Lens</h2>
          <p>
            Flowers have always drawn me in their quiet elegance and natural charm.
            Capturing flowers allows me to slow down and truly appreciate
            nature's details, turning fleeting moments into lasting memories.
            Through my lens, I express creativity and admiration for nature.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section>
        <div className="preview-images">
          <img src="/assets/pink oleander.jpg" alt="" />
          <img src="/assets/Mimosa pudica.jpg" alt="" />
          <img src="/assets/ylw.jpg" alt="" />
          <img src="/assets/Crossandra infundibuliformis.jpg" alt="" />
        </div>

        <h3>HIGHLIGHTS</h3>
        <ul>
          <li>Capturing the natural beauty and details of flowers through photography</li>
          <li>Expressing creativity and emotions using colors, shapes, and lighting</li>
          <li>Finding inspiration and peace in nature through flower photography</li>
          <li>Appreciating the diversity of flowers in different environments</li>
          <li>Showing the unique patterns and textures of each flower</li>
        </ul>
      </section>

      {/* POSTS */}
      <section className="posts">
        <h2>Latest Posts</h2>

        {loading && <p>Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <p>No posts yet. Be the first to write one!</p>
        )}

        <div className="posts-grid">
          {posts?.map(post => (
            <div key={post._id} className="post-card">

              {post?.image && (
                <img
                  src={`${process.env.REACT_APP_API_URL?.replace('/api',
'')}/uploads/${post.image}`}
                  alt={post.title || "Post image"}
                />
              )}

              <h3>
                <Link to={`/posts/${post._id}`}>
                  {post?.title || "Untitled"}
                </Link>
              </h3>

              <p>
                {post?.body
                  ? post.body.substring(0, 120)
                  : "No content available"}...
              </p>

              <small>
                By {post?.author?.name || "Unknown"} ·{" "}
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "No date"}
              </small>

            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Contact: tucaykat@gmail.com</p>
        <p>&copy; 2026 My Portfolio. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;