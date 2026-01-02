import { useState, useEffect } from "react";
import type { Link } from "./types/Link";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/Linklist";
import "./App.css";

export default function App() {
  /* state */
  const [links, setLinks] =
   useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy]
   = useState("newest");
  const [screen, setScreen] = useState<"list" | "add">("list");

  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  /* effects */
  useEffect(() => {
    const saved =
     localStorage.getItem("links");
    if (saved) setLinks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

            /* handlers */
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleSave = (link: Link) => {
    if (editingLink) {
      setLinks(links.map(l => (l.id === link.id ? link : l)));
      setEditingLink(undefined);
    } else {
      setLinks([...links, link]);
    }
    setScreen("list");
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setScreen("add");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this link?")) {
      setLinks(links.filter(l => l.id !== id));
    }
  };

// filter & sort */
  const filteredLinks = links
    .filter(l =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      (l.tags && l.tags.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  /* UI */
  return (
    <div className="container">
      {/* bar at the top*/}
      <div className="top-bar">
        <h1>🔗 Links Vault</h1>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* navigation */}
      <div className="nav">
        <button onClick={() => setScreen("list")}>📂 My Links</button>
        <button onClick={() => setScreen("add")}>➕ Add Link</button>
      </div>

      {/* screens */}
      {screen === "add" && (
        <>
          {editingLink && <p>Editing: <strong>{editingLink.title}</strong></p>}
          <LinkForm onSave={handleSave} editingLink={editingLink} />
        </>
      )}

      {screen === "list" && (
        <>
          {/* search */}
          <input
            type="text"
            placeholder="earch links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* sorting the links */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">Title A–Z</option>
          </select>

          {/* list */}
          <LinkList
            links={filteredLinks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}