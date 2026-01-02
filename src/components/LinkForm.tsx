import React, { useState, useEffect } from "react";
import type { Link } from "../types/Link";

interface Props {
    onSave: (link: Link) => void;
    editingLink?: Link;
}

export default function LinkForm({ onSave, editingLink }: Props) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDecsription] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (editingLink) {
            setTitle(editingLink.title);
            setUrl(editingLink.url);
            setDecsription(editingLink.description);
            setTags(editingLink.tags || "");
        }
    }, [editingLink]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLink: Link = {
            id: editingLink ? editingLink.id : Date.now(), 
            title,
            url,
            description,
            tags,
        };
        onSave(newLink);
        setTitle("");
        setUrl("");
        setDecsription("");
        setTags("");
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            />
            <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDecsription(e.target.value)}
            required
            />
            <input 
            type="text"
            placeholder="Tags (optional"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">{editingLink ? "Update Link" : "Add Link"}
            </button>
        </form>
    );
    }
