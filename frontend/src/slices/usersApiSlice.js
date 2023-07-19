import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

//  Injecting endPoint to apiSlice (Parent slice)
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // passing data to the auth endpoint
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
