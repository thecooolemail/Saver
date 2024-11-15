import { create } from 'zustand'

//Every time this is changed every component it is called in is refreshed e.g Apollo Client
const DayPicked = create((set) => ({
    Date: undefined,  
    FullDayScroll: undefined,
    setFullDayScroll: (state) => set(() => ({ FullDayScroll: state })),
    setDay: (state) => set(() => ({ Date: state })),
}))

export default DayPicked;