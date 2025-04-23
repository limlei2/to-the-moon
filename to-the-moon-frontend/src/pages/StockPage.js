import React, { useState, useEffect } from 'react'
import Details from '../components/StockPage/Details'
import Overview from '../components/StockPage/Overview'
import Chart from '../components/StockPage/Chart'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/outline'
import axios from "axios";

import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice"

import { toast } from "react-toastify";

const StockPage = () => {

    const user = useSelector(selectUser);
    const token = user?.token;

    const { tickerSymbol } = useParams();

    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});
    const [liked, setLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const updateStockDetails = async () => {
        try {
            const result = await fetchStockDetails(tickerSymbol);
            setStockDetails(result);
        } catch(err){
            setStockDetails({});
            console.log(err);
        }
    }

    const updateStockOverview = async () => {
        try {
            const result = await fetchQuote(tickerSymbol);
            setQuote(result);
        } catch(err){
            setQuote({});
            console.log(err);
        }
    }

    const updateLiked = async () => {
        setIsLiking(true);
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/${user.id}/${tickerSymbol}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
            setLiked(result.data.exists);
        } catch(err){
            setLiked(false);
            console.log(err);
        } finally {
            setIsLiking(false);
        }
    }

    const handleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);

        try {
            if(liked){
                const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/${user.id}/${tickerSymbol}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                if(result.status === 204 || result.status === 404){
                    setLiked(false);
                    toast.info("Removed from portfolio");
                } else {
                    toast.error("Internal Server Error. Please try again later.")
                }
                
            } else {
                const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/`,
                    {
                        ownerId: user.id,
                        stockId: tickerSymbol,
                        stockLogo: stockDetails.logo,
                        stockName: stockDetails.name
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                if(result.status === 201 || result.status === 409){
                    setLiked(true);
                    toast.success("Added to portfolio!");
                } else {
                    toast.error("Internal Server Error. Please try again later.")
                }
            }
            
        } catch(err){
            setLiked(false);
            console.log(err);
            toast.error("An Error Occured, Please Try Again");
        } finally {
            setIsLiking(false);
        }
    }

    useEffect(() => {
        updateStockDetails();
        updateStockOverview();
        updateLiked();
    }, [tickerSymbol]);

    return (
        <div className="bg-black h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 text-gray-300"> 
            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
                <div className="w-full h-full rounded-md relative p-8 border-2 bg-gray-900 border-gray-800 flex flex-row">
                    <img src={stockDetails.logo} alt="Logo" className="h-12 w-12 mr-6"/>
                    <h1 className="text-4xl">{stockDetails.name}</h1>
                    <StarIcon
                        onClick={isLiking ? null : handleLike}
                        className={`ml-auto w-12 h-12 cursor-pointer transform transition duration-150 ${
                            liked
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-yellow-400 fill-transparent"
                        } ${isLiking ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                    />
                </div>
            </div>
            <div className="md:col-span-2 row-span-4">
                <Chart symbol={tickerSymbol}/>
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
