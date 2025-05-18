AGPC - Gestion des Ressources 📦✨
AGPC (Automated Graph-based Pathfinding Controller) - Branche Ressource : un système de gestion des ressources avec des modules pour Fournisseur, Matériel, Stock, Commande, et Facture, enrichi d'animations pour une interface dynamique. Écrit en 🐍 Python.

📋 Fonctionnalités
🧑‍💼 Fournisseur

📧 Nom suggéré via e-mail
🌍 Pays détecté par numéro (+33 → France)
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

🐍 Python 3.8+
📦 Pip & dépendances : pandas, networkx, matplotlib, qrcode, requests, folium, reportlab, stripe, scikit-learn, pytest
🌐 Git
🔑 Clés API (PayPal, Stripe, géolocalisation)


🛠️ Installation

Cloner : git clone https://github.com/MohamedAnwerYahyaoui/AGPC.git && cd AGPC && git checkout Ressource
Environnement : python -m venv venv && source venv/bin/activate
Dépendances : pip install -r requirements.txt
Tester : python -m pytest tests/


🚀 Utilisation

Configurer config/data.json (fournisseurs, matériels, stocks)
Lancer : python src/main.py --module gestion_ressources
Exemples :
QR code : python src/fournisseur.py --action generate_qr --fournisseur_id 1
Stats stock : python src/stock.py --action stats
Payer : python src/facture.py --commande_id 123 --payment_method paypal



📂 Sorties : QR codes, graphiques, factures dans outputs/

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
Tester : python -m pytest tests/
Pull request 📬


📜 Licence
MIT 📄

📬 Contact

👤 Kouki Farah
🌐 GitHub : https://github.com/MohamedAnwerYahyaoui/AGPC/tree/Ressource

🎉 Merci d'utiliser AGPC !
