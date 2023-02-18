import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    profile_fetching: false,
    forgotPassword: false,
    resetTokenVerified: false,
    passwordChanged: false,
    resetEmail: '',
    account: {},
  };
  
  
  export const profileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      getProfile: (state, action) => {
        // state.profile_fetching = action.payload;
        state.account = action.payload;
      },
      clearProfile: state => {
        state.account = {};
      },
      forgotPasswordSuccess: state => {
        state.forgotPassword = true;
      },
      setTokenVerified: (state, action) => {
        state.resetTokenVerified = true;
        state.resetEmail = action.payload;
      },
      resetForgotPassword: state => {
        state.forgotPassword = false;
      },
      setResetTokenVerified: state => {
        state.resetTokenVerified = false;
        state.resetEmail = '';
      },
      setPasswordChanged: state => {
        state.passwordChanged = true;
      },
      clearPasswordChanged: state => {
        state.passwordChanged = false;
      },
      changeCurrency: (state, action) => {
        state.account.currency = action.payload;
      },
  
      deleteLegactyContact: (state, action) => {
        const {id} = action.payload;
        const {legacyContacts} = state.account;
        state.account.legacyContacts = legacyContacts.filter(
          item => item._id != id,
        );
      },
      toggleLegacyContactAdded: state => {
        // state.legacyContactAdd = !state.legacyContactAdd;
      },
    },
  });
  
  export const {
    getProfile,
    setTokenVerified,
    clearProfile,
    setPasswordChanged,
    clearPasswordChanged,
    changeCurrency,
    forgotPasswordSuccess,
    toggleLegacyContactAdded,
    setResetTokenVerified,
    resetForgotPassword,
    deleteLegactyContact,
  } = profileReducer.actions;
  export default profileReducer.reducer;