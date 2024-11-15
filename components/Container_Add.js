"use client"
import styles from '../src/app/styles/custom.module.css'
import { useState, useEffect, useRef } from 'react'
import TagSelect from './TagSelect'
import AddTransaction from '../Functions/AddTransaction'
import AllTransactions from '@/app/states/AllTransactions'

const Container_Add = ({Close, AutoDate}) => {


    let Transactions = AllTransactions()

    useEffect(() => {
        setOnDate(AutoDate)
    }, [AutoDate])



    

    let Datepicker = useRef()
    const [error, seterror] = useState("")
    const [OnDate, setOnDate] = useState()
    const [Showtag, setShowtag] = useState(true)
    const [TagInfo, setTagInfo] = useState()
    const [out, setout] = useState(true)

    const [savepercent, setsavepercent] = useState(25)
    const [Amount, setAmount] = useState(0)
    const [saveAmount, setsaveAmount] = useState(null)
    const [dailyBudget, setdailyBudget] = useState(null)
    const [spendover, setspendover] = useState("4")
    let spendOverOptions = ["Today", "1 Week", "2 Weeks", "3 Weeks", "1 Month", "2 Months", "3 Months", "4 Months", "Half Year", "1 year"]
    let spendOverDays = [1, 7, 14, 21, 28, 56, 84, 112, 168, 226]



    function ChangeDate(){
        setOnDate(new Date(document.getElementById("date").value))
    }

    useEffect(() => {
        
        if(!out && Amount){
            
            let totalspend = Amount - Amount*(savepercent/100)
            let dailyBudget 
            switch(spendover) {
                case "0":
                  dailyBudget = totalspend/1
                  break;
                case "1":
                    dailyBudget = totalspend/7
                  break;
                case "2":
                    dailyBudget = totalspend/14
                  break;
                case "3":
                    dailyBudget = totalspend/21
                  break;
                case "4":
                    dailyBudget = totalspend/28
                  break;
                case "5":
                    dailyBudget = totalspend/56
                  break;
                case "6":
                    dailyBudget = totalspend/84
                  break;
                case "7":
                    dailyBudget = totalspend/112
                  break;
                case "8":
                    dailyBudget = totalspend/168
                  break;
                case "9":
                    dailyBudget = totalspend/336
                  break;
                default:
                    dailyBudget = totalspend
              }
              setsaveAmount(Number(Amount*(savepercent/100)).toFixed(2))
              setdailyBudget(Number(dailyBudget).toFixed(2))
        }else{
            setsaveAmount(null)
            setdailyBudget(null)
        }

        

    }, [savepercent, spendover, Amount])

    function SendTag(x){
        setout(!x.In)
        setShowtag(false)
        setTagInfo(x)
    }

    function UpdateTransactions(){
        setTimeout(() => {
            let LocalS = localStorage.getItem("Transactions")
            Transactions.setTransactions(JSON.parse(LocalS))
            Close()    
        }, 100);
        
    }

    function Submit(){
        seterror("")
        
        let Am = Number(Amount)
        if(out) Am = Am*-1
        if(TagInfo === undefined) seterror("Please Select Tag")

        if(Am === 0 || Am === -0 || Am === ""){ seterror("Please Input Amount")}
        let ForDate = new Date(OnDate)
        ForDate.setHours(0, 0, 0, 0);  
        
        if(out === true && TagInfo != undefined && Amount != "0" && Amount != "-0" && Amount != ""){
            AddTransaction({
                TagId: TagInfo.id, 
                Description: document.getElementById("description").value,
                In: !out,
                Amount: Am,
                OnDate: ForDate
            }, 
            UpdateTransactions()
            )
        }else if(out === false && TagInfo != undefined && Amount != "0" && Amount != "-0" && Amount != ""){
            AddTransaction({
                TagId: TagInfo.id, 
                Description: document.getElementById("description").value,
                In: !out,
                Amount: Am,
                OnDate: ForDate,
                SaveOverDays: spendOverDays[spendover],
                SavePercent: Number(savepercent)
            }, 
            UpdateTransactions()
            )
        }

    }

    return(
        <div className={styles.ContainerAddRoot}>
        
        <h2 onClick={() => Close()} style={{position: 'fixed', top: '30px', right: '50px', zIndex: 100}}>X</h2>
        {Showtag && <TagSelect SendTag={SendTag}/>}
        
        {!Showtag &&
        <div className={styles.ContainerAddForm}>
            {error.length >= 1 ? <p style={{color: 'red'}}>{error}</p> : <></>}
            
            
            

            <div onClick={() => setShowtag(true)} style={{scale: "0.7"}}>{TagInfo?.svg}</div>
                        
            <input placeholder="Description (Optional)" id="description"></input>  
            
            <div className={styles.inputContainer} >
                <span style={{whiteSpace: 'nowrap'}}>{out ? "-£" : "£"}</span>
                <input placeholder="Amount" required type="number" onChange={(e) => setAmount(e.target.value)} style={{width: '100%',backgroundColor: 'transparent',paddingLeft: '0px',  border: '0px'}}/>
            </div>

            <div className={styles.inputContainer} style={{padding: '0px', width: '230px'}}>
                <input style={{backgroundColor: 'transparent'}} required defaultValue={`${AutoDate.getFullYear()}-${(AutoDate.getMonth() + 1).toString().padStart(2, '0')}-${AutoDate.getDate().toString().padStart(2, '0')}`} onChange={(x) => {ChangeDate(x.target.value)}} ref={Datepicker} id="date"  type="date"/>
            </div>
              
            <div className={styles.inputContainer} style={{display: out ? 'none' : 'flex', padding: '0px',height: '40px', width: '230px', position: 'relative'}}>
                <input style={{borderRadius: '20px'}} defaultValue={savepercent}  type="range" onChange={(e) => setsavepercent(e.target.value)} min="0" max="100" id="myRange"/>
                <p style={{position: 'absolute', alignSelf: 'center',left: '20px', pointerEvents: 'none',touchAction: 'none', fontSize: '12px'}}>Save {savepercent}% {saveAmount && `(£${saveAmount})`}</p>
            </div>


            <div className={styles.inputContainer} style={{display: out ? 'none' : 'flex', padding: '0px',height: '40px', width: '230px', position: 'relative'}}>
                <input style={{borderRadius: '20px'}} defaultValue={spendover} type="range" onChange={(e) => setspendover(e.target.value)} min="0" max="9" id="myRange"/>
                <p style={{position: 'absolute', alignSelf: 'center', left: '20px', pointerEvents: 'none',touchAction: 'none', fontSize: '12px', fontSize: '12px'}}>Spend Over {spendOverOptions[spendover]} {dailyBudget && `(£${dailyBudget}/day)`}</p>
            </div>

            <button style={{width: '230px', borderRadius: '20px'}} onClick={() => Submit()}>Add</button>

            </div>
            }
    </div>
    )

}

