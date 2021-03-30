import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Post from "../components/post/Post";
import { useDataLayerValue } from "../store/dataLayer";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState();

  const [state] = useDataLayerValue();

  useEffect(() => {
    const posts = [...state.posts];
    const post = posts.find((post) => post.slug === slug);
    setPost(post);
  }, [slug, state]);

  return (
    <div>
      <Post
        title={post?.title}
        slug={post?.slug}
        content={post?.content}
        thumbnail={post?.thumbnail}
        user={post?.user?.name}
        category={post?.category?.name}
        createAt={"10 min ago"}
        single
      />
    </div>
  );
};

export default SinglePost;
