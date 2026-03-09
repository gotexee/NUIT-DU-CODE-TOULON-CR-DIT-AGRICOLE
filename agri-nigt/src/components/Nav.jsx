export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="shrink-0">
          <img
            className="w-25"
            src="../src\assets\Logo groupe Crédit Agricole.png"
            alt="Logo Crédit Agricole"
          />
        </div>

        {/* NAVIGATION */}
        <div className="hidden md:block">
          <ul className="flex gap-8 items-center text-sm font-medium text-gray-700">
            <li>
              <a
                href="/"
                className=" p-3 m-1 hover:text-white hover:bg-green-600 hover:rounded-md transition-colors"
              >
                Home
              </a>
            </li> 

            <li>
              <a
                href="actions"
                className="  p-3 m-1 hover:text-white hover:bg-green-600 hover:rounded-md transition-colors"
              >
                Actions locales
              </a>
            </li>
            <li>
              <a
                href="projets"
                className="  p-3 m-1 hover:text-white hover:bg-green-600 hover:rounded-md transition-colors"
              >
                Projets financés
              </a>
            </li>
            <li>
              <a
                href="resultats"
                className=" p-3 m-1 hover:text-white hover:bg-green-600 hover:rounded-md transition-colors"
              >
                Résultats concrets
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
