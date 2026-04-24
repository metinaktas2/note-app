import { type FC } from "react";
import Spinner from "./spinner";

const PageLoader: FC = () => {
  return (
    <div className="h-screen w-full flex items-center  justify-center bg-background">
      <div className="text-center">
        <div className="text-3xl mb-4">📝</div>
        <Spinner />
        <p className="mt-4 text-secondary animate-pulse">
          Not Uygulaması Yükleniyor...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
