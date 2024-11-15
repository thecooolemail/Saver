"use client"
import { v4 } from "uuid"

const AddTransaction = ({TagId, Description, In, Amount, OnDate, SavePercent, SaveOverDays }, callback) => {
    
    let Transactions = localStorage.getItem("Transactions")

    let format 
    let ar = []
    if(In === true){
        let id = v4()
        let Startdat = new Date(OnDate)
        for(let i = 0; i < SaveOverDays; i++){
            let dat = new Date(OnDate)
             dat.setDate(dat.getDate() + i);
             dat.setHours(0, 0, 0, 0); 
            let format = {TagId: TagId, Description: Description,In: In, Amount: Amount,StartDate: Startdat, Date: dat, SavePercent: SavePercent, SaveOverDays: SaveOverDays,  UUID: id}
            ar.push(format)
        }
    }else{
        format = {TagId: TagId, Description: Description,In: In, Amount: Amount, Date: OnDate, UUID: v4()}
    }



    if(Transactions === null){
        let NewArray = []
        if(In === true){
            ar.map(e => NewArray.push(e))
        }else{
            NewArray.push(format)
        }
        localStorage.setItem("Transactions", JSON.stringify(NewArray))
        
    }else{
        let TransactionsMod = JSON.parse(Transactions)
        if(In === true){
            ar.map(e => TransactionsMod.push(e))
        }else{
            TransactionsMod.push(format)
        }
        localStorage.setItem("Transactions", JSON.stringify(TransactionsMod))
        
    }


    if (callback) {
        callback(); // This will be called after localStorage.setItem is done
    }


}

export default AddTransaction


