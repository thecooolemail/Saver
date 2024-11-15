import { create } from 'zustand'


const CalendarView = create((set) => ({
    WeekView: true,
    setView: (state) => set(() => ({ WeekView: state })),
}))

export default CalendarView;