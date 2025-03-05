import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./components/Common/Home.jsx";
import Signin from "./components/Common/Signin.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import Articles from "./components/Common/Articles.jsx";
import ArticleById from "./components/Common/ArticleById.jsx";
import PostArticle from "./components/Author/PostArticle.jsx";
import AuthorProfile from "./components/Author/AuthorProfile.jsx";
import Signup from "./components/Common/SignUp.jsx";
import UserAuthorContext from "./context/UserAuthorContext.jsx";

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: ":articleId",
            element: <ArticleById />,
          },
          {
            path: "",
            element: <Navigate to="articles" />,
          },
        ],
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: ":articleId",
            element: <ArticleById />,
          },
          {
            path: "article",
            element: <PostArticle />,
          },
          {
            path: "",
            element: <Navigate to="articles" />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthorContext>
      {/* <App/> */}
      <RouterProvider router={browserRouterObj} />
    </UserAuthorContext>
  </StrictMode>
);
