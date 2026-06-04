import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/* ──────────────────────────────────────────────────────────────
   Pre-process markdown: convert $...$ and $$...$$ to KaTeX HTML
   BEFORE passing to ReactMarkdown, so rehype-raw can render it.
   Code fences are protected and restored untouched.
────────────────────────────────────────────────────────────── */
const preprocessMath = (raw) => {
    if (!raw) return raw;

    // 1. Pull out and protect fenced code blocks  ```...```
    const fencedBlocks = [];
    let out = raw.replace(/```[\s\S]*?```/g, (match) => {
        fencedBlocks.push(match);
        return `__FENCE_${fencedBlocks.length - 1}__`;
    });

    // 2. Pull out and protect inline code  `...`
    const inlineCode = [];
    out = out.replace(/`[^`\n]+`/g, (match) => {
        inlineCode.push(match);
        return `__INLINE_${inlineCode.length - 1}__`;
    });

    // 3. Block math  $$...$$
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (_match, latex) => {
        try {
            const html = katex.renderToString(latex.trim(), {
                displayMode: true,
                throwOnError: false,
                trust: true,
            });
            return `<div class="katex-block" style="overflow-x:auto;padding:1rem 0;text-align:center;margin-bottom:1.2rem;">${html}</div>`;
        } catch {
            return `<div class="katex-error">${latex}</div>`;
        }
    });

    // 4. Inline math  $...$  (not $$ which was already handled)
    out = out.replace(/\$([^$\n]+?)\$/g, (_match, latex) => {
        try {
            const html = katex.renderToString(latex.trim(), {
                displayMode: false,
                throwOnError: false,
                trust: true,
            });
            return html;
        } catch {
            return `<code>${latex}</code>`;
        }
    });

    // 5. Restore inline code  `...`
    out = out.replace(/__INLINE_(\d+)__/g, (_m, idx) => inlineCode[parseInt(idx, 10)]);

    // 6. Restore fenced code blocks
    out = out.replace(/__FENCE_(\d+)__/g, (_m, idx) => fencedBlocks[parseInt(idx, 10)]);

    return out;
};

/* ────────────────────────────────────────────────────────────── */

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

    const processedContent = preprocessMath(post.content);

    return (
        <article
            className="blog-detail"
            style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}
        >
            <div className="container" style={{ maxWidth: '860px' }}>
                <Link
                    to="/blogs"
                    className="back-link"
                    style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-primary)' }}
                >
                    &larr; Back to Blogs
                </Link>

                <h1 className="blog-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {post.title}
                </h1>
                <p className="blog-date" style={{ marginBottom: '2rem' }}>
                    {new Date(post.created_at).toLocaleDateString()}
                </p>

                {post.media_url && (
                    <div
                        className="blog-media-full"
                        style={{
                            marginBottom: '2rem',
                            overflow: 'hidden',
                            border: '3px solid var(--border-color)',
                            boxShadow: '5px 5px 0px var(--text-primary)',
                        }}
                    >
                        {post.media_type === 'video' ? (
                            <video
                                controls
                                src={post.media_url}
                                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }}
                            />
                        ) : (
                            <img
                                src={post.media_url}
                                alt={post.title}
                                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#000' }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="blog-content-full"
                    style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            /* ── Code blocks ── */
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                if (!inline && match) {
                                    return (
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
                                    );
                                }
                                return (
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

                            /* ── Headings ── */
                            h2({ children }) {
                                return (
                                    <h2 style={{
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.4rem',
                                        borderBottom: '2px solid var(--border-color)',
                                        paddingBottom: '0.3rem',
                                        marginTop: '2rem',
                                        marginBottom: '1rem',
                                    }}>
                                        {children}
                                    </h2>
                                );
                            },
                            h3({ children }) {
                                return (
                                    <h3 style={{
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.15rem',
                                        marginTop: '1.5rem',
                                        marginBottom: '0.75rem',
                                    }}>
                                        {children}
                                    </h3>
                                );
                            },

                            /* ── Blockquote ── */
                            blockquote({ children }) {
                                return (
                                    <blockquote style={{
                                        borderLeft: '4px solid var(--accent-color)',
                                        background: 'var(--bg-secondary)',
                                        padding: '0.8rem 1rem',
                                        marginLeft: 0,
                                        marginBottom: '1rem',
                                        color: 'var(--text-muted)',
                                        fontStyle: 'italic',
                                    }}>
                                        {children}
                                    </blockquote>
                                );
                            },

                            /* ── Table ── */
                            table({ children }) {
                                return (
                                    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                                        <table style={{
                                            borderCollapse: 'collapse',
                                            width: '100%',
                                            border: '2px solid var(--border-color)',
                                        }}>
                                            {children}
                                        </table>
                                    </div>
                                );
                            },
                            th({ children }) {
                                return (
                                    <th style={{
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-primary)',
                                        padding: '0.6rem 1rem',
                                        textAlign: 'left',
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '0.8rem',
                                        borderRight: '1px solid var(--bg-secondary)',
                                    }}>
                                        {children}
                                    </th>
                                );
                            },
                            td({ children }) {
                                return (
                                    <td style={{
                                        padding: '0.5rem 1rem',
                                        borderBottom: '1px solid var(--border-color)',
                                        borderRight: '1px solid var(--border-color)',
                                    }}>
                                        {children}
                                    </td>
                                );
                            },
                        }}
                    >
                        {processedContent}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    );
};

export default BlogDetailPage;
