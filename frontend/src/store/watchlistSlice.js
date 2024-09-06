

import { createSlice } from "@reduxjs/toolkit";


const normalizeCoinData = (coin, checker) => {
  if (checker === "top15") {
    return {
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      current_price: coin.item.data.price,
      total_volume: coin.item.data.total_volume,
      market_cap: coin.item.data.market_cap,
      image: coin.item.thumb,
      price_change_percentage_24h: coin.item.data.price_change_percentage_24h
    };
  } else {
    return coin; 
  }
};

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    handleAddcoin: (state, action) => {
      const normalizedCoin = normalizeCoinData(action.payload, action.payload.checker);
      const exists = state.find((coin) => coin.id === normalizedCoin.id);
      if (!exists) {
        state.push(normalizedCoin);
      }
    },
    handleremovecoin: (state, action) => {
      return state.filter((coin) => coin.id !== action.payload.id);
    },
  },
});

export const { handleAddcoin, handleremovecoin } = watchlistSlice.actions;
export default watchlistSlice.reducer;
