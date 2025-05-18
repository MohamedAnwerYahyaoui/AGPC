AGPC - Gestion des Ressources 📦✨

AGPC (Automated Graph-based Pathfinding Controller) 
🛠️ - Branche Ressource : un système de gestion des ressources avec des modules pour Fournisseur, Matériel, Stock, Commande, et Facture, enrichi d'animations pour une interface dynamique.

📋 Fonctionnalités
🧑‍💼 Fournisseur

📧 Nom suggéré via e-mail
🌍 Pays détecté par numéro (+217 → Tunis)
📲 QR code généré pour chaque fournisseur
🔄 Option : Export CSV/JSON

🛠️ Matériel

🤖 Catégorie suggérée par IA
💹 Prix réel via API boursière
⭐ Recommandations IA pour matériels similaires
📊 Option : Graphiques de tendances

📦 Stock

🛒 Panier auto si quantité < seuil
📈 Statistiques sur stocks
🚨 Option : Alertes e-mail pour stocks critiques

📋 Commande

📊 Stats par statut (en attente, en cours, livré)
🗺️ Carte interactive avec ID et coordonnées
🔎 Option : Filtrage par date/statut

💳 Facture

💸 Paiement via PayPal/carte bancaire pour commandes livrées
📄 Facture PDF téléchargeable
🎨 Option : Personnalisation des factures

🎥 Animation

🌟 Animations fluides pour les transitions d'interface (ex. chargement des stats, affichage des cartes)
📊 Graphiques animés avec matplotlib ou seaborn
🖱️ Interactions dynamiques (ex. survol des QR codes)


⚙️ Prérequis
📦 Pip & dépendances : pandas, networkx, matplotlib, qrcode, requests, folium, reportlab, stripe, scikit-learn, pytest
🌐 Git
🔑 Clés API (PayPal, Stripe, géolocalisation)


🛠️ Installation

Cloner : git clone https://github.com/MohamedAnwerYahyaoui/AGPC/tree/Ressource


📂 Structure
AGPC/
├── config/       # 📝 Données (data.json)
├── src/          # 🖥️ Code
│   ├── fournisseur.py  # 🧑‍💼
│   ├── materiel.py    # 🛠️
│   ├── stock.py       # 📦
│   ├── commande.py    # 📋
│   ├── facture.py     # 💳
│   ├── utils/         # ⚙️
│   └── main.py        # 🚀
├── tests/        # ✅ Tests
├── outputs/      # 📈 Résultats
└── README.md     # 📖


🤝 Contribution

Forker 🍴
Branche : git checkout -b ma-fonctionnalite
Pull request 📬


📜 Licence
MIT 📄

📬 Contact

👤 Kouki Farah
🌐 GitHub : [https://github.com/MohamedAnwerYahyaoui/AGPC/tree/Ressource](https://github.com/farahkouki)

🎉 Merci d'utiliser AGPC !
