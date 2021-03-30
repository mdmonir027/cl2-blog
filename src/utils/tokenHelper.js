import jwtDecode from "jwt-decode";

const token = {
  decode(token) {
    return jwtDecode(token);
  },
};

export default token;
