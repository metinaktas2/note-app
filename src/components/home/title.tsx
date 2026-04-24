import { Plus } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";

const Title: FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Notlarım</h1>
        <p className="text-text-secondary">
          Tüm notlarınızı burada görüntüleyin ve yönetin
        </p>
      </div>

      <Link
        to="/create"
        className="bg-primary text-text-primary hover:bg-primary-hover py-2 px-4 rounded-md shadow-sm transition inline-flex items-center"
      >
        <Plus />
        Yeni Not Ekle
      </Link>
    </div>
  );
};

export default Title;
