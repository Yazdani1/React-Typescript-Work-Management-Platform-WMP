import React from 'react'

const Test = () => {

// You find the stock prices of a company for 5 different days:	[11, 23, 12, 45, 34]
// You need to find when shall I buy and when shall I sell to get the maximum profit.


const data = [11, 23, 12, 45, 34,2,2];


  return (

    <div>
        {data.map((c,index)=>(
            <>
            <p>{ c === 45 ? "Can sell to get most profit":""}</p>
            <p>{ c === 11 ? "Can buy it in this price":""}</p>
            </>
        ))}
    </div>

  )
}

export default Test