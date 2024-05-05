import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ page = 1, name = '', status = '', species = '', type = '', gender = '' }) => {
        let url = `/character?page=${page}`;
        if (name) url += `&name=${name}`;
        if (status) url += `&status=${status}`;
        if (species) url += `&species=${species}`;
        if (type) url += `&type=${type}`;
        if (gender) url += `&gender=${gender}`;
        return url;
      }
    }),
    getProfile: builder.query({
      query: (id) => `/character/${id}`
    }),
    getLocations: builder.query({
      query: () => '/location'
    }),
    getLocation: builder.query({
      query: (id) => `/location/${id}`
    }),
    getEpisodes: builder.query({
      query: () => `/episode`
    }),
    getEpisode: builder.query({
      query: (id) => `/episode/${id}`
    }),
  })
})

export const { useGetCharactersQuery, useGetProfileQuery, useGetLocationsQuery, useGetLocationQuery, useGetEpisodesQuery, useGetEpisodeQuery } = rickMortyApi;