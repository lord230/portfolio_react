import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaType, setMediaType] = useState('none');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('Uploading...');

        try {
            let mediaUrl = null;

            if (file && mediaType !== 'none') {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { data, error: uploadError } = await supabase.storage
                    .from('blog-media')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('blog-media')
                    .getPublicUrl(filePath);

                mediaUrl = publicUrl;
            }

            const { error: dbError } = await supabase
                .from('posts')
                .insert([
                    {
                        title,
                        content,
                        media_type: mediaType,
                        media_url: mediaUrl
                    }
                ]);

            if (dbError) throw dbError;

            setStatus('Post created successfully!');
            setTitle('');
            setContent('');
            setFile(null);
            setMediaType('none');
            // Slight timeout to let user see success
            setTimeout(onClose, 1500);

        } catch (error) {
            console.error('Error:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-modal">
            <div className="admin-content">
                <div className="modal-header">
                    <h2>Create New Blog Post</h2>
                    <button className="close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleUpload}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="admin-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Content (Markdown supported)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="admin-textarea"
                            rows="6"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Media Type</label>
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value)}
                            className="admin-select"
                        >
                            <option value="none">None</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="code">Code Snippet (Image)</option>
                        </select>
                    </div>
                    {mediaType !== 'none' && (
                        <div className="form-group">
                            <label>Upload Media file</label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                                className="admin-file"
                            />
                        </div>
                    )}
                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </button>
                        <span className="status-msg">{status}</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
