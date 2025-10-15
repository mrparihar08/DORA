// simple wrapper for localStorage with JSON handling and errors
export function saveData(key, value) {
  try {
    const toStore = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, toStore);
    return true;
  } catch (e) {
    console.error("saveData error:", e);
    return false;
  }
}

export function loadData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    // attempt parse, but return raw string if parse fails
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (e) {
    console.error("loadData error:", e);
    return null;
  }
}

export function clearData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
