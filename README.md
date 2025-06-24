# 💸 Expense Tracker avec Assistant IA

Un gestionnaire de dépenses personnel intelligent, développé en React + Firebase, avec intégration d’un **assistant comptable IA** (basé sur GPT-4 via l’API `@azure-rest/ai-inference`).

## ✨ Fonctionnalités principales

- 🔐 Authentification Firebase
- 💰 Ajout et suivi des transactions (revenus et dépenses)
- 📊 Calcul automatique du solde, des revenus et des dépenses
- 🤖 **Chatbot intelligent** pour analyser le budget utilisateur
- 💬 Conversation IA multi-tours avec mémoire du contexte
- 🌐 API IA connectée à `https://models.github.ai/inference`
- ☁️ Données stockées en temps réel dans Firebase Firestore

---

## 📸 Aperçu

![image](https://github.com/user-attachments/assets/3ef8fd8a-a0b1-43df-887a-d844e5a68797)



---

## 🧠 IA intégrée

L'application utilise l'API GPT-4 (ou GPT-4o) via Azure REST pour fournir des conseils budgétaires à l'utilisateur :

- Analyse des transactions passées
- Suggestions pour maximiser l’épargne
- Dialogue conversationnel (type chat GPT)
- Historique de conversation conservé côté client (`useState`)

---

## 🛠️ Stack technique

| Techno                 | Usage 
|-------------------------------------------------------
| **React** + TypeScript | Interface utilisateur moderne |
| **TailwindCSS**       | Design responsive et stylé |
| **Firebase Auth**     | Authentification utilisateur |
| **Firestore**         | Base de données temps réel |
| **Azure OpenAI API**  | Assistant IA pour analyse |
| **Vite**              | Build rapide pour développement |

---

## 📦 Installation

```bash
git clone https://github.com/ton-utilisateur/expense-tracker-ia.git
cd expense-tracker-ia
npm install
