
"use client"
import { useEffect, useRef, useState } from 'react';
import GetWeeks from '../Functions/GetWeeks';
import styles from '../src/app/styles/custom.module.css'
import DayPicked from '@/app/states/daypicked'
import Button_WeekDays from './Button_WeekDays';
import AreaChartComp from './AreaChart';
import AllTransactions from '@/app/states/AllTransactions';
import CalendarView from '@/app/states/CalendarView';
import TransactionBox from './TransactionBox';

const Container_Top = () => {
    
    let CalView = CalendarView()
    let Weeks = GetWeeks()

    const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let Transactions = AllTransactions()


    const DaySelected = DayPicked()
    const todayRef = useRef(null);
    const [MasterArrayData, setMasterArrayData] = useState()

    useEffect(() => {
        let y = new Date()
        DaySelected.setDay(y.toDateString())
    }, [])

    function groupByMonth(weeklyData) {

        //Change this function so that if first day of month is wed adds 3 days so the array on "monday"
        const monthlyData = {};
      
        // Iterate each week
        for (const week of weeklyData) {
          for (const day of week) {
            const monthKey = `${day.Date.getFullYear()}-${(day.Date.getMonth() + 1).toString().padStart(2, '0')}`;
      
            // Initialize the array for the month if it doesn't exist
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = [];
            }
      
            // Add the day's data to the correct month
            monthlyData[monthKey].push(day);
          }
        }
      
        // Convert the object to an array of months
        return Object.values(monthlyData);
      }
      

      
  
    useEffect(() => {
        
        let DatesArray 
        
        
        CalView.WeekView ? DatesArray = Weeks : DatesArray = groupByMonth(Weeks)

        if(Weeks.length >= 1 && Transactions.Transactions?.length >= 1){    
            let tempMa = DatesArray
            DatesArray.map((Week, Index) => {
                let SectionedTransactions = []
                Week.map(day => {
                    //Induvidual Days
                    let dayTransactions = []
                    let formdate = new Date(day.Date)
                    formdate.setHours(0, 0, 0, 0); 
                    let tempar = [] 
                    let total = 0
                    if(Transactions.Transactions){
                        Transactions.Transactions.map(e => {
                            let temp = new Date(e.Date)
                            if(temp.getTime() <= formdate.getTime()) tempar.push(e)
                            if(temp.getTime() === formdate.getTime()) {SectionedTransactions.push(e) ; dayTransactions.push(e)}
                        })

                        //Tempar is all transaction before specific date
                        if(tempar?.length >= 1){
                            tempar.map(e => {
                            if(e.In === true){
                                let totalspend = e.Amount - e.Amount*(e.SavePercent/100)
                                let t = totalspend/e.SaveOverDays
                                total = total + t
                            }else{
                                total = total + e.Amount
                            }
                            })
                            
                        }
                    }

                    let man = tempMa[Index].findIndex((e) => {
                        let DayDate = new Date(e.Date);
                        DayDate.setHours(0, 0, 0, 0); //
                        return DayDate.getTime() === formdate.getTime();
                    })
                    tempMa[Index][man] = {Date: tempMa[Index][man].Date , Day: tempMa[Index][man].Day, Amount: Number(total).toFixed(0), Transactions: dayTransactions}
                })

                
                tempMa[Index][99] = SectionedTransactions
            })

        setMasterArrayData(tempMa)
        console.log("47563 Master", tempMa)
        }else{
        setMasterArrayData(DatesArray)
        }
      
    }, [Transactions.Transactions, CalView.WeekView])


    useEffect(() => {
        if(todayRef?.current != null && MasterArrayData) {
                todayRef.current.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' });
        }
    }, [DaySelected.Date, MasterArrayData, CalView.WeekView])

    return(
        <div className={styles.ContainerWeekRoot}>
            {MasterArrayData?.length >= 1 && MasterArrayData.map(We => {
                console.log("34534", We)
                let NewMonth = false
                We.map((e, Index) => {if(Index != 99 && e.Date.getDate() === 1){NewMonth = true}})
                
                    //Adding filler days at start of the month so days of the week align right
                let fillerDays = 0
                let fillerDaysDivs = []
                if(!CalView.WeekView && We[0].Date.getDay() != 0){ fillerDays = We[0].Date.getDay() - 1 }else if(!CalView.WeekView){ fillerDays = 6 }
                for(let i = 0; i < fillerDays; i++){fillerDaysDivs.push(<div className={styles.ButtonWeekDayN}/>)}

                return(
                    <div key={Math.random()} className={styles.IndividualWeeks}>
                        <div style={{backgroundColor: 'white', borderRadius: '10px', padding: '20px 0px'}}>
                        <p style={{color: 'black', zIndex: 2, textAlign: 'center'}}>{MonthNames[We[0]?.Date.getMonth()]}</p>
                        {CalView.WeekView && <AreaChartComp Data={We}/>}
                        <div className={styles.IndividualWeeksButtonContainerFull} style={{zIndex: 2}}>
                            {fillerDaysDivs}
                            {We.map((x, Index) => { 
                                if(Index != 99){      
                                    return(<Button_WeekDays Amount={x.Amount} key={x.Date.toDateString()} re={todayRef} info={x}/>)}
                                }
                            )}
                        </div>
                        
                        </div>

                    </div>
                    )
                    
            })}
        </div>
    )
}

export default Container_Top