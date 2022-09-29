import { boot } from 'quasar/wrappers';
import urql, {
  createClient as createUrqlClient,
  dedupExchange,
  makeOperation,
  Exchange,
} from '@urql/vue';
import { cacheExchange } from '@urql/exchange-graphcache';

import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import Axios from 'axios';

import { devtoolsExchange } from '@urql/devtools';

export default boot(async ({ app }) => {
  const axios = Axios.create({
    baseURL: `${process.env.API_URL}`,
  });
  // axios.defaults.withCredentials = true;

  const exchanges: Exchange[] = [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({}),

    multipartFetchExchange,
  ];

  const client = createUrqlClient({
    fetch: buildAxiosFetch(axios) as unknown as typeof fetch,
    url: `${process.env.API_URL}/graphql`,
    requestPolicy: 'cache-and-network',
    exchanges,
  });
  app.use(urql, client);
});
