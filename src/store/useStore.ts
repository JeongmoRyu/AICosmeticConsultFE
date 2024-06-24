import { CONNECTING_INFO } from 'data/hostInfo';
import { ManagerInfoType } from 'types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Store {
  baseURL: string;
  hostInfoName: string;
  setHostInfoName: (name: string) => void;

  managerInfo?: ManagerInfoType; // token
  setManagerInfo: (info?: { token: string; id: string }) => void;

  isLoading: boolean; // 로딩
  showLoading: () => void;
  hideLoading: () => void;
}

const hostname = window.location.hostname;
const useStore = create(
  persist<Store>(
    (set) => ({
      baseURL: CONNECTING_INFO[hostname].restful,
      hostInfoName: '',
      setHostInfoName: (name: string) => set({ hostInfoName: name }),

      managerInfo: undefined,
      setManagerInfo: (info?: ManagerInfoType) => set({ managerInfo: info }),

      isLoading: false,
      showLoading: () => set({ isLoading: true }),
      hideLoading: () => set({ isLoading: false }),
    }),
    {
      name: 'my-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useStore;
