import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Dashboard = () => {
  const usStocks = [
    { id: 'AAPL', name: 'Apple Inc.', logo: 'https://logo.clearbit.com/apple.com' },
    { id: 'MSFT', name: 'Microsoft Corp.', logo: 'https://logo.clearbit.com/microsoft.com' },
    { id: 'GOOGL', name: 'Alphabet Inc.', logo: 'https://logo.clearbit.com/abc.xyz' },
    { id: 'AMZN', name: 'Amazon.com Inc.', logo: 'https://logo.clearbit.com/amazon.com' },
  ];

  const crypto = [
    { id: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { id: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { id: 'SOL', name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { id: 'DOGE', name: 'Dogecoin', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  ];

  const etfs = [
    { id: 'SPY', name: 'S&P 500 ETF', logo: 'https://logo.clearbit.com/spdrs.com' },
    { id: 'QQQ', name: 'Nasdaq 100 ETF', logo: 'https://logo.clearbit.com/invesco.com' },
    { id: 'VTI', name: 'Vanguard Total Stock Market ETF', logo: 'https://logo.clearbit.com/vanguard.com' },
    { id: 'ARKK', name: 'ARK Innovation ETF', logo: 'https://logo.clearbit.com/ark-funds.com' },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-6 sm:p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

      {/* US Stocks */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">US Stocks</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {usStocks.map((stock) => (
            <Link 
              to={`/stock/${stock.id}`} 
              key={stock.id}
              className="w-full max-w-xs transform transition duration-300 hover:scale-105"
            >
              <Card>
                <div className="flex flex-col items-center space-y-2">
                  <img src={stock.logo} alt={stock.name} className="h-12 w-12" />
                  <div className="text-lg font-medium">{stock.id}</div>
                  <div className="text-sm text-gray-400 text-center">{stock.name}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Cryptocurrency */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cryptocurrency</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {crypto.map((coin) => (
            <Link 
              to={`/stock/${coin.id}`} 
              key={coin.id}
              className="w-full max-w-xs transform transition duration-300 hover:scale-105"
            >
              <Card>
                <div className="flex flex-col items-center space-y-2">
                  <img src={coin.logo} alt={coin.name} className="h-12 w-12" />
                  <div className="text-lg font-medium">{coin.id}</div>
                  <div className="text-sm text-gray-400 text-center">{coin.name}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ETFs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">ETFs</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {etfs.map((etf) => (
            <Link 
              to={`/stock/${etf.id}`} 
              key={etf.id}
              className="w-full max-w-xs transform transition duration-300 hover:scale-105"
            >
              <Card>
                <div className="flex flex-col items-center space-y-2">
                  <img src={etf.logo} alt={etf.name} className="h-12 w-12" />
                  <div className="text-lg font-medium">{etf.id}</div>
                  <div className="text-sm text-gray-400 text-center">{etf.name}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Dashboard;
