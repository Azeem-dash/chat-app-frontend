import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-api.sonart.tools",
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch nonce
export const fetchNonce = async (address) => {
  try {
    // console.log("----------here-----------",address);

    const { data } = await api.get(`/auth/${address}/nonce`);
    return data.nonce;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

// login
export const login = async (address, signature) => {
  try {
    const { data } = await api.post(`/auth/login`, { address, signature });
    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
