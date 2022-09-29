import { boot } from 'quasar/wrappers';
import urql, {
  createClient as createUrqlClient,
  dedupExchange,
  Exchange,
} from '@urql/vue';
import { cacheExchange } from '@urql/exchange-graphcache';

import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import Axios from 'axios';

export default boot(async ({ app }) => {
  const axios = Axios.create({
    baseURL: `${process.env.API_URL}`,
  });

  const exchanges: Exchange[] = [
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
