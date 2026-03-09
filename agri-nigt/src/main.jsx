import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Projets from "./pages/projets.jsx";
import Actions from "./pages/actions.jsx";
import Resultats from "./pages/resultats.jsx";
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projets",
    element: <Projets />,
  }
  ,{
    path: "/actions",
    element: <Actions />,
  },
  {
    path: "/resultats",
    element: <Resultats />,
  }
  ,{
    path: "*",
    element: (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-500">404 - Page non trouvée</h1>
        <Link to="/" className="mt-4 inline-block text-green-700 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    ),
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
 