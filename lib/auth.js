export function getStoredUser() {
    if (typeof window === "undefined") return null;
  
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  
  export function storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  export function clearUser() {
    localStorage.removeItem("user");
  }
  