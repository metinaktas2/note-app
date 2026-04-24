import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../redux/store";
import NotFound from "../../components/notfound";
import { MoveLeft, Pencil, Trash } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { deleteNote } from "../../redux/slices/noteSlice";
import { toast } from "react-toastify";

const Detail: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //url'deki id'yi al
  const { id } = useParams<{ id: string }>();
  //store'daki notları al
  const { notes } = useSelector((state: RootState) => state.notes);

  //id'ye göre notu bul
  const note = notes.find((note) => note.id === id);

  //notu silme fonksiyonu
  const handleDelete = () => {
    if (note && confirm("Bu notu silmek istediğinizden emin misiniz?")) {
      dispatch(deleteNote(note!.id));
      toast.success("Not Başarıyla Silindi");
      navigate("/");
    }
  };

  //eğer not bulunamadıysa
  if (!note) return <NotFound />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between sm:items-center gap-4 animate-fade-in">
        <div className="flex items-center">
          <Link
            to="/"
            className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-background transition"
          >
            <MoveLeft />
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Not Detayı</h1>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/edit/${id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md shadow-sm transition"
          >
            <Pencil className="size-4 mr-1.5" />
            Düzenle
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center px-4 py-2 bg-error hover:bg-error/80 text-white rounded-md shadow-sm transition"
          >
            <Trash className="size-4 mr-1.5" />
            Sil
          </button>
        </div>
      </div>

      {/* Not içeriği */}
      <div className="card p-6 sm:p-8 animate-slide-up">
        {/* Başlık */}
        <h1 className="text-3xl font-bold mb-6 text-text-primary">
          {note.title}
        </h1>

        {/* Etiketler */}
        {note.tags.map((tag, index) => (
          <div
            key={index}
            className="bg-primary text-white inline-flex rounded-full text-sm py-1 px-3 me-3"
          >
            {tag}
          </div>
        ))}
        {/* İçerik */}
        <div className="prose border-t border-border pt-6 mt-6">
          <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default Detail;
