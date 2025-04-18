import React, { useState, useEffect } from 'react'
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import SearchResults from './SearchResults';
import { searchSymbols } from '../../api/stock-api';

const Search = () => {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    }

    const updateBestMatches = async () => {
        try {
            setLoading(true);
            if(input) {
                const searchResults = await searchSymbols(input);
                const result = searchResults.result;
                setBestMatches(result);
            }
        } catch (err){
            setBestMatches([]);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!input.trim()) {
          setBestMatches([]);
        }
      }, [input]);

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-gray-900 border-gray-800">
      <input 
        type="text" 
        value={input} 
        className="w-full px-4 py-2 focus:outline-none rounded-md bg-gray-900 text-gray-300"
        placeholder="Search stock..."
        onChange={(e) => {setInput(e.target.value)}} 
        onKeyDown={(e)=>{
            if(e.key === "Enter"){
                updateBestMatches();
            }
        }}   
    />

    {loading && (
        <div className="m-1 animate-spin rounded-full h-4 w-4 border-t-2 border-gray-300"></div>
    )}

    {input && (
        <button onClick={clear} className="m-1">
            <XIcon className="h-4 w-4 fill-gray-500" />
        </button>
    )}

    <button onClick={updateBestMatches} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
        <SearchIcon className="h-4 w-4 fill-gray-100" />
    </button>

    {input && bestMatches.length > 0 ? <SearchResults results={bestMatches}/> : null}
    
    </div>
  )
}

export default Search
