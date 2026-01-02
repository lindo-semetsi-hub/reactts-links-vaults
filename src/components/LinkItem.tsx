import type { Link } from "../types/Link";

interface Props {
    link: Link;
    onEdit: (link: Link) => void;
    onDelete: (id: number) => void;
}

export default function LinkItem({ link, onEdit, onDelete }: Props) {
    return (
        <div className="link-item">
        <h3>{link.title}</h3>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
  {link.url}
</a>
        <p>{link.description}</p>
        {link.tags && <small>Tags: {link.tags}</small>}
        <div className = "buttons">
            <button onClick={() => onEdit(link)}>Edit</button>
            <button onClick={() => onDelete(link.id)}>Delete</button>
        </div>
        </div>
    );
}