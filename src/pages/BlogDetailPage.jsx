import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!post) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Post not found</div>;

    return (
        <article className="blog-detail" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/blogs" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-primary)' }}>
                    &larr; Back to Blogs
                </Link>
                <h1 className="blog-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
                <p className="blog-date" style={{ marginBottom: '2rem' }}>{new Date(post.created_at).toLocaleDateString()}</p>

                {post.media_url && (
                    <div className="blog-media-full" style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
                        {post.media_type === 'video' ? (
                            <video controls src={post.media_url} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }} />
                        ) : (
                            <img src={post.media_url} alt={post.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }} />
                        )}
                    </div>
                )}

                <div className="blog-content-full" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    );
};

export default BlogDetailPage;
