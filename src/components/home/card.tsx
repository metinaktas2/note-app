import type { FC } from "react";
import type { Note } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  note: Note;
}

const Card: FC<Props> = ({ note }) => {
  //not içeriği
  const content =
    note.content.length > 100
      ? note.content.slice(0, 100) + "..."
      : note.content;
  return (
    <Link
      to={`/note/${note.id}`}
      className="card group p-5 flex flex-col animate-fade-in trasform hover:scale-[1.02] transition min-w-0"
    >
      {/* Başlık */}
      <h3 className="mb-3 text-lg font-bold text-text-primary group-hover:text-primary transition line-clamp-1 break-words">
        {note.title}
      </h3>

      {/* İçerik */}
      <p className="text-secondary text-sm mb-4 flex-grow break-words overflow-wrap-anywhere">{content}</p>

      {/* Etiketler */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-border">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-primary text-text-primary text-xs py-0.5 px-2 mt-2 rounded-full inline-flex items-center transition hover:bg-opacity-20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default Card;
