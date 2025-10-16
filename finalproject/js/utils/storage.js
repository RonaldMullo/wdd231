// js/utils/storage.js
const PREFIX = 'ts:'; // Terrasol / tu proyecto
function safeStorage() {
  try {
    const testKey = '__storagetest__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch {
    // Fallback no-op (SSR o storage bloqueado)
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      get length() { return 0; }
    };
  }
}
const ls = safeStorage();

function k(key) { return `${PREFIX}${key}`; }

export const storage = {
  /** Lee y parsea JSON si es posible; si falla, retorna el string crudo. */
  get(key, fallback = null) {
    try {
      const raw = ls.getItem(k(key));
      if (raw == null) return fallback;
      try {
        return JSON.parse(raw);
      } catch {
        // No era JSON; devuelve valor tal cual (útil si guardaste strings simples)
        return raw;
      }
    } catch {
      return fallback;
    }
  },

  /** Guarda como JSON. Retorna true si se pudo persistir. */
  set(key, value) {
    try {
      ls.setItem(k(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /** Elimina una clave. */
  remove(key) {
    try { ls.removeItem(k(key)); } catch {}
  },

  /** ¿Existe la clave? */
  has(key) {
    try { return ls.getItem(k(key)) !== null; } catch { return false; }
  },

  /** Limpia solo las claves con el PREFIJO (no todo el localStorage). */
  clear() {
    try {
      const toDelete = [];
      for (let i = 0; i < ls.length; i++) {
        const name = ls.key(i);
        if (name && name.startsWith(PREFIX)) toDelete.push(name);
      }
      toDelete.forEach(n => ls.removeItem(n));
    } catch {}
  },

  /** Lista las claves (sin el prefijo). */
  keys() {
    const out = [];
    try {
      for (let i = 0; i < ls.length; i++) {
        const name = ls.key(i);
        if (name && name.startsWith(PREFIX)) out.push(name.slice(PREFIX.length));
      }
    } catch {}
    return out;
  }
};
