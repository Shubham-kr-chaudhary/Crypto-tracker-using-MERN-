import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DummyUi from "../components/DummyUi";

// import { useRef } from "react";
const Top15 = () => {
  const [data, setData] = useState([]);

  // const Data = useRef();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user === "") {
      navigate("/");
    } else {
    const url = "https://api.coingecko.com/api/v3/search/trending/";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [user]);

  return data.length === 0 ? (
    <DummyUi/>
  ) : (
    <div className="container w-full mx-auto">
      {/* <h1 ref={Data}>Helo</h1> */}
      <Cards apiData={data.coins} checker={"top15"} />
    </div>
  );
};

export default Top15;
