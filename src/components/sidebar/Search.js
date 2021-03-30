import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Card, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginBottom: "20px",
  },
  header: {
    padding: "10px",
  },
  form: {
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  field: {
    flex: 1,
    marginRight: "8px",
  },
}));

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const [term, setTerm] = useState("");
  const [error, setError] = useState(false);

  //   functions
  const formHandler = (event) => {
    event.preventDefault();
    if (!term) return setError(true);
    setError(false);
    setTerm("");
    history.push(`/search/${term}`);
  };

  return (
    <div className={classes.root}>
      <Card>
        <AppBar color="primary" className={classes.header} position="static">
          <h2>Search Here</h2>
        </AppBar>
        <form className={classes.form} onSubmit={formHandler}>
          <TextField
            error={error}
            size="small"
            label={error ? "Please enter a keyword" : "Search here"}
            variant="outlined"
            className={classes.field}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            <SearchIcon />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Search;
