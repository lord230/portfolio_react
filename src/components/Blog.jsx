import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleAdminClick = () => {
        if (isAdminLoggedIn) {
            setIsAdminOpen(true);
        } else {
            setShowLoginModal(true);
        }
    };

    const handleLoginSuccess = () => {
        setIsAdminLoggedIn(true);
        setShowLoginModal(false);
        setIsAdminOpen(true);
    };

    const handleAdminClose = () => {
        setIsAdminOpen(false);
        fetchPosts(); // Refresh posts on close
    };

    return (
        <section id="blog" className="blog">
            <div className="container">
                <div className="section-header-row">
                    <h2 className="section-title">Tech Blog</h2>
                    <button className="btn-icon" onClick={handleAdminClick} title="Admin Upload">
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </div>

                {loading ? (
                    <div className="loading">Loading posts...</div>
                ) : (
                    <div className="blog-grid">
                        {posts.length === 0 ? (
                            <p className="no-posts">No posts yet. Be the first to post!</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="blog-card">
                                    {post.media_url && post.media_type === 'image' && (
                                        <div className="blog-media">
                                            <img src={post.media_url} alt={post.title} />
                                        </div>
                                    )}
                                    {post.media_url && post.media_type === 'video' && (
                                        <div className="blog-media">
                                            <video controls src={post.media_url} />
                                        </div>
                                    )}
                                    {post.media_url && post.media_type === 'code' && (
                                        <div className="blog-media code-snippet">
                                            <img src={post.media_url} alt="Code Snippet" />
                                        </div>
                                    )}
                                    <div className="blog-content">
                                        <h3 className="blog-title">{post.title}</h3>
                                        <p className="blog-date">{new Date(post.created_at).toLocaleDateString()}</p>
                                        <p className="blog-text">{post.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {showLoginModal && (
                <AdminLogin
                    onLogin={handleLoginSuccess}
                    onClose={() => setShowLoginModal(false)}
                />
            )}

            {isAdminOpen && <AdminDashboard onClose={handleAdminClose} />}
        </section>
    );
};

export default Blog;
