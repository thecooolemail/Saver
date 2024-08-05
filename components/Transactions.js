"use client"
import { useEffect, useState, useRef } from "react"
import Transactions from "../src/app/states/transactions"

const TransactionsUI = () => {

    const todayRef = useRef(null);


    let TransArray = Transactions()
    const [groupedTransactions, setgroupedTransactions] = useState([])

    const [dates, setdates] = useState()

    function generateDateArray() {
        //make the ui array here so it doesnt update when looping
    
        return dateArray; // Return the array of dates
    }

    
    useEffect(() => {
  
        let trans = localStorage.getItem("Transactions")
        if(trans != null){
            console.log("Transactions Found", JSON.parse(trans))
            TransArray.setTransArray(JSON.parse(trans))
        }


     

       
        }, [])

        useEffect(() => {
if(TransArray.TransArray){
    const dateArray = []; 
    let allowanceCon = []
//make an array and push the last cost here, and on loop check last index of array for day befores cost
    for (let i = 50; i >= 0; i--) {
        const date = new Date();
        
        date.setDate(date.getDate() - (i-30));

        let transactions = getIndexesOfDate(date.toDateString())
        let IncomeTrans = getBudgets(date.toDateString())
      
        let CumulativeAllowances = 0
        let Allowance = 0
        let Costs = 0

        IncomeTrans.map(x => {Allowance = Allowance + Number(x.DailyBudget)})
        transactions.map(x => { if(x.Income === false){ Costs = Costs + Number(x.Amount)}})
            if(allowanceCon.length >= 1){
                console.log(allowanceCon)
                console.log("last", allowanceCon[allowanceCon.length-1])
                CumulativeAllowances = (Allowance-Costs) + allowanceCon[allowanceCon.length - 1]
            }else{
                CumulativeAllowances = Allowance-Costs
            }
            console.log(allowanceCon)

        dateArray.push({ CumulativeAllowances: CumulativeAllowances.toFixed(2), YesterdayLeft:allowanceCon[allowanceCon.length - 1],  Costs:Costs, IncomeTrans:IncomeTrans, Transactions: transactions, Allowance:Allowance, Date: date });
        allowanceCon.push(CumulativeAllowances)
    }
    
console.log("Dataarray", dateArray)

     setdates(dateArray)
}
        }, [TransArray.TransArray])

        function Delete(x){
            console.log(x)
            let trans = localStorage.getItem("Transactions")
            let par = JSON.parse(trans)
            let n = par.filter(transaction => transaction.Id !== x);
            TransArray.setTransArray(n)
            localStorage.setItem("Transactions", JSON.stringify(n))
        }

        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];



        function getIndexesOfDate(searchDate) {
            let ar = []
            TransArray.TransArray?.map(x => {
            let d = new Date(x.Date)
            if(d.toDateString() === searchDate){ ar.push(x) } })
                return ar
        }

        function isDateBetween(date, startDate, endDate) {
            return date >= startDate && date <= endDate;
        }

        function getBudgets(searchDate) {
            let ar = []
            TransArray.TransArray?.map(x => {
                if(x.Income === true){
                   // console.log("income is true")
                   let startdate = new Date(x.Date)
                   startdate.setDate(startdate.getDate() - 1);
                    if( isDateBetween(new Date(searchDate), startdate, new Date(x.SpendTill)) ){
                        console.log("dates are between")
                        ar.push(x)
                    }
                }
            })
            return ar
    }

    useEffect(() => {
        if(dates){
            todayRef.current.scrollIntoView({ behavior: 'instant'});

        }
    }, [dates])


    return(
        <div style={{width: '100%'}}>
                
    {dates?.toReversed().map(x => {
        let today = false
        if(x.Date.toDateString() === new Date().toDateString() ){
            today = true
        }

        return(
        <div ref={today ? todayRef : null}  style={{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: today ? "var(--accentcolor)" : 'var(--backgroundCol)'}}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', paddingRight: '10px'}}>
            {x.IncomeTrans?.map(x => {
                return(
                    <div style={{height: "100%",maxWidth: '1px', backgroundColor: 'black', border: today ?  'dashed 1px var(--accentcolor)' : 'solid 1px var(--accentcolor)'}}/>
                )
            })}
            </div>

                <div style={{flex: 1}}>
            
                <p style={{paddingTop: '10px', color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>{today ? "Today - " : ''} {weekday[x.Date.getDay()]} {x.Date.getDate()} </p>
                <p style={{color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>Cumulative Allowances: £{x.CumulativeAllowances}</p>
                <p style={{opacity: '0.5', color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>£{x.Allowance.toFixed(2)}(Allowance)+£{Number(x.YesterdayLeft).toFixed(2)}(Yesterday Rollover)-£{x.Costs}(Todays Expense)</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px'}}>
                {x.Transactions?.map((x, index) => (
                <div key={index} style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '100%'}}>
                {x.Income ? 
                <p style={{fontWeight: '1000', WebkitTextStroke: '1px', color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>+</p>
                : 
                <p style={{fontWeight: '1000', WebkitTextStroke: '1px', color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>-</p>
                }
                <p style={{color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>£{x.Amount}</p>
                <p style={{color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>{x.Description}</p>
                {x.Income &&
                <p style={{color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}> Saving {x.SavePercent}%(£{(x.Amount * (x.SavePercent/100))}) | Spending £{x.Amount - (x.Amount * (x.SavePercent/100))} (£{x.DailyBudget} PerDay till {new Date(x.SpendTill).toDateString().slice(4, 10)} ({x.Days}Days)) </p>
            }
                <button style={{color: today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}} onClick={() => Delete(x.Id)}>x</button>
              </div>
            ))}
            <div style={{width: '100%', height: '1px', opacity: '0.5', border: 'solid 0.5px var(--accentcolor)'}}/>
            </div>
                
            </div>
            </div>
            )
            
    })
    
}

          
        </div>
    )
}

export default TransactionsUI