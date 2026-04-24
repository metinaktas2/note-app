import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Form from "./pages/form";
import { useEffect, useState, type FC } from "react";
import PageLoader from "./components/loader/page-loader";
import Layout from "./components/layout";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<Detail />} />
          <Route path="/create" element={<Form />} />
          <Route path="/edit/:id" element={<Form />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
