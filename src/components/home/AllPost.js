import React, { useState, useEffect } from "react";
import Post from "./../post/Post";
import Pagination from "@material-ui/lab/Pagination";
import paginate from "paginate-array";
import { useDataLayerValue } from "../../store/dataLayer";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Style from "./Style";

const useStyles = makeStyles(() => Style());

const AllPosts = () => {
  const classes = useStyles();
  const [state] = useDataLayerValue();
  const [posts, setPosts] = useState([]);
  const [paginatePosts, setPaginatPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // effect
  useEffect(() => setPaginatPosts(paginate(posts, currentPage, 10)), [
    posts,
    currentPage,
  ]);
  useEffect(() => setPosts(state.posts), [state]);
  useEffect(() => {
    if (posts && paginatePosts) {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [posts, paginatePosts]);
  // functions

  return (
    <div>
      {loading ? (
        <LinearProgress className={classes.progressBar} color="secondary" />
      ) : (
        <>
          <div>
            {paginatePosts?.data?.map((post) => (
              <Post
                key={post.title}
                title={post.title}
                slug={post.slug}
                content={post.content}
                user={post.user?.name}
                category={post.category?.name}
                createAt="10 min ago"
                thumbnail={post.thumbnail}
              />
            ))}
          </div>
          <Pagination
            count={paginatePosts.totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            style={{ display: "flex", justifyContent: "center" }}
          />{" "}
        </>
      )}
    </div>
  );
};

export default AllPosts;
