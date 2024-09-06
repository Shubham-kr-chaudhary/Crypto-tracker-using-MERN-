import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";


const Watchlist = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  
  const watchlistData = useSelector((store) => store.watchlist);

  useEffect(() => {
    if (user==="") {
      navigate("/login");
    }
  }, [user, navigate]); 

  if (user==="") {
    return null;
  }

  return watchlistData.length === 0 ? (
    <div className="container w-full mx-auto">No data in watchlist</div>
  ) : (
    <div className="container w-full mx-auto">
      <Cards apiData={watchlistData} />
    </div>
  );
};

export default Watchlist;



