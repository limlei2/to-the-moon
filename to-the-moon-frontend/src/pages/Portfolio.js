import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const user = useSelector(selectUser);
  const token = user?.token;

  const [stocks, setStocks] = useState(null);
  
  const updatePortfolio = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if(result.data.length === 0){
        setStocks(null);
      } else {
        setStocks(result.data);
      }
    } catch(err){
      setStocks(null);
      console.log(err);
    }
  }

  useEffect(()=> {
    updatePortfolio();
  }, [])

  return (
    <div className="bg-black h-screen text-white px-36 p-12">
      <h2 className="text-3xl font-semibold mb-10">Portfolio</h2>
      {stocks ? (
        <div className="flex flex-row gap-4">
          {stocks.map((stock) => (
            <Link to={`/stock/${stock.stockId}`} key={stock._id} className="w-64 h-40 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <Card>
                <ul>
                  <li>{stock.stockId}</li>
                  <li>{stock.stockName}</li>
                  <li><img src={stock.stockLogo} alt={`${stock.stockName} logo`} className="h-10 w-10"/></li>
                </ul>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <p>You do not have any stocks in your portfolio yet.</p>
          <p>Get started and add your stocks now!</p>
        </>
      )}
    </div>
  )
}

export default Portfolio
