import { useEffect, useState, type FC, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { mdeOptions, selectStyles } from "../../utils/constants";
import ReactSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../../redux/slices/noteSlice";
import type { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const Form: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { notes } = useSelector((state: RootState) => state.notes);

  //düzenlenecek notun verilerini state'e aktar
  useEffect(() => {
    const editNote = notes.find((note) => note.id === id);
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setSelectedTags(editNote.tags);
    } else {
      setTitle("");
      setContent("");
      setSelectedTags([]);
    }
  }, [id, notes]);

  const isEdit = !!id;
  //Tüm notların benzersiz olan etiketlerini al
  const uniqueTags = [...new Set(notes.map((note) => note.tags).flat())];

  //form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateNote({ id, title, content, tags: selectedTags }));
      toast.info("Not Başarıyla Güncellendi");
      navigate(`/note/${id}`);
    } else {
      dispatch(addNote(title, content, selectedTags));
      toast.success("Not Başarıyla Oluşturuldu");
      navigate("/");
    }
  };
  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            {isEdit ? "Not Düzenle" : "Yeni Not Oluştur"}
          </h1>
          <p className="text-text-secondary">
            Fikirlerinizi ve notlarınızı kaydedin
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="card p-6 sm:p-8 animate-slide-up"
      >
        {/* Başlık */}
        <div className="mb-6">
          <label htmlFor="title" className="label">
            Başlık:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-card border border-border rounded-md text-text-primary focus:ring-2 focus:ring-primary/30 transition"
            placeholder="Not başlığı..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* İçerik */}
        <div className="mb-6">
          <label htmlFor="content" className="label">
            İçerik:
          </label>
          <SimpleMDE
            options={mdeOptions}
            className="w-full markdown-editor bg-transparent"
            onChange={(value) => setContent(value)}
            value={content}
          />
        </div>

        {/* Etiketler */}
        <div className="mb-6">
          <label htmlFor="tags" className="label">
            Etiketler:
          </label>

          <ReactSelect
            isMulti
            styles={selectStyles}
            onChange={(tags) => setSelectedTags(tags.map((t) => t.value))}
            value={selectedTags.map((t) => ({ label: t, value: t }))}
            options={uniqueTags.map((t) => ({ label: t, value: t }))}
          />
        </div>

        {/* Butonlar */}

        <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-border">
          <Link to="/" className="form-button">
            <X className="size-4 mr-1.5" />
            İptal
          </Link>
          <button
            type="submit"
            className="form-button bg-primary hover:bg-primary-hover"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
