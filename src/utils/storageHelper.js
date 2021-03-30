const storage = {
  tokenName: "auth__token",
  setToken(token) {
    localStorage.setItem(this.tokenName, token);
  },
  getToken() {
    return localStorage.getItem(this.tokenName);
  },
  clearToken() {
    localStorage.removeItem(this.tokenName);
  },
};

export default storage;
