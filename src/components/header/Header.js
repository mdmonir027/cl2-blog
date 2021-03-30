import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../store/dataLayer";
import { SET_USER } from "./../../store/actionsTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsloggedIn] = useState(true);

  const [state, dispatch] = useDataLayerValue();

  useEffect(() => setIsloggedIn(state.auth.isLoggeIn), [state]);

  const logOut = () => {
    dispatch({
      type: SET_USER,
      payload: { user: {} },
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} color="inherit" to="/">
                Forum
              </Link>
            </Typography>

            <Button color="inherit">
              <Link className={classes.link} color="inherit" to="/">
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} color="inherit" to="/categories">
                Categories
              </Link>
            </Button>

            {isLoggedIn ? (
              <>
                <Button color="inherit">
                  <Link
                    className={classes.link}
                    color="inherit"
                    to="/create-post"
                  >
                    Create
                  </Link>
                </Button>

                <Button color="inherit" onClick={logOut}>
                  <span className={classes.link} color="inherit">
                    Log Out
                  </span>
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <Link className={classes.link} color="inherit" to="/login">
                  Login
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
