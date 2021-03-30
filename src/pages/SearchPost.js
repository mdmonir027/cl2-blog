import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AllPosts from "../components/home/AllPost";
import { POST_SEARCH } from "../store/actionsTypes";
import { useDataLayerValue } from "../store/dataLayer";

import { posts as fakePosts } from "./../fakeData/posts";

const SearchPosts = () => {
  const { keyword } = useParams();
  const dispatch = useDataLayerValue()[1];

  //   effect
  useEffect(() => {
    dispatch({
      type: POST_SEARCH,
      payload: { keyword, posts: fakePosts },
    });
  }, [keyword, dispatch]);

  return (
    <div>
      <h2>
        You have search '<b>{keyword}'</b>
        <AllPosts />
      </h2>
    </div>
  );
};

export default SearchPosts;
