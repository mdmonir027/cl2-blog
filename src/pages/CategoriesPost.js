import React, { useEffect } from "react";
import { FETCH_POSTS } from "../store/actionsTypes";
import { useDataLayerValue } from "../store/dataLayer";
import { useParams } from "react-router";
import { posts as fakePosts } from "./../fakeData/posts";
import AllPosts from "./../components/home/AllPost";

const CategoriesPost = () => {
  const dispatch = useDataLayerValue()[1];
  const { slug } = useParams();

  useEffect(() => {
    const posts = fakePosts.filter((post) => post.category.slug === slug);

    dispatch({
      type: FETCH_POSTS,
      payload: { posts },
    });
  }, [dispatch, slug]);

  return (
    <div>
      <h2>Categories Posts</h2>
      <AllPosts />
    </div>
  );
};

export default CategoriesPost;
