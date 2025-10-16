
const PREFIX = 'ts:'; 
function safeStorage() {
  try {
    const testKey = '__storagetest__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch {
    
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
  
  get(key, fallback = null) {
    try {
      const raw = ls.getItem(k(key));
      if (raw == null) return fallback;
      try {
        return JSON.parse(raw);
      } catch {
       
        return raw;
      }
    } catch {
      return fallback;
    }
  },

  
  set(key, value) {
    try {
      ls.setItem(k(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  
  remove(key) {
    try { ls.removeItem(k(key)); } catch {}
  },

  
  has(key) {
    try { return ls.getItem(k(key)) !== null; } catch { return false; }
  },

  
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
