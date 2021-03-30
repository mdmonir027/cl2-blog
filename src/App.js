import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import CategoriesPost from "./pages/CategoriesPost";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { FETCH_POSTS, SET_USER } from "./store/actionsTypes";
import { useDataLayerValue } from "./store/dataLayer";
import jwtDecode from "jwt-decode";
import SearchPosts from "./pages/SearchPost";
import CreatePost from "./pages/CreatePost";
import { posts as fakePosts } from "./fakeData/posts";
import EditPost from "./pages/EditPost";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: "20px 0",
  },
}));

const App = () => {
  // hooks
  const classes = useStyles();
  const [sideBarShow, setSideBarShow] = useState(true);
  const dispatch = useDataLayerValue()[1];

  const history = useLocation();

  // effects
  useEffect(() => {
    const { pathname } = history;
    if (pathname === "/login" || pathname === "/register") {
      setSideBarShow(false);
    } else {
      setSideBarShow(true);
    }
  }, [history]);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch({
        type: SET_USER,
        payload: {
          user: jwtDecode(localStorage.getItem("auth")),
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: FETCH_POSTS,
      payload: { posts: fakePosts },
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <div className={classes.padding}>
          <Grid container spacing={3}>
            <Grid item md={sideBarShow ? 8 : 12} sm={12}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path={"/post/:slug"} exact component={SinglePost} />
                <Route
                  exact
                  path={"/post/category/:slug"}
                  component={CategoriesPost}
                />
                <Route path={"/login"} component={Login} />
                <Route path={"/register"} component={Register} />

                <Route
                  path={"/search/:keyword"}
                  exact
                  component={SearchPosts}
                />
                <Route path={"/create-post"} component={CreatePost} />
                <Route path={"/edit-post/:slug"} component={EditPost} />
              </Switch>
            </Grid>
            {sideBarShow && (
              <Grid item md={4} sm={12}>
                <div>
                  <SideBar />
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default App;
