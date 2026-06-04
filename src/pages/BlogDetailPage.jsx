import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

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
            <div className="container" style={{ maxWidth: '860px' }}>
                <Link to="/blogs" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-primary)' }}>
                    &larr; Back to Blogs
                </Link>
                <h1 className="blog-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
                <p className="blog-date" style={{ marginBottom: '2rem' }}>{new Date(post.created_at).toLocaleDateString()}</p>

                {post.media_url && (
                    <div className="blog-media-full" style={{ marginBottom: '2rem', overflow: 'hidden', border: '3px solid var(--border-color)', boxShadow: '5px 5px 0px var(--text-primary)' }}>
                        {post.media_type === 'video' ? (
                            <video controls src={post.media_url} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }} />
                        ) : (
                            <img src={post.media_url} alt={post.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }} />
                        )}
                    </div>
                )}

                <div className="blog-content-full" style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            border: '2px solid var(--border-color)',
                                            boxShadow: '4px 4px 0px var(--text-primary)',
                                            borderRadius: '0',
                                            marginBottom: '1.5rem',
                                            fontSize: '0.9rem',
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-color)',
                                            padding: '0.1em 0.4em',
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '0.9em',
                                        }}
                                        className={className}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            blockquote({ children }) {
                                return (
                                    <blockquote style={{
                                        borderLeft: '4px solid var(--accent-color)',
                                        paddingLeft: '1rem',
                                        marginLeft: 0,
                                        color: 'var(--text-muted)',
                                        fontStyle: 'italic',
                                        background: 'var(--bg-secondary)',
                                        padding: '0.8rem 1rem',
                                        marginBottom: '1rem',
                                    }}>
                                        {children}
                                    </blockquote>
                                );
                            },
                            h2({ children }) {
                                return <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.4rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.3rem', marginTop: '2rem', marginBottom: '1rem' }}>{children}</h2>;
                            },
                            h3({ children }) {
                                return <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h3>;
                            },
                            table({ children }) {
                                return (
                                    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                                        <table style={{ borderCollapse: 'collapse', width: '100%', border: '2px solid var(--border-color)' }}>
                                            {children}
                                        </table>
                                    </div>
                                );
                            },
                            th({ children }) {
                                return <th style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.6rem 1rem', textAlign: 'left', fontFamily: 'var(--font-serif)', fontSize: '0.8rem', borderRight: '1px solid var(--bg-secondary)' }}>{children}</th>;
                            },
                            td({ children }) {
                                return <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>{children}</td>;
                            },
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
