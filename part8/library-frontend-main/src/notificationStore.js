import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  error: '',
  info: '',
  setError: (msg) => {
    set({ error: msg, info: '' })
    setTimeout(() => set({ error: '', info: '' }), 4000)
  },
  setInfo: (msg) => {
    set({ error: '', info: msg }),
      setTimeout(() => set({ error: '', info: '' }), 4000)
  },
}))

export default useNotificationStore
