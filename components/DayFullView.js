"use client"
import DayPicked from '@/app/states/daypicked'
import styles from '../src/app/styles/custom.module.css'
import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import Container_Add from './Container_Add'
import AllTransactions from '@/app/states/AllTransactions'
import TransactionBox from './TransactionBox'

const DayFullView = ({info, re, scrolling}) => {

    let Transactions = AllTransactions()
    const [dayTrans, setdayTrans] = useState()


    useEffect(() => {
        let formdate = new Date(info.Date)
        formdate.setHours(0, 0, 0, 0); 
        let tempar = [] 
        if(Transactions.Transactions){
            Transactions.Transactions.map(e => {
                let temp = new Date(e.Date)
                if(temp.getTime() === formdate.getTime()) tempar.push(e)
            })
            setdayTrans(tempar)
        }
    }, [Transactions.Transactions])

    const DaySelected = DayPicked()    

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
      });

      useEffect(() => {
        
        if(scrolling === false && inView === true){
            DaySelected.setFullDayScroll(info.Date.toDateString())
        }
      }, [scrolling, inView])
//{info.Date.toDateString()}
      

    return(
        <div  className={styles.DayFullViewRoot} ref={DaySelected.Date === info.Date.toDateString() ? re : null}>
                {dayTrans?.map(e => {
                    return(
                        <TransactionBox key={e.UUID} Info={e}/>
                    )
                })}
            <p ref={ref}></p>
        </div>
    )
}

export default DayFullView