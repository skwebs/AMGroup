// src/store/useNetworkStore.ts
import { create } from 'zustand';

interface NetworkState {
  isConnected: boolean;
  setNetworkStatus: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true, // Default to connected
  setNetworkStatus: (status) => set({ isConnected: status }),
}));
