import type { FC } from "react";
import type { Note } from "../../types";
import Card from "./card";

interface Props {
  notes: Note[];
}

const List: FC<Props> = ({ notes }) => {
  return notes.length === 0 ? (
    <div className="flex flex-col items-center my-40">
      <h2 className="text-xl font-bold text-text-primary">
        Henüz Not Eklenmedi
      </h2>
      <p className="text-text-secondary mb-6">
        İlk notunuzu ekleyerek başlayın ve fikirlerlerinizi kaydedin
      </p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div key={note.id} className="min-w-0">
          <Card note={note} />
        </div>
      ))}
    </div>
  );
};

export default List;
