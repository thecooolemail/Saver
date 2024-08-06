"use client"
import Transactions from "@/app/states/transactions"
import { v4 } from "uuid";


import { useEffect, useState,useRef } from "react"

const Expense = () => {
const [date, setdate] = useState()

let Trans = Transactions()

let Datepicker = useRef()
let Description = useRef()
let Amount = useRef()

useEffect(() => {
    var local = new Date();
    setdate(local.toJSON().slice(0,10))
}, [])

const AddIt = (e) => {
    e.preventDefault()
    console.log("Hi")
    let trans = localStorage.getItem("Transactions")
    console.log(trans)
    console.log("Des", Description.current.value)
    console.log(Amount.current.value)
    let format = {Description: Description.current.value, Amount: Amount.current.value, Date: new Date(date), Income: false, Id: v4()}
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
    return(
        <form onSubmit={AddIt} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0px', flexWrap: 'wrap'}}>
            <p style={{padding: '10px 0px', paddingRight: '10px', fontFamily: 'ariel',fontWeight: '1000', WebkitTextStroke: '2px',marginTop: '-2px'}}>-</p>
            <input ref={Description} required placeholder="Description" style={{width: '150px'}}></input>
            <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
            <p>£</p>
            <input ref={Amount} required type="number" placeholder="Amount" style={{width: '100px'}}></input>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', gap: '0px'}}>
                <p>{`Date:`}</p>
                <input required onClick={() => Datepicker.current.showPicker()} onChange={(x) => setdate(x.target.value)} ref={Datepicker} type="date" value={date}></input>
            </div>


            <button>Add Expenses</button>
        </form>
    )
}

export default Expense