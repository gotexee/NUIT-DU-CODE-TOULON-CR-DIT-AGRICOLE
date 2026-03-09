export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h6 className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Crédit Agricole. Tous droits réservés.
        </h6>

        {/* Optionnel : Rappel rapide des liens pour l'accessibilité */}
        <div className="flex gap-4 text-xs text-gray-400">
          <a href="#" className="hover:underline">
            Mentions légales
          </a>
          <a href="#" className="hover:underline">
            Confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
} 
