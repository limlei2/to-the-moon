import React from 'react'

const SearchResults = ({results}) => {
  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-gray-900 border-gray-800 text-gray-300">
        {results.map((item)=>{
            return (
                <a href={`/stock/${item.symbol}`}><li 
                    key={item.symbol} 
                    className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-600"
                >
                    <span>{item.symbol}</span>
                    <span>{item.description}</span>
                </li>
                </a>
            )
            
        })}
    </ul>
  )
}

export default SearchResults
