export default function ({ store, redirect, app }) {
    // Hier kannst du prüfen, ob ein Token vorhanden ist
    // Beispiel mit localStorage (für Client-seitige Middleware)
    if (process.client) {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        // Wenn kein Token vorhanden ist, umleiten zur Login-Seite
        redirect('/login');
      }
    }
  }
  