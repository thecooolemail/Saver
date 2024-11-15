"use client"
import { useEffect, useState, useRef } from "react"
import styles from '../src/app/styles/custom.module.css'
import GetDays from "../Functions/GetDays"
import DayPicked from '@/app/states/daypicked'
import DayFullView from "./DayFullView"
import AllTransactions from "@/app/states/AllTransactions"


const Container_Days = () => {

    let Transactions = AllTransactions()

    let Days = GetDays()
    const [scrolling , setscrolling] = useState()
    

    const DaySelected = DayPicked()
    const todayRef = useRef(null);

    useEffect(() => {
            let LocalS = localStorage.getItem("Transactions")
            Transactions.setTransactions(JSON.parse(LocalS))
    }, [])


/*
    useEffect(() => {
        if(todayRef?.current != null) todayRef.current.scrollIntoView({ behavior: 'smooth'});
    }, [DaySelected])
*/



    const timerRef = useRef(null); 

    const debounce = () => {
        setscrolling(true)
        clearTimeout(timerRef.current); // Reset the timer if function is called again
        timerRef.current = setTimeout(() => {
        setscrolling(false)
        }, 200); // Fixed 2 second delay
  };


  useEffect(() => {
    if(DaySelected.Date != undefined && DaySelected.FullDayScroll != undefined){
        DaySelected.setDay(DaySelected.FullDayScroll)
    }else if(DaySelected.Date != undefined && DaySelected.FullDayScroll === undefined && todayRef?.current != null){
        todayRef.current.scrollIntoView({ behavior: 'smooth'});
    }
    
  }, [DaySelected.Date, DaySelected.FullDayScroll])



    return(
        <div onScrollCapture={(event) => debounce()} className={styles.ContainerDaysRoot} style={{zIndex: 2}} >
            {Days.map(x => {
                return(
            <DayFullView key={x.Date.toDateString()} info={x} re={todayRef} scrolling={scrolling}/>
            )
            })}
        </div>
    )
}

export default Container_Days