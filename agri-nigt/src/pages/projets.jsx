import { useState, useEffect, useRef } from "react";
import "./projets.css";
import banner from "../pages/images/banner.jpg";
import Nav from "../components/Nav.jsx";

export default function projets() {
  // États pour gérer les étapes
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Références pour les animations
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const firstNameRef = useRef(null);
  const cityRef = useRef(null);
  const formRef = useRef(null);

  // Titres disponibles
  const titles = ["Monsieur", "Madame", "Mademoiselle"];

  // Étape suivante 
  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Sélection du titre
  const handleTitleSelect = (title) => {
    setSelectedTitle(title);
    goToNextStep();
  };

  // Affichage du formulaire
  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        setIsFormVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Reset au clic sur le header
  useEffect(() => {
    const handleHeaderClick = () => {
      setCurrentStep(0);
      setSelectedTitle("");
      setIsFormVisible(false);
    };

    const header = document.querySelector(".app-header");
    header?.addEventListener("click", handleHeaderClick);

    return () => {
      header?.removeEventListener("click", handleHeaderClick);
    };
  }, []);

  return (
    <>
    <Nav />
      {/* HEADER */}
      <header className="app-header">
        <div className="action-banner">
          <img
            src={banner}
            alt="Bannière Crédit Agricole - Trouvez votre Caisse Locale"
            className="banner-image"
          />
          <div className="banner-overlay">
            <h1 className="banner-title">Donner la parole au territoire</h1>
            <p className="banner-subtitle">
              Exprimer votre projet
            </p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="app-main">
        <section className="main-title">
          <div>
            <h2>Quels sont vos besoins ?</h2>
            <p>
              Vous avez des idées ? Proposez-les dans cette rubrique.
              Le Crédit Agricole vous aide à financer de A à Z et vous accompagne
              dans la création de votre compte, etc.
            </p>
          </div>
        </section>

        {/* ÉTAPES */}
        <section className="first-infos">
          {/* Étape 0 */}
          <div
            ref={titleRef}
            className={`step-container ${
              currentStep >= 0 ? "step-visible" : ""
            }`}
          >
            <h3 className="step-label">Civilité</h3>
            <div className="title-buttons">
              {titles.map((title, index) => (
                <button
                  key={title}
                  className={`title-button ${
                    selectedTitle === title ? "selected" : ""
                  }`}
                  onClick={() => handleTitleSelect(title)}
                  disabled={currentStep > 0}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Étape 1 */}
          <div
            ref={nameRef}
            className={`step-container ${
              currentStep >= 1 ? "step-visible" : ""
            }`}
          >
            <h3 className="step-label">Votre nom</h3>
            <input type="text" className="form-input" placeholder="Entrez votre nom" />
            <button
              className="step-button"
              onClick={goToNextStep}
              disabled={currentStep > 1}
            >
              Continuer
            </button>
          </div>

          {/* Étape 2 */}
          <div
            ref={firstNameRef}
            className={`step-container ${
              currentStep >= 2 ? "step-visible" : ""
            }`}
          >
            <h3 className="step-label">Votre prénom</h3>
            <input type="text" className="form-input" placeholder="Entrez votre prénom" />
            <button
              className="step-button"
              onClick={goToNextStep}
              disabled={currentStep > 2}
            >
              Continuer
            </button>
          </div>

          {/* Étape 3 */}
          <div
            ref={cityRef}
            className={`step-container ${
              currentStep >= 3 ? "step-visible" : ""
            }`}
          >
            <h3 className="step-label">Votre ville</h3>
            <input type="text" className="form-input" placeholder="Entrez votre ville" />
            <button
              className="step-button"
              onClick={goToNextStep}
              disabled={currentStep > 3}
            >
              Continuer
            </button>
          </div>

          {/* Étape 4 */}
          <div
            className={`step-container ${
              currentStep >= 4 ? "step-visible" : ""
            }`}
          >
            <h3 className="step-label">Prêt à continuer ?</h3>
            <button className="step-button final-step">
              ✓ Compléter le formulaire
            </button>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section
          ref={formRef}
          className={`section-form ${isFormVisible ? "form-visible" : ""}`}
        >
          <div className="form-header">
            <h2>Formulaire de contact</h2>
            <p className="form-subtitle">
              Remplissez ce formulaire pour nous faire part de votre projet
              {selectedTitle && `, ${selectedTitle}`}.
            </p>
          </div>

          <form className="contact-form">
            <input
              type="text"
              placeholder="Titre de votre projet"
              className="form-input"
              required
            />

            <textarea
              placeholder="Description détaillée"
              className="form-input form-textarea"
              rows="4"
              required
            />

            <input type="date" className="form-input" required />

            <input
              type="email"
              placeholder="votre@email.com"
              className="form-input"
              required
            />

            <input
              type="tel"
              placeholder="06 12 34 56 78"
              className="form-input"
              required
            />

            <label>
              <input type="checkbox" required /> J’accepte la politique de
              confidentialité
            </label>

            <button type="submit" className="submit-button">
              Envoyer votre demande →
            </button>

            <p className="form-note">
              Un conseiller du Crédit Agricole vous recontactera sous 48 h.
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>© 2026 Crédit Agricole — Tous droits réservés</p>
      </footer>
    </>
  );
}
