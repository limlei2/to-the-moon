import React, { useState, useEffect } from 'react'
import Card from '../components/StockPage/Card'
import Details from '../components/StockPage/Details'
import Overview from '../components/StockPage/Overview'
import Chart from '../components/StockPage/Chart'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'
import { useParams } from 'react-router-dom'

const StockPage = () => {

    const { tickerSymbol } = useParams();

    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});

    const updateStockDetails = async () => {
        try{
            const result = await fetchStockDetails(tickerSymbol);
            setStockDetails(result);
        } catch(err){
            setStockDetails({});
            console.log(err);
        }
    }

    const updateStockOverview = async () => {
        try{
            const result = await fetchQuote(tickerSymbol);
            setQuote(result);
        } catch(err){
            setQuote({});
            console.log(err);
        }
    }

    useEffect(() => {
        updateStockDetails();
        updateStockOverview();
      }, [tickerSymbol]);

    return (
        <div className="bg-black h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 text-gray-300"> 
            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            <div className="w-full h-full rounded-md relative p-8 border-2 bg-gray-900 border-gray-800 flex flex-row">
                    <img src={stockDetails.logo} alt="Logo" className="h-13 w-13 mr-6"/>
                    <h1 className="text-4xl">{stockDetails.name}</h1>
                </div>
            </div>
            <div className="md:col-span-2 row-span-4">
                <Chart />
            </div>
            <div className="">
                <Overview 
                    symbol={tickerSymbol} 
                    price={quote.pc} 
                    change={quote.d} 
                    changePercent={quote.dp} 
                    currency={stockDetails.currency}
                />
            </div>
            <div className="row-span-2 xl:row-span-3">
                <Details details={stockDetails}/>
            </div>
        </div>
    )
}

export default StockPage
