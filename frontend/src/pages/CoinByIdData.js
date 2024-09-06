import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const timeframes = {
  '24H': { label: '24 Hours', duration: 60 * 60 * 24 },        
  '7D': { label: '7 Days', duration: 60 * 60 * 24 * 7 },     
  '1M': { label: '1 Month', duration: 60 * 60 * 24 * 30 },    
  '3M': { label: '3 Months', duration: 60 * 60 * 24 * 90 },  
  '1Y': { label: '1 Year', duration: 60 * 60 * 24 * 365 },     
};

const CoinByIdData = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M'); 
  useEffect(() => {
    let isMounted = true; 

    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { method: "GET", headers: { accept: "application/json" } });
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);  
        }
      } catch (err) {
        console.error('Error fetching coin data:', err);
      }
    };

    const fetchChartData = async () => {
      try {
        const today = new Date();
        const to = Math.floor(today.getTime() / 1000); 

        const from = timeframes[selectedTimeframe].duration
          ? to - timeframes[selectedTimeframe].duration
          : 0;

        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`, { method: "GET", headers: { accept: "application/json" } });
        const result = await response.json();

        if (result.prices && Array.isArray(result.prices) && result.prices.length > 0) {
          const prices = result.prices.map((price) => price[1]);
          const dates = result.prices.map((price) => new Date(price[0]).toLocaleDateString());
          if (isMounted) {
            setChartData({
              labels: dates,
              datasets: [
                {
                  label: `${id} Price (${timeframes[selectedTimeframe].label})`,
                  data: prices,
                  fill: false,
                  borderColor: "#42A5F5",
                  tension: 0.1,
                },
              ],
            });
            setLoadingChart(false); 
          }
        } else {
          if (isMounted) {
            setChartData({
              labels: [],
              datasets: [],
            });
            setLoadingChart(false);  
          }
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
        if (isMounted) {
          setChartData({
            labels: [],
            datasets: [],
          });
          setLoadingChart(false); 
        }
      }
    };

    fetchCoinData();
    fetchChartData();

    return () => {
      isMounted = false; 
    };
  }, [id, selectedTimeframe]);

  return (
    <div className="w-full mt-5 border shadow-lg gap-5 rounded-md py-4 px-5 flex flex-col">
      
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
          </div>
        ) : (
          <>
            {data.image && (
              <img
                src={data.image.small}
                alt={`${data.name} logo`}
                className="w-12 h-12"
              />
            )}
            <h2 className="text-[24px] font-bold">
              {data.name} {data.symbol ? `(${data.symbol.toUpperCase()})` : ''}
            </h2>
          </>
        )}
      </div>
      
    
      <div>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
          </div>
        ) : (
          <>
            <p><span className="font-black">Current Price: </span>${data.market_data?.current_price?.usd}</p>
            <p><span className="font-black">Description: </span>{data.description?.en}</p>
            <p><span className="font-black">Market Cap: </span>${data.market_data?.market_cap?.usd}</p>
            <p><span className="font-black">Homepage: </span> <a href={data.links?.homepage[0]} target="_blank" rel="noopener noreferrer">{data.links?.homepage[0]}</a></p>
          </>
        )}
      </div>

     
      <div className="border border-gray-300 shadow-md p-4 mt-4 rounded-lg">
 
        <div className="mb-4">
          {Object.keys(timeframes).map((key) => (
            <button
              key={key}
              className={`px-4 py-2 mx-1 ${selectedTimeframe === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
              onClick={() => {
                setSelectedTimeframe(key);
                setLoadingChart(true); 
              }}
            >
              {timeframes[key].label}
            </button>
          ))}
        </div>

        <div>
          {loadingChart ? (
            <div className="animate-pulse h-72 bg-gray-300 rounded-md"></div>
          ) : chartData.labels && chartData.labels.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No chart data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinByIdData;
