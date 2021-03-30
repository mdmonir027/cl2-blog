import React, { useEffect } from "react";
import { HOME_POST } from "../store/actionsTypes";
import { useDataLayerValue } from "../store/dataLayer";
import AllPosts from "./../components/home/AllPost";

const Home = () => {
  const dispatch = useDataLayerValue()[1];

  useEffect(() => {
    dispatch({
      type: HOME_POST,
    });
    console.log("home js");
  }, [dispatch]);
  return (
    <div className="home">
      <h2>All Quesiton</h2>
      <AllPosts />
    </div>
  );
};

export default Home;
