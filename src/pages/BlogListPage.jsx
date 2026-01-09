import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchPosts();
    }, []);

    return (
        <section className="blog-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <h2 className="section-title">Tech Blog</h2>
                {loading ? (
                    <div className="loading">Loading posts...</div>
                ) : (
                    <div className="blog-grid">
                        {posts.length === 0 ? (
                            <p className="no-posts">No posts yet.</p>
                        ) : (
                            posts.map((post) => (
                                <Link to={`/blogs/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                                    <div className="blog-card">
                                        {post.media_url && (
                                            <div className="blog-media">
                                                {post.media_type === 'video' ? (
                                                    <video src={post.media_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <img src={post.media_url} alt={post.title} />
                                                )}
                                            </div>
                                        )}
                                        <div className="blog-content">
                                            <h3 className="blog-title">{post.title}</h3>
                                            <p className="blog-date">{new Date(post.created_at).toLocaleDateString()}</p>
                                            <p className="blog-text">
                                                {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogListPage;
