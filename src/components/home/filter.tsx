import { Search } from "lucide-react";
import type { FC } from "react";
import ReactSelect from "react-select";
import { selectStyles } from "../../utils/constants";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface Props {
  title: string;
  selectedTags: string[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filter: FC<Props> = ({
  title,
  selectedTags,
  setTitle,
  setSelectedTags,
}) => {
  const { notes } = useSelector((state: RootState) => state.notes);

  //Tüm notların benzersiz olan etiketlerini al
  const uniqueTags = [...new Set(notes.map((note) => note.tags).flat())];

  return (
    <div className="card p-5 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Arama inputu */}
        <div className="grow w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              placeholder="Notları ara..."
              className="pl-10 pr-4 py-2.5 w-full rounded-md border border-border text-text-primary bg-card placeholder:text-text-secondary focus:outline-none focus:ring-primary transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* Etiket seçici */}
        <div className="w-full md:w-1/2">
          <ReactSelect
            isMulti
            styles={selectStyles}
            placeholder="Etiketleri Seçiniz..."
            options={uniqueTags.map((t) => ({ label: t, value: t }))}
            value={selectedTags.map((t) => ({ label: t, value: t }))}
            onChange={(tags) => setSelectedTags(tags.map((t) => t.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
