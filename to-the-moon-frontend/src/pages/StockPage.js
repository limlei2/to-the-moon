import React from 'react'
import Card from '../components/StockPage/Card'
import Details from '../components/StockPage/Details'
import { mockCompanyDetails } from '../mockData/mock'
import Overview from '../components/StockPage/Overview'
import Chart from '../components/StockPage/Chart'

const StockPage = () => {
  return (
    <div className="bg-black h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 text-gray-300"> 
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            <Card>Header</Card>
        </div>
        <div className="md:col-span-2 row-span-4">
            <Chart />
        </div>
        <div className="">
            <Overview 
                symbol={mockCompanyDetails.ticker} 
                price={300} 
                change={30} 
                changePercent={10.0} 
                currency={"USD"}
            />
        </div>
        <div className="row-span-2 xl:row-span-3">
            <Details details={mockCompanyDetails}/>
        </div>
    </div>
  )
}

export default StockPage
