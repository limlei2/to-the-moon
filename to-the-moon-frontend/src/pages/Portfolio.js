import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.length === 0) {
        setStocks(null);
      } else {
        setStocks(result.data);
      }
    } catch (err) {
      setStocks(null);
      console.log(err);
    }
  }

  useEffect(() => {
    updatePortfolio();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white px-4 sm:px-10 md:px-20 lg:px-36 py-12">
      <h2 className="text-3xl font-semibold mb-10 text-center md:text-left">Portfolio</h2>
      {stocks ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {stocks.map((stock) => (
            <Link
              to={`/stock/${stock.stockId}`}
              key={stock._id}
              className="w-full max-w-xs mx-auto transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Card>
                <ul className="flex flex-col items-center justify-center space-y-2">
                  <li className="text-xl font-semibold">{stock.stockId}</li>
                  <li className="text-gray-400">{stock.stockName}</li>
                  <li>
                    <img src={stock.stockLogo} alt={`${stock.stockName} logo`} className="h-10 w-10" />
                  </li>
                </ul>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-2">You do not have any stocks in your portfolio yet.</p>
          <p>Get started and add your stocks now!</p>
        </div>
      )}
    </div>
  )
}

export default Portfolio;
