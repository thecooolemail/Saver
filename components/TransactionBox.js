import styles from '../src/app/styles/custom.module.css'
import Tags from '@/app/states/Tags'
import RemoveTransaction from '../Functions/RemoveTransaction'
import AllTransactions from '@/app/states/AllTransactions'
import { useState, useEffect } from 'react'

const TransactionBox = ({Info}) => {

    let Tag = Tags.filter(e => e.id === Info.TagId)



    let Amount 

    if(Info.In === true){
        let totalspend = Info.Amount - Info.Amount*(Info.SavePercent/100)
        Amount = totalspend/Info.SaveOverDays

    }else{
        Amount = Info.Amount
    }
 
    let Transactions = AllTransactions()


    function UpdateTransactions(){
        setTimeout(() => {
            let LocalS = localStorage.getItem("Transactions")
            Transactions.setTransactions(JSON.parse(LocalS))
        }, 100);
        
    }


    Info.Amount - Info.Amount*(Info.SavePercent/100)

    const [differenceInDays, setdifferenceInDays] = useState()

    useEffect(() => {
        if(Info){
            const startDate = new Date(Info.StartDate);
            const endDate = new Date(Info.Date);
            const differenceInMilliseconds = endDate - startDate;
            let diffirence = differenceInMilliseconds / (1000 * 60 * 60 * 24);
            diffirence = Number(diffirence)
            diffirence = diffirence + 1
            setdifferenceInDays(diffirence.toFixed(0))
        }
    }, [Info])
    
    
    return(
        <div className={styles.TransactionBoxRoot}>
            
                <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center' ,alignItems: 'flex-start', gap: '10px', flex: 1}}>
                    <div style={{scale: 0.6, height: '40px', marginLeft: '-10px', color: 'black','--Iconcolor': 'black'}} >
                   
                    {Tag[0].svg}
                        </div>
                    
                  
                    <p style={{display: Info.In ? 'flex' : 'none', whiteSpace: 'nowrap'}}>{Info?.Description} {differenceInDays}/{Info.SaveOverDays} </p>
                    <p style={{display: Info.In ? 'flex' : 'none', whiteSpace: 'nowrap'}}> Save £{Info.Amount*(Info.SavePercent/100)}({Info.SavePercent}%) Spend £{Info.Amount - Info.Amount*(Info.SavePercent/100)}({100-Info.SavePercent}%) = £{Info.Amount}</p>
                  
                </div>

                <b style={{whiteSpace: 'nowrap', backgroundColor: Amount >= 0 ?  '#35C759' : '#FF3B2F', padding: '5px 10px', borderRadius: '5px', color: 'white'}}>{Amount >= 0 ? "+" : "-"}£{Math.abs(Number(Amount)).toFixed(2)}</b>
                <h4  onClick={() => RemoveTransaction({Id: Info.UUID, }, UpdateTransactions()) }>x</h4>
        </div>
    )

}

export default TransactionBox

//<h4>{Info.In ? "" : "-"}£{Info.Amount}</h4>

//£{((Info.Amount*(Info.SavePercent/100))/Info.SaveOverDays).toFixed(0)}/d)