export const selectAuthIsSignedIn = (state) => state.auth.isSignedIn;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthUserData = (state) => state.auth.userData;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectAuthIsError = (state) => state.auth.isError;