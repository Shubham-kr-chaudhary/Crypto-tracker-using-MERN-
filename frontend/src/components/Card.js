import React from "react";
import { MdOutlineStarRate, MdOutlineStar } from "react-icons/md";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleAddcoin, handleremovecoin } from "../store/watchlistSlice";

const Card = ({ item, checker }) => {
  const watchlistData = useSelector((store) => store.watchlist);
  const dispatch = useDispatch();


  const isPresent = (element, array) =>
    array.some((obj) => obj.id === element.id);

  const starRenderingLogic = isPresent(item, watchlistData);

  function addCoin() {
    dispatch(handleAddcoin(item));
  }

  function removeCoin() {
    dispatch(handleremovecoin(item));
  }

  const roundToSix = (num) => (num ? Math.round(num * 1e6) / 1e6 : 0);

  
  const priceChangePercentage =
    checker === "top15"
      ? item.data?.price_change_percentage_24h || 0
      : item?.price_change_percentage_24h || 0;

  const priceChange =
    checker === "top15"
      ? item.data?.price_change_24h || 0
      : item?.price_change_24h || 0;

  const currentPrice =
    checker === "top15" ? item.data?.price || 0 : item?.current_price || 0;

  const totalVolume =
    checker === "top15" ? item.data?.total_volume || 0 : item?.total_volume || 0;

  const marketCap =
    checker === "top15" ? item.data?.market_cap || 0 : item?.market_cap || 0;

  return (
    <div className="w-full mt-5 bg-cyan-100 border shadow-lg gap-5 rounded-md py-4 px-5 flex flex-col">
      <div className="flex gap-4 items-center">
        <abbr className="w-1/6" title="Click here to know more.">
          <Link to={`/coin/${item.id}`}>
            <img
              src={checker === "top15" ? item.thumb : item.image}
              alt="Crypto symbol"
            />
          </Link>
        </abbr>
        <div className="flex flex-col w-full">
          <h2 className="text-[20px] font-bold">{item.name}</h2>
          <h2 className="text-[18px] font-semibold text-gray-500">
            {item.symbol}
          </h2>
        </div>
        {!starRenderingLogic ? (
          <MdOutlineStarRate onClick={addCoin} className="text-[50px]" />
        ) : (
          <MdOutlineStar onClick={removeCoin} className="text-[50px]" />
        )}
      </div>

      
      <div className="flex items-center gap-4">
        {checker !== "top15" && (
          <h3 className="border px-2 py-1 text-[22px] rounded-3xl border-green-400 shadow-sm">
            &#x24;{roundToSix(priceChange)}
          </h3>
        )}
        <div className="border p-2 rounded-full border-green-400 shadow-sm">
          {priceChangePercentage > 0 ? (
            <FaArrowTrendUp className="text-green-500" />
          ) : (
            <FaArrowTrendDown className="text-red-500" />
          )}
        </div>
      </div>

      <h3 className="text-[28px] font-bold text-green-400">
        &#x24;{roundToSix(currentPrice)}
      </h3>
      <div>
       
        <div>
          Total Volume: &#x24;{roundToSix(totalVolume)}
        </div>
        <div>
          Market Capacity: &#x24;{roundToSix(marketCap)}
        </div>
      </div>
    </div>
  );
};

export default Card;

