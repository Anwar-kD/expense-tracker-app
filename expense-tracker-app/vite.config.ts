import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  define: {
    "process.env": process.env,
    "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
      "AIzaSyAPcxJpJbydwymK7Ccjal80nfdN-Wso68c"
    ),
    "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
      "expense-tracker-app-d1df7.firebaseapp.com"
    ),
    "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
      "expense-tracker-app-d1df7"
    ),
    "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
      "expense-tracker-app-d1df7.firebasestorage.app"
    ),
    "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID":
      JSON.stringify("28213396867"),
    "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(
      "1:28213396867:web:1baef70f6483b63a1922b6"
    ),
    "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID":
      JSON.stringify("G-47DFMPYC02"),
  },
});
