// import {create} from 'zustand';

// const useAuthStore = create(set => ({
//   isAuthenticated: null, // `null` indicates the initial loading state
//   setAuthenticated: status => set({isAuthenticated: status}),
// }));

// export default useAuthStore;
import {create} from 'zustand';

const useAuthStore = create(set => ({
  isAuthenticated: null,
  user: null, // Store user info (e.g., name, email, etc.)
  token: null, // Store token (if needed)
  setAuthenticated: status => set({isAuthenticated: status}),
  setUser: userData => set({user: userData}),
  setToken: token => set({token}),
  resetAuth: () => set({isAuthenticated: false, user: null, token: null}), // Reset auth on logout
}));

export default useAuthStore;
