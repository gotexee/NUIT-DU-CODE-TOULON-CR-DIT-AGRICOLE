import "./App.css";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Nav />
      </header>
      <body>
        <Home />
      </body>
      <main className="grow"></main>
      <Footer />
    </div>
  );
}
 