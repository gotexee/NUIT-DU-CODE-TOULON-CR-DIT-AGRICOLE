import { useState, useEffect } from "react";
import "./actions.css";
import banner from "../pages/images/banner.jpg";
import one from "../pages/images/1.png";
import two from "../pages/images/2.png";
import tree from "../pages/images/3.png";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer";

// Composant Modal
function Modal({ isOpen, onClose, localData }) {
  if (!isOpen || !localData) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }; 

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        {/* Bannière de la modale */}
        <div className="modal-banner">
          <div className="modal-banner-overlay">
            <h2 id="modal-title">{localData.title} - Détails</h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-image-container">
            <img src={localData.image} alt={localData.alt} />
          </div>

          <div className="modal-details">
            <h3>Services phares</h3>
            <ul className="modal-summary">
              {localData.summary.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Description détaillée</h3>
            <p className="modal-description">{localData.description}</p>
          </div>

          <div className="modal-actions">
            <button 
              className="btn-close-modal" 
              onClick={onClose}
              aria-label="Fermer la fenêtre"
            >
              × Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function actions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState(null);

  // Données pour les modales (à compléter selon vos besoins)
  const localDataMap = {
    "cl-antibes": {
      title: "CL ANTIBES",
      image: one,
      alt: "Caisse Locale d'Antibes",
      summary: [
        "Accompagnement personnalisé",
        "Financement de projets locaux",
        "Services patrimoniaux",
        "Conseil en investissement"
      ],
      description: "La Fondation d'entreprise CA PCA accompagne l'Association PILAUTIS 06 dans son projet de la rénovation de la ludothèque associative avec un soutien destiné à l'aménagement de la salle créative. Partenaire dans la durée après avoir soutenu la création de la ludothèque en 2014. Notre caisse locale s'engage quotidiennement pour le développement économique et social de la région d'Antibes."
    },
    "cl-bleone-durance": {
      title: "CL BLÉONE DURANCE",
      image: two,
      alt: "Caisse Locale Bléone Durance",
      summary: [
        "Handfauteuil inclusif",
        "Développement sportif local",
        "Financement associatif",
        "Projets territoriaux"
      ],
      description: "Association Val de Durance Hand Ball - la Fondation d'entreprise CA PCA participe au développement de la pratique du handfauteuil sur le territoire des Alpes de Haute Provence. Pratique totalement inclusive car elle réunit les personnes porteuses de handicap et les personnes valides. Un engagement fort pour l'inclusion et le sport adapté."
    },
    "cl-cuers-puget": {
      title: "CL DE CUERS PUGET-VILLE",
      image: tree,
      alt: "Caisse Locale de Cuers Puget-Ville",
      summary: [
        "Espace-test agricole",
        "Inclusion professionnelle",
        "Projets innovants",
        "Accompagnement entrepreneurial"
      ],
      description: "Lauréat 1er prix de l'Appel à Projets 2025 'Emploi, Logement, Alimentation : agissons ensemble pour le territoire'. Projet 'Graines d'inclusion à Pierrefeu' : création d'un espace-test agricole sécurisé, véritable incubateur pour futurs agriculteurs qui intègre l'inclusion professionnelle de travailleurs en situation de handicap et de personnes éloignées de l'emploi."
    },
    // Ajoutez les autres cailles locales ici avec le même format
  };

  const handleOpenModal = (localId) => {
    const data = localDataMap[localId] || {
      title: localId.replace('cl-', 'CL ').toUpperCase(),
      image: banner,
      alt: `Caisse Locale ${localId}`,
      summary: ["Service d'accueil", "Conseil bancaire", "Gestion de compte"],
      description: "Information détaillée sur cette caisse locale."
    };
    setSelectedLocal(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLocal(null);
  };

  // Écouteur pour la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le défilement de la page
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <>
    <Nav />
      <div className="action-page">
        {/* Modal */}
        <Modal 
          isOpen={modalOpen} 
          onClose={handleCloseModal} 
          localData={selectedLocal} 
        />

        {/* ========== HEADER ========== */}
        <header>
          <div className="action-banner">
            <img src={banner} alt="Bannière Crédit Agricole" />
            <div className="banner-overlay">
              <h1>Rendre l’impact local visible</h1>
              <p className="banner-subtitle">Sélectionnez votre zone géographique</p>
            </div>
          </div>
        </header>

        {/* ========== MAIN CONTENT ========== */}
        <main>
          {/* Section de sélection des zones */}
          <section className="section-selector">
            <h2>Sélectionner votre zone géographique</h2>
            <hr />
            <div className="container-zonegeo">
              <a href="#cl-antibes"><button>CL ANTIBES</button></a>
              <a href="#cl-bleone-durance"><button>CL BLÉONE DURANCE</button></a>
              <a href="#cl-cuers-puget"><button>CL DE CUERS PUGET-VILLE</button></a>
              <a href="#cl-forcalquier"><button>FORCALQUIER</button></a>
              <a href="#cl-hvav"><button>CL HVAV</button></a>
              <a href="#cl-hyeres"><button>CL HYÈRES</button></a>
              <a href="#cl-haut-var"><button>CL HAUT VAR VERDON</button></a>
              <a href="#cl-manosque"><button>CL MANOSQUE</button></a>
              <a href="#cl-menton"><button>CL MENTON</button></a>
              <a href="#cl-mer-esterel"><button>CL MER ESTEREL</button></a>
              <a href="#cl-nice"><button>CL NICE</button></a>
              <a href="#cl-pays-paillons"><button>CL PAYS DES PAILLONS</button></a>
              <a href="#cl-pays-grasse"><button>CL PAYS DE GRASSE</button></a>
              <a href="#cl-pays-sisteron"><button>CL PAYS DE SISTERON</button></a>
              <a href="#cl-seyne"><button>CL SEYNE LES ALPES</button></a>
              <a href="#cl-toulon"><button>CL TOULON</button></a>
              <a href="#cl-vallee-siagne"><button>CL VALLÉE DE LA SIAGNE</button></a>
              <a href="#cl-valensole"><button>CL VALENSOLE GRÉOUX</button></a>
              <a href="#cl-vence"><button>CL VENCE</button></a>
            </div>
          </section>

          {/* Section d'introduction */}
          <section className="section-intro">
            <hr />
            <div className="intro-content">
              <h3>🏦 Toutes vos caisses locales à portée de clic</h3>
              <p>
                Découvrez l'ensemble des Caisses Locales du Crédit Agricole dans votre département, 
                organisées par ville et zone géographique. Chaque caisse vous propose des services 
                de proximité adaptés à vos besoins bancaires et patrimoniaux.
              </p>
            </div>
            <hr />
          </section>

          {/* Section des descriptions détaillées */}
          <section className="section-details">
            {/* CL ANTIBES */}
            <article id="cl-antibes" className="card-location">
              <div className="card-header">
                <h2>CL ANTIBES</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={one} alt="Caisse Locale d'Antibes" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <p>
                  La Fondation d'entreprise CA PCA accompagne
                  l'Association PILAUTIS 06 dans son projet de la
                  rénovation de la ludothèque associative avec un soutien
                  destiné à l'aménagement de la salle créative. Partenaire
                  dans la durée après avoir soutenu la création de la
                  ludothèque en 2014
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-antibes")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL BLÉONE DURANCE */}
            <article id="cl-bleone-durance" className="card-location">
              <div className="card-header">
                <h2>CL BLÉONE DURANCE</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={two} alt="Caisse Locale Bléone Durance" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <p>
                  Association Val de Durance Hand Ball la Fondation
                  d'entreprise CA PCA participe au développement de
                  la pratique du handfauteuil sur le territoire des
                  Alpes de Haute Provence. Pratique totalement
                  inclusive car elle réunit les personnes porteuses de
                  handicap et les personnes valides.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-bleone-durance")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL CUERS PUGET-VILLE */}
            <article id="cl-cuers-puget" className="card-location">
              <div className="card-header">
                <h2>CL DE CUERS PUGET-VILLE</h2>
                <span className="badge">Var</span>
              </div>
              <img src={tree} alt="Caisse Locale de Cuers Puget-Ville" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <p>
                  Appel à Projets 2025 « Emploi, Logement,
                  Alimentation : agissons ensemble pour le
                  territoire » porté par la Caisse Régionale, la
                  Fondation d'entreprise PCA et le Point
                  Passerelle.
                  L'association UMANE, lauréat 1er prix pour son
                  projet : Graines d'inclusion à Pierrefeu Création
                  d'un espace-test agricole sécurisé, véritable
                  incubateur pour futurs agriculteurs qui intègre
                  l'inclusion professionnelle de travailleurs en
                  situation de handicap et de personnes éloignées
                  de l'emploi.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-cuers-puget")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* FORCALQUIER */}
            <article id="cl-forcalquier" className="card-location">
              <div className="card-header">
                <h2>CL FORCALQUIER</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={banner} alt="Caisse Locale de Forcalquier" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <p>
                  Implantée dans le pays de Forcalquier, notre caisse vous accompagne 
                  avec expertise et proximité pour concrétiser vos projets.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-forcalquier")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL HVAV */}
            <article id="cl-hvav" className="card-location">
              <div className="card-header">
                <h2>CL HVAV</h2>
                <span className="badge">Var</span>
              </div>
              <img src={banner} alt="Caisse Locale HVAV" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Gestion patrimoniale</li>
                  <li>Assurances vie et prévoyance</li>
                  <li>Crédit immobilier</li>
                </ul>
                <p>
                  La Caisse Locale HVAV met à votre disposition une gamme complète 
                  de services bancaires et d'accompagnement personnalisé.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-hvav")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL HYÈRES */}
            <article id="cl-hyeres" className="card-location">
              <div className="card-header">
                <h2>CL HYÈRES</h2>
                <span className="badge">Var</span>
              </div>
              <img src={banner} alt="Caisse Locale d'Hyères" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes bancaires et cartes</li>
                  <li>Crédits consommation et immobilier</li>
                  <li>Assurances habitation et véhicules</li>
                </ul>
                <p>
                  Située à Hyères, notre caisse vous offre des solutions bancaires 
                  innovantes et un service client de qualité.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-hyeres")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL HAUT VAR VERDON */}
            <article id="cl-haut-var" className="card-location">
              <div className="card-header">
                <h2>CL HAUT VAR VERDON</h2>
                <span className="badge">Var</span>
              </div>
              <img src={banner} alt="Caisse Locale Haut Var Verdon" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Solutions d'épargne</li>
                  <li>Financements professionnels</li>
                  <li>Conseil en gestion de patrimoine</li>
                </ul>
                <p>
                  Au cœur du Haut Var et du Verdon, notre équipe vous accompagne 
                  dans tous vos projets avec réactivité et expertise.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-haut-var")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL MANOSQUE */}
            <article id="cl-manosque" className="card-location">
              <div className="card-header">
                <h2>CL MANOSQUE</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={banner} alt="Caisse Locale de Manosque" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes et cartes bancaires</li>
                  <li>Crédits immobiliers</li>
                  <li>Assurances et placements</li>
                </ul>
                <p>
                  La Caisse Locale de Manosque vous propose des services bancaires 
                  complets et un accompagnement personnalisé.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-manosque")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL MENTON */}
            <article id="cl-menton" className="card-location">
              <div className="card-header">
                <h2>CL MENTON</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale de Menton" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Gestion de patrimoine</li>
                  <li>Solutions d'épargne et placement</li>
                  <li>Crédits et assurances</li>
                </ul>
                <p>
                  À Menton, notre caisse vous accueille pour répondre à tous vos besoins 
                  bancaires avec professionnalisme et proximité.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-menton")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL MER ESTEREL */}
            <article id="cl-mer-esterel" className="card-location">
              <div className="card-header">
                <h2>CL MER ESTEREL</h2>
                <span className="badge">Var</span>
              </div>
              <img src={banner} alt="Caisse Locale Mer Esterel" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes et épargne</li>
                  <li>Crédits immobiliers et consommation</li>
                  <li>Assurances multirisques</li>
                </ul>
                <p>
                  Entre mer et Esterel, notre caisse locale vous accompagne dans la 
                  réalisation de vos projets avec des solutions sur mesure.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-mer-esterel")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL NICE */}
            <article id="cl-nice" className="card-location">
              <div className="card-header">
                <h2>CL NICE</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale de Nice" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Services bancaires complets</li>
                  <li>Gestion de patrimoine</li>
                  <li>Crédits et assurances</li>
                </ul>
                <p>
                  La Caisse Locale de Nice vous offre une expertise bancaire reconnue 
                  et un accompagnement de qualité au cœur de la métropole niçoise.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-nice")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL PAYS DES PAILLONS */}
            <article id="cl-pays-paillons" className="card-location">
              <div className="card-header">
                <h2>CL PAYS DES PAILLONS</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale Pays des Paillons" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes et cartes</li>
                  <li>Épargne et placements</li>
                  <li>Crédits particuliers et professionnels</li>
                </ul>
                <p>
                  Au service du Pays des Paillons, notre équipe vous propose des solutions 
                  bancaires adaptées à votre quotidien.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-pays-paillons")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL PAYS DE GRASSE */}
            <article id="cl-pays-grasse" className="card-location">
              <div className="card-header">
                <h2>CL PAYS DE GRASSE</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale Pays de Grasse" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Gestion de comptes</li>
                  <li>Solutions de financement</li>
                  <li>Assurances et prévoyance</li>
                </ul>
                <p>
                  Dans le pays de Grasse, notre caisse locale vous accompagne avec 
                  expertise et proximité pour tous vos besoins bancaires.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-pays-grasse")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL PAYS DE SISTERON */}
            <article id="cl-pays-sisteron" className="card-location">
              <div className="card-header">
                <h2>CL PAYS DE SISTERON</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={banner} alt="Caisse Locale Pays de Sisteron" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes et épargne</li>
                  <li>Crédits immobiliers</li>
                  <li>Conseils patrimoniaux</li>
                </ul>
                <p>
                  La Caisse Locale du Pays de Sisteron vous offre un service de proximité 
                  et des solutions bancaires adaptées à vos projets.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-pays-sisteron")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL SEYNE LES ALPES */}
            <article id="cl-seyne" className="card-location">
              <div className="card-header">
                <h2>CL SEYNE LES ALPES</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={banner} alt="Caisse Locale Seyne les Alpes" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Services bancaires de proximité</li>
                  <li>Épargne et placements</li>
                  <li>Crédits et assurances</li>
                </ul>
                <p>
                  Au cœur des Alpes, notre caisse vous accompagne au quotidien avec 
                  des solutions adaptées à la montagne et à votre vie locale.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-seyne")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL TOULON */}
            <article id="cl-toulon" className="card-location">
              <div className="card-header">
                <h2>CL TOULON</h2>
                <span className="badge">Var</span>
              </div>
              <img src={banner} alt="Caisse Locale de Toulon" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Gestion de comptes et épargne</li>
                  <li>Crédits immobiliers et consommation</li>
                  <li>Assurances habitation et auto</li>
                </ul>
                <p>
                  La Caisse Locale de Toulon vous propose une gamme complète de services 
                  bancaires dans la métropole toulonnaise.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-toulon")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL VALLÉE DE LA SIAGNE */}
            <article id="cl-vallee-siagne" className="card-location">
              <div className="card-header">
                <h2>CL VALLÉE DE LA SIAGNE</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale Vallée de la Siagne" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Comptes et cartes bancaires</li>
                  <li>Solutions d'épargne</li>
                  <li>Crédits et financements</li>
                </ul>
                <p>
                  Dans la vallée de la Siagne, notre équipe vous accompagne avec 
                  professionnalisme et proximité pour tous vos projets.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-vallee-siagne")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL VALENSOLE GRÉOUX */}
            <article id="cl-valensole" className="card-location">
              <div className="card-header">
                <h2>CL VALENSOLE GRÉOUX</h2>
                <span className="badge">Alpes-de-Haute-Provence</span>
              </div>
              <img src={banner} alt="Caisse Locale Valensole Gréoux" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Gestion de patrimoine</li>
                  <li>Épargne et placements</li>
                  <li>Crédits immobiliers</li>
                </ul>
                <p>
                  Entre plateau de Valensole et Gréoux-les-Bains, notre caisse vous offre 
                  un accompagnement personnalisé et des solutions bancaires adaptées.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-valensole")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>

            {/* CL VENCE */}
            <article id="cl-vence" className="card-location">
              <div className="card-header">
                <h2>CL VENCE</h2>
                <span className="badge">Alpes-Maritimes</span>
              </div>
              <img src={banner} alt="Caisse Locale de Vence" />
              <div className="card-body">
                <h4>Services disponibles :</h4>
                <ul>
                  <li>Services bancaires complets</li>
                  <li>Conseils en investissement</li>
                  <li>Assurances et prévoyance</li>
                </ul>
                <p>
                  La Caisse Locale de Vence vous accueille pour répondre à tous vos besoins 
                  bancaires avec un service de qualité et une expertise reconnue.
                </p>
                <div className="btn-info">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleOpenModal("cl-vence")}
                    aria-haspopup="dialog"
                  >
                    Infos Supplémentaires
                  </button>
                </div>
              </div>
            </article>
          </section>
        </main>

        {/* ========== FOOTER ========== */}
        <footer>
          <div className="footer-content">
            <p>© 2026 Crédit Agricole - Tous droits réservés</p>
            <div className="footer-links">
              <a href="#mentions">Mentions légales</a>
              <a href="#confidentialite">Confidentialité</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}