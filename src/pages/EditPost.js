import React, { useState, useEffect } from "react";
import PostForm from "../components/form/PostForm";
import { useParams } from "react-router-dom";
import { useDataLayerValue } from "../store/dataLayer";
import { CircularProgress } from "@material-ui/core";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [state] = useDataLayerValue();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPost(state.fetchPosts.find((post) => post.slug === slug));
  }, [slug, state]);

  useEffect(() => {
    if (post) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [post]);

  return (
    <div>
      {loading ? (
        <CircularProgress size={25} />
      ) : (
        <>
          <h2>Edit Your Post</h2>
          <PostForm postData={post} />
        </>
      )}
    </div>
  );
};

export default EditPost;
