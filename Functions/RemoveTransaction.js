"use client"
import { v4 } from "uuid"

const RemoveTransaction = ({Id}, callback) => {
    
    let Transactions = localStorage.getItem("Transactions")
    let TransactionsMod = JSON.parse(Transactions)

    let x = TransactionsMod.filter(obj => obj.UUID !== Id)

    localStorage.setItem("Transactions", JSON.stringify(x))

    if (callback) {
        callback(); // This will be called after localStorage.setItem is done
    }


}

export default RemoveTransaction


