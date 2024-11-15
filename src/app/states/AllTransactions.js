import { create } from 'zustand'


const AllTransactions = create((set) => ({
    Transactions: 0,  
    setTransactions: (state) => set(() => ({ Transactions: state })),
}))

export default AllTransactions;