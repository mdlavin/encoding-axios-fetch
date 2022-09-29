<template>
  <q-page class="row items-center justify-evenly">
    <ul>
      <li>axios: {{axiosResult.data.data.users[0].meta['fr']}}</li>
      <li>urql: {{urqlResult.users[0].meta['fr']}}</li>
      <li>myFetch: {{myFetchResult.data.users[0].meta['fr']}}</li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import {  useQuery } from '@urql/vue';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.API_URL
});
const myFetch = buildAxiosFetch(axios);
const data = {
  query: `
  query users(
  $cursor: UserWhereUniqueInput
  $distinct: [UserScalarFieldEnum!]
  $orderBy: [UserOrderByWithRelationInput!]
  $skip: Int
  $take: Int
  $where: UserWhereInput
) {
  users(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    name
    meta
  }
}
  `
}
const axiosResult = await axios.post('/graphql', data);
const { data: urqlResult } = await useQuery({
  query: data.query
})
const endpoint = process.env.API_URL + '/graphql';
const headers = {
	'content-type': 'application/json'
};
const graphqlQuery = {
    'operationName': 'users',
    'query': data.query,
    'variables': {}
};

const options = {
    'method': 'POST',
    'headers': headers,
    'body': JSON.stringify(graphqlQuery)
};

const response = await myFetch(endpoint, options);
const myFetchResult = await response.json();
</script>
