import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Login from "@/pages/Authentication/Login";
import Spinner from "@/components/Spinner";
import HomePage from "@/pages/Home/HomePage";
import PageNotFound from "@/pages/PageNotFound";

import { useAuth } from "@/context/userContext";
import { SignUp } from "@/pages/Authentication/SignUp";

const IdeaPage = lazy(() => import("@/pages/IdeaPage/IdeaPage"));
const UserSettings = lazy(() => import("@/pages/Settings/UserSettings"));

function Router() {
  const { userId } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/idea/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <IdeaPage />
          </Suspense>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Spinner />}>
            <SignUp />
          </Suspense>
        }
      />
      {userId && (
        <Route
          path="/:id/settings"
          element={
            <Suspense fallback={<Spinner />}>
              <UserSettings />
            </Suspense>
          }
        />
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
