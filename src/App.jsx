import { Navigate, Route, Routes, useLocation } from "react-router";

import FeedPage from "./pages/feed";
import Upload from "./pages/upload";

import SignUp from "./pages/sign-up";
import Login from "./pages/login";
import { useSupabase } from "./context/useSupabase";
import Loading from "./components/ui/loading";
import Header from "./components/ui/header";
import { Toaster } from "react-hot-toast";

function App() {
  const { pathname } = useLocation();
  const { session, isLoading, reels } = useSupabase();

  if (
    isLoading &&
    pathname !== "/login" &&
    pathname !== "/sign-up" &&
    pathname !== "/upload"
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" />

      <Routes>
        <Route path="/" element={<Navigate to={`feed/${reels[0]?.id}`} />} />

        {!session && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        )}

        <Route element={<Header />}>
          <Route path="/upload" element={<Upload />} />

          <Route path="feed">
            <Route index element={<FeedPage />} />
            <Route path=":videoId" element={<FeedPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
