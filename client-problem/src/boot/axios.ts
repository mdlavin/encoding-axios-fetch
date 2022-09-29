import { boot } from 'quasar/wrappers';
import Axios, { AxiosInstance } from 'axios';
import { Response } from 'cross-fetch';
globalThis.Response = Response;
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default boot(async ({ app }) => {
  const axios = Axios.create({ baseURL: process.env.API_URL });
  // axios.defaults.withCredentials = true;
  if (process.env.PROD) {
    await axios.get(`${process.env.API_URL}/auth/csrf-token`);
  }
  app.provide('axios', axios);
});
