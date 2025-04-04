const basePath = "https://finnhub.io/api/v1"

export const searchSymbols = async(query) => {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_FINNHUB_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}

export const fetchStockDetails = async(stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}

export const fetchQuote = async(stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}

export const fetchHistoricalData = async (
    stockSymbol,
    outputsize,
    interval
) => {
    const url = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&outputsize=${outputsize}&interval=${interval}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}