export default Container_Add

/*

<div className={styles.MultiChoiseContainer}>
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7141 4.2958L15.7141 0.295798C15.6211 0.20207 15.5105 0.127676 15.3887 0.0769069C15.2668 0.0261382 15.1361 0 15.0041 0C14.8721 0 14.7414 0.0261382 14.6195 0.0769069C14.4977 0.127676 14.3871 0.20207 14.2941 0.295798L10.2941 4.2958C10.1058 4.4841 10 4.7395 10 5.0058C10 5.2721 10.1058 5.52749 10.2941 5.7158C10.4824 5.9041 10.7378 6.00989 11.0041 6.00989C11.2704 6.00989 11.5258 5.9041 11.7141 5.7158L14.0041 3.4158V17.0058C14.0041 17.271 14.1094 17.5254 14.297 17.7129C14.4845 17.9004 14.7389 18.0058 15.0041 18.0058C15.2693 18.0058 15.5237 17.9004 15.7112 17.7129C15.8987 17.5254 16.0041 17.271 16.0041 17.0058V3.4158L18.2941 5.7158C18.3871 5.80953 18.4977 5.88392 18.6195 5.93469C18.7414 5.98546 18.8721 6.0116 19.0041 6.0116C19.1361 6.0116 19.2668 5.98546 19.3887 5.93469C19.5105 5.88392 19.6211 5.80953 19.7141 5.7158C19.8078 5.62284 19.8822 5.51223 19.933 5.39038C19.9838 5.26852 20.0099 5.13781 20.0099 5.0058C20.0099 4.87379 19.9838 4.74308 19.933 4.62122C19.8822 4.49936 19.8078 4.38876 19.7141 4.2958Z" fill="black"/><path d="M8.29409 12.2958L6.00409 14.5958V1.0058C6.00409 0.740582 5.89873 0.486228 5.7112 0.298692C5.52366 0.111155 5.26931 0.00579834 5.00409 0.00579834C4.73888 0.00579834 4.48452 0.111155 4.29699 0.298692C4.10945 0.486228 4.00409 0.740582 4.00409 1.0058V14.5958L1.71409 12.2958C1.62085 12.2026 1.51016 12.1286 1.38834 12.0781C1.26652 12.0277 1.13595 12.0017 1.00409 12.0017C0.872232 12.0017 0.741664 12.0277 0.619842 12.0781C0.49802 12.1286 0.38733 12.2026 0.294092 12.2958C0.200853 12.389 0.126892 12.4997 0.0764319 12.6215C0.0259715 12.7434 0 12.8739 0 13.0058C0 13.2721 0.105788 13.5275 0.294092 13.7158L4.29409 17.7158C4.38705 17.8095 4.49766 17.8839 4.61951 17.9347C4.74137 17.9855 4.87208 18.0116 5.00409 18.0116C5.1361 18.0116 5.26681 17.9855 5.38867 17.9347C5.51053 17.8839 5.62113 17.8095 5.71409 17.7158L9.71409 13.7158C9.9024 13.5275 10.0082 13.2721 10.0082 13.0058C10.0082 12.7395 9.9024 12.4841 9.71409 12.2958C9.52579 12.1075 9.27039 12.0017 9.00409 12.0017C8.73779 12.0017 8.48239 12.1075 8.29409 12.2958Z" fill="black"/></svg>
                    <p>Once</p>
                </div>  
                */