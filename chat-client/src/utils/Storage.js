export class Storage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const value = localStorage.getItem(key);
    if (!value) return;

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  static remove(key) {
    return localStorage.removeItem(key);
  }

  static clear() {
    return localStorage.clear();
  }
}
