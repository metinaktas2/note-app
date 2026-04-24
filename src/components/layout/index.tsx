import type { FC } from "react";
import Header from "./header";
import Footer from "./footer";
interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="grow container py-6 px-4 sm:px-6 animate-slide-up">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
