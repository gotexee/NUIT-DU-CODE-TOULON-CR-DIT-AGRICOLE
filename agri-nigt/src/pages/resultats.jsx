import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Couleurs Crédit Agricole
const CA_COLORS = {
  vertPrimaire: "#00844A",
  vertSecondaire: "#52A05E", 
  noir: "#1A1A1A",
  gris: "#4A4A4A",
  grisClair: "#F5F5F5",
  blanc: "#FFFFFF"
}; 

// Icônes personnalisées selon le statut
const createCustomIcon = (status) => {
  const colors = {
    "en cours": CA_COLORS.vertPrimaire,
    "à venir": CA_COLORS.vertSecondaire,
    urgent: "#D32F2F",
  };
  
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${colors[status]}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
};

// Données simulées pour Toulon
const projetsInitiaux = [
  {
    id: 1,
    titre: "Rénovation école Jean Aicard",
    description: "Travaux de rénovation des classes",
    status: "en cours",
    lat: 43.1242,
    lng: 5.9280,
    impact: 85,
    budget: "450 000€"
  },
  {
    id: 2,
    titre: "Piste cyclable Corniche",
    description: "Création d'une piste cyclable sur la corniche",
    status: "à venir",
    lat: 43.1050,
    lng: 5.9250,
    impact: 70,
    budget: "280 000€"
  },
  {
    id: 3,
    titre: "Aide alimentaire Centre-Ville",
    description: "Distribution alimentaire d'urgence",
    status: "urgent",
    lat: 43.1242,
    lng: 5.9280,
    impact: 95,
    budget: "50 000€"
  },
  {
    id: 4,
    titre: "Jardin partagé Mourillon",
    description: "Création d'un jardin communautaire",
    status: "en cours",
    lat: 43.1100,
    lng: 5.9350,
    impact: 60,
    budget: "120 000€"
  },
  {
    id: 5,
    titre: "Réparation Mairie annexe",
    description: "Travaux urgents suite aux intempéries",
    status: "urgent",
    lat: 43.1200,
    lng: 5.9200,
    impact: 50,
    budget: "180 000€"
  },
];

