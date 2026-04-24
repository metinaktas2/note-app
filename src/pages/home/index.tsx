import { useMemo, useState, type FC } from "react";
import Title from "../../components/home/title";
import Filter from "../../components/home/filter";
import List from "../../components/home/list";
import Total from "../../components/home/total";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Home: FC = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //seçili title ve selectedTags değerlerine göre notları filtrele
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        //başlık filtrelemesi
        const titleMatch = note.title
          .toLowerCase()
          .includes(title.toLowerCase());

        //etiket filtrelemesi
        const tagMatch =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.includes(tag));

        return titleMatch && tagMatch;
      }),
    [title, selectedTags, notes]
  );

  console.log(notes);
  return (
    <div>
      <Title />
      <Filter
        title={title}
        selectedTags={selectedTags}
        setTitle={setTitle}
        setSelectedTags={setSelectedTags}
      />
      <List notes={filtredNotes} />
      <Total totalCount={notes.length} filtredCount={filtredNotes.length} />
    </div>
  );
};

export default Home;
