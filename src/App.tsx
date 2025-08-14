import { useState, useEffect } from "react";
import type { Link } from "./types/Link";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/Linklist";
import "./App.css";

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | undefined>(undefined);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("links");
    if (saved) setLinks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const handleSave = (link: Link) => {
    if (editingLink) {
      setLinks(links.map(l => (l.id === link.id ? link : l)));
      setEditingLink(undefined);
    } else {
      setLinks([...links, link]);
    }
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
  };

  const handleDelete = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const filteredLinks = links.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.url.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase()) ||
    (l.tags && l.tags.toLowerCase().includes(search.toLowerCase()))
    );

    return (
      <div className="container">
        <h1>Links Vault</h1>

        {/* Search box */}
        <input
        type="text"
        placeholder="Search links..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        {/* Link form */}
        <LinkForm onSave={handleSave} editingLink={editingLink} />

        {/* Link form */}
        <LinkList links={filteredLinks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    );
}