const resultats = () => {
  const [projets, setProjets] = useState(projetsInitiaux);
  const [filtreActif, setFiltreActif] = useState("tous");

  // Calculs des statistiques
  const enCours = projets.filter(p => p.status === "en cours");
  const aVenir = projets.filter(p => p.status === "à venir");
  const urgents = projets.filter(p => p.status === "urgent");
  
  const impactGlobal = projets.length > 0
    ? projets.reduce((acc, p) => acc + p.impact, 0) / projets.length
    : 0;

  const budgetTotal = projets.reduce((acc, p) => {
    const montant = parseInt(p.budget.replace(/[^0-9]/g, ''));
    return acc + montant;
  }, 0);

  const projetsFiltres = filtreActif === "tous" 
    ? projets 
    : projets.filter(p => p.status === filtreActif);

  // Données pour le graphique
  const categoriesImpact = [
    { nom: "En cours", valeur: enCours.length, couleur: CA_COLORS.vertPrimaire },
    { nom: "À venir", valeur: aVenir.length, couleur: CA_COLORS.vertSecondaire },
    { nom: "Urgent", valeur: urgents.length, couleur: "#D32F2F" }
  ];

  const maxCategorie = Math.max(...categoriesImpact.map(c => c.valeur));

  return (
    <>
      <Nav />
      <div style={{ 
        minHeight: "100vh", 
        background: CA_COLORS.grisClair,
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        {/* En-tête */}
        <header style={{ 
          background: CA_COLORS.vertPrimaire,
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ 
            color: CA_COLORS.blanc, 
            fontSize: "2rem", 
            fontWeight: "600",
            margin: 0
          }}>
            Territoire de Toulon
          </h1>
          <p style={{ 
            color: "rgba(255,255,255,0.9)", 
            fontSize: "0.9rem",
            margin: "0.5rem 0 0 0"
          }}>
            {projets.length} projets actifs
          </p>
        </header>

        {/* Statistiques */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            background: CA_COLORS.blanc,
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderTop: `3px solid ${CA_COLORS.vertPrimaire}`
          }}>
            <p style={{ 
              color: CA_COLORS.gris, 
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              fontWeight: "500"
            }}>
              Impact moyen
            </p>
            <p style={{ 
              fontSize: "2rem", 
              fontWeight: "600",
              color: CA_COLORS.noir,
              margin: 0
            }}>
              {impactGlobal.toFixed(0)}%
            </p>
          </div>

          <div style={{
            background: CA_COLORS.blanc,
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderTop: `3px solid ${CA_COLORS.vertPrimaire}`
          }}>
            <p style={{ 
              color: CA_COLORS.gris, 
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              fontWeight: "500"
            }}>
              Budget total
            </p>
            <p style={{ 
              fontSize: "2rem", 
              fontWeight: "600",
              color: CA_COLORS.noir,
              margin: 0
            }}>
              {(budgetTotal / 1000).toFixed(0)}K€
            </p>
          </div>

          <div style={{
            background: CA_COLORS.blanc,
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderTop: `3px solid #D32F2F`
          }}>
            <p style={{ 
              color: CA_COLORS.gris, 
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              fontWeight: "500"
            }}>
              Besoins urgents
            </p>
            <p style={{ 
              fontSize: "2rem", 
              fontWeight: "600",
              color: CA_COLORS.noir,
              margin: 0
            }}>
              {urgents.length}
            </p>
          </div>
        </div>

        {/* Graphique et Carte */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {/* Graphique */}
          <div style={{ 
            background: CA_COLORS.blanc, 
            borderRadius: "8px", 
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ 
              fontSize: "1.2rem", 
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: CA_COLORS.noir
            }}>
              Répartition des projets
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {categoriesImpact.map(cat => (
                <div key={cat.nom}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem"
                  }}>
                    <span style={{ color: CA_COLORS.noir, fontWeight: "500" }}>
                      {cat.nom}
                    </span>
                    <span style={{ color: CA_COLORS.gris }}>
                      {cat.valeur} projet{cat.valeur > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{
                    background: CA_COLORS.grisClair,
                    borderRadius: "4px",
                    height: "30px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${(cat.valeur / maxCategorie) * 100}%`,
                      height: "100%",
                      background: cat.couleur,
                      transition: "width 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      {cat.valeur > 0 && cat.valeur}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liste des projets */}
          <div style={{ 
            background: CA_COLORS.blanc, 
            borderRadius: "8px", 
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ 
              fontSize: "1.2rem", 
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: CA_COLORS.noir
            }}>
              Projets récents
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {projets.slice(0, 5).map(projet => {
                const couleur = projet.status === "en cours" ? CA_COLORS.vertPrimaire : 
                               projet.status === "à venir" ? CA_COLORS.vertSecondaire : "#D32F2F";
                return (
                  <div
                    key={projet.id}
                    style={{
                      padding: "0.75rem",
                      background: CA_COLORS.grisClair,
                      borderRadius: "4px",
                      borderLeft: `3px solid ${couleur}`
                    }}
                  >
                    <div style={{ 
                      fontWeight: "600", 
                      color: CA_COLORS.noir, 
                      marginBottom: "0.25rem",
                      fontSize: "0.9rem" 
                    }}>
                      {projet.titre}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: CA_COLORS.gris }}>
                      {projet.budget} • Impact: {projet.impact}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carte */}
        <div style={{ 
          background: CA_COLORS.blanc, 
          borderRadius: "8px", 
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ 
              fontSize: "1.2rem", 
              fontWeight: "600",
              marginBottom: "1rem",
              color: CA_COLORS.noir
            }}>
              Carte des projets
            </h2>
            
            {/* Filtres */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["tous", "en cours", "à venir", "urgent"].map(filtre => (
                <button
                  key={filtre}
                  onClick={() => setFiltreActif(filtre)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: `1px solid ${filtreActif === filtre ? CA_COLORS.vertPrimaire : '#DDD'}`,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    background: filtreActif === filtre ? CA_COLORS.vertPrimaire : CA_COLORS.blanc,
                    color: filtreActif === filtre ? CA_COLORS.blanc : CA_COLORS.gris,
                    transition: "all 0.2s"
                  }}
                >
                  {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <MapContainer
            center={[43.1242, 5.9280]}
            zoom={13}
            style={{ height: "450px", borderRadius: "4px", border: `1px solid #DDD` }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            {projetsFiltres.map(projet => (
              <Marker
                key={projet.id}
                position={[projet.lat, projet.lng]}
                icon={createCustomIcon(projet.status)}
              >
                <Popup>
                  <div style={{ minWidth: "200px" }}>
                    <h3 style={{ 
                      fontWeight: "600", 
                      marginBottom: "0.5rem",
                      color: CA_COLORS.noir,
                      fontSize: "1rem"
                    }}>
                      {projet.titre}
                    </h3>
                    <p style={{ 
                      fontSize: "0.85rem", 
                      color: CA_COLORS.gris,
                      marginBottom: "0.75rem"
                    }}>
                      {projet.description}
                    </p>
                    <div style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                      <p style={{margin: "0.25rem 0"}}><strong>Statut :</strong> {projet.status}</p>
                      <p style={{margin: "0.25rem 0"}}><strong>Budget :</strong> {projet.budget}</p>
                      <p style={{margin: "0.25rem 0"}}><strong>Impact :</strong> {projet.impact}%</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default resultats;