

const TransactionLine = ({Info, Today, Delete}) => {

    return(
        <div key={Math.random()} style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', backgroundColor: 'transparent'}}>
            {Info.Income ? 
            <p style={{fontWeight: '1000', fontWeight: '1000', WebkitTextStroke: '2px',marginTop: '-2px', color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>+</p>
            : 
            <p style={{fontWeight: '1000',fontWeight: '1000', WebkitTextStroke: '2px',marginTop: '-2px', color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>-</p>
            }
            <p style={{color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>£{Info.Amount}</p>
            <p style={{color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}>{Info.Description}</p>
            {Info.Income &&
            <p style={{color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)'}}> Saving {Info.SavePercent}%(£{(Info.Amount * (Info.SavePercent/100))}) | Spending £{Info.Amount - (Info.Amount * (Info.SavePercent/100))} (£{Info.DailyBudget} PerDay till {new Date(Info.SpendTill).toDateString().slice(4, 10)} ({Info.Days}Days)) </p>
            }
            <button style={{color: Today ? 'var(--backgroundCol)' : 'var(--accentcolor)', marginRight: '15px', fontSize: '15px'}} onClick={() => Delete(Info.Id)}>x</button>
        </div>
    )
        

}

export default TransactionLine