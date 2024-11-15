"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const AreaChartComp = ({Data}) => {


  const targetLength = 15;
  const newArray = [];
  let counter = 0


  let originalArray = Data.map(e => {
    let x = Number(e.Amount)
    if(x <= 0) {return 10
    }else {
      return Number(e.Amount)
    } 
  })


  if(Data[0].Amount != undefined){

      for (let i = 0; i < targetLength; i++) {
        if(i%2){
          newArray.push({name: i, amount: originalArray[counter]})
          counter++
        }else{
          if(i === 0){
            newArray.push({name: i, amount: originalArray[0]})
          }else if(i === targetLength-1){
            newArray.push({name: i, amount: originalArray[6]})
          }else{
            let mid = (originalArray[counter-1]+originalArray[counter])/2
            newArray.push({name: i, amount: mid})
          }
        }
      }

  }else{

    for (let i = 0; i < targetLength; i++) {
          newArray.push({name: i, amount: 10})
        }

  }
  

    return(
        <div style={{width: '100%', height: '100px', backgroundColor: 'white', borderRadius: '10px'}}>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={newArray}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
           <Area type="monotone" isAnimationActive={false}   dataKey="amount" stackId="1" stroke="black" strokeWidth="1" fill="rgb(0, 0, 0, 0.1)"  fillOpacity="1" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    )
}
export default AreaChartComp