import { create } from 'zustand'

//Every time this is changed every component it is called in is refreshed e.g Apollo Client
const Transactions = create((set) => ({
    TransArray: undefined,  
    setTransArray: (state) => set(() => ({ TransArray: state })),
}))

export default Transactions;