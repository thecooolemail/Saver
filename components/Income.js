"use client"
import Transactions from "@/app/states/transactions"
import { v4 } from "uuid"

import { useEffect, useState,useRef } from "react"

const Income = () => {

let Trans = Transactions()

let Datepicker = useRef()
let Datepicker2 = useRef()
let Description = useRef()
let Amount = useRef()
let SavePer = useRef()

const [Amounts, setAmounts] = useState()
const [Percents, setPercents] = useState()
const [DateGots, setDateGots] = useState()
const [Datetills, setDatetills] = useState()

const [dailyLimit, setdailyLimit] = useState()
const [days, setdays] = useState()
const [save, setsave] = useState()
const [cancalc, setcancalc] = useState()

useEffect(() => {
    var local = new Date();
    setDateGots(local.toJSON().slice(0,10))
    setDatetills(local.toJSON().slice(0,10))
}, [])

const AddIt = (e) => {
    e.preventDefault()
    let trans = localStorage.getItem("Transactions")
    console.log(trans)
    console.log("Des", Description.current.value)
    console.log(Amount.current.value)
    let format = {Description: Description.current.value, Amount: Amount.current.value, Date: new Date(DateGots), SpendTill: new Date(Datetills), Days:days, SavePercent:Percents, DailyBudget: dailyLimit, Income: true, Id: v4()}
    if(trans === null){
        let ar = []
        ar.push(format)
        Trans.setTransArray(ar)
        localStorage.setItem("Transactions", JSON.stringify(ar))
    }else{
        console.log(trans)
        let y = JSON.parse(trans)
        y.push(format)
        Trans.setTransArray(y)
        localStorage.setItem("Transactions", JSON.stringify(y))
    }
}

useEffect(() => {
    console.log(DateGots, Datetills)
    if(Amounts && Percents && DateGots && Datetills && DateGots != Datetills){
        setcancalc(true)
        const StartDate = new Date(DateGots);
        const EndDate = new Date(Datetills);
        const differenceInTime = EndDate - StartDate; // Difference in milliseconds
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
        setdays(differenceInDays)

        let x = Amounts - (Amounts * (Percents/100))
        setsave(Number(Amounts - x).toFixed(2))
        setdailyLimit(Number(x/differenceInDays).toFixed(2))
        console.log("Amount you can spend : ", x)
        console.log("Days you have to spend : ", differenceInDays)
    }else{
        setcancalc(false)
    }

}, [Percents, Amounts, DateGots, Datetills])

    return(
        <div>
        <form onSubmit={AddIt} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0px', flexWrap: 'wrap'}}>
            <p style={{padding: '10px 0px', paddingRight: '10px', fontFamily: 'ariel',fontWeight: '1000', WebkitTextStroke: '2px',marginTop: '-2px'}}>+</p>
            <input ref={Description} required placeholder="Description" style={{width: '150px'}}></input>
            <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                <p>£</p>
                <input ref={Amount} onChange={(x) => setAmounts(x.target.value)} required type="number" placeholder="Amount" style={{width: '100px'}}></input>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                <p>%</p>
                <input ref={SavePer} onChange={(x) => setPercents(x.target.value)} required type="number" min="0" max="100" placeholder="Save" style={{width: '50px'}}></input>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'row', gap: '0px'}}>
                <p>{`Date:`}</p>
                <input style={{width: '105px'}} required onClick={() => Datepicker.current.showPicker()} onChange={(x) => setDateGots(x.target.value)} ref={Datepicker} type="date" value={DateGots}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', gap: '0px'}}>
                <p>{`Spend Till:`}</p>
                <input style={{width: '105px'}} required onClick={() => Datepicker2.current.showPicker()} onChange={(x) => setDatetills(x.target.value)} ref={Datepicker2} type="date" value={Datetills}/>
            </div>

            <p style={{display: cancalc ? "flex": 'none', marginRight: '20px', opacity: '0.6'}}>Save £{save} | Spend £{Amounts - save} (£{dailyLimit} PerDay over {days}day(s))</p>
            <button>Add Income</button>
        </form>
        </div>
    )
}

export default Income