import React, { useEffect, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
const AllCoinsPage = React.lazy(() => import("./pages/AllCoinsPage.jsx"));
const CoinDetailPage = React.lazy(() => import("./pages/CoinDetailPage.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
import Error from "./components/common/Error.jsx";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Loading from "./components/common/Loading.jsx";
import ScrollToTop from "./logic/ScrollToTop.jsx";

function AppLayout() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<AllCoinsPage />} />
        <Route path="/:id" element={<CoinDetailPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    console.log(
      "%cDesigned and Coded by Laura Głąb",
      "color: white; padding: 5px 7px; border-radius: 5px; font-weight: bold; background-color: #df8653;"
    );
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    </Router>
  );
}
