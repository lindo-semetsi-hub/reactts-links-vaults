import type {Link} from "../types/Link";
import LinkItem from "./LinkItem";

interface Props {
    links: Link[];
    onEdit: (link: Link) => void;
    onDelete: (id: number) => void;
}

export default function LinkList({ links, onEdit, onDelete }: Props) {
    if (links.length === 0) return <p>No links saved.</p>;

    return (
        <div className="link-list">
            {links.map(link => (
                <LinkItem key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

