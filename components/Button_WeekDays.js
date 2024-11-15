"use client"
import DayPicked from '@/app/states/daypicked'
import styles from '../src/app/styles/custom.module.css'

const Button_WeekDays = ({info, re, Amount, FullView}) => {
   
    const DaySelected = DayPicked()

    console.log("324", info)
      
    return(
        <div id={info.Date.getDate()} onClick={() => {DaySelected.setFullDayScroll(undefined) ; DaySelected.setDay(info.Date.toDateString())}} className={DaySelected.Date === info.Date.toDateString() ? styles.ButtonWeekDaySelectedN : styles.ButtonWeekDayN} ref={DaySelected.Date === info.Date.toDateString() ? re : null}>
            <b style={{textAlign: 'center', whiteSpace: 'nowrap', display: Amount === undefined ? 'none' : 'block'}}>{Amount >= 0 ? "" : "-"}£{Math.abs(Number(Amount)).toFixed(0)}</b>
            <b style={{textAlign: 'center', whiteSpace: 'nowrap', display: Amount ? 'none' : 'block'}}>£0</b>
            <small style={{textAlign: 'center', whiteSpace: 'nowrap'}}>{info.Day} {info.Date.getDate()}</small>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '3px'}}>
                {info.Transactions?.map(x => {
                    return(<div key={x?.UUID} style={{height: '5px', aspectRatio: '1/1', backgroundColor: x.In ? '#35C759' : "#FF3B2F", borderRadius: '100px'}}/>)
                })}
            </div>
                
        </div>
    )
}

export default Button_WeekDays
