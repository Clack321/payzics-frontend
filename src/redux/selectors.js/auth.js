import { createSelector } from '@reduxjs/toolkit'

const selectCurrentUser = (state) => state?.auth?.user
const selectToken = (state) => state?.auth?.token

export const isAuthenticated = createSelector((state) => selectToken(state), token => !!token);

export const getUser = createSelector((state) => selectCurrentUser(state), user => user);