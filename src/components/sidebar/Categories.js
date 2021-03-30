import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, AppBar, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../store/dataLayer";
import { FETCH_CATEGORIES } from "./../../store/actionsTypes";
import { categories as fakeCategories } from "./../../fakeData/categories";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: "none",
    color: "inherit ",
  },
  header: {
    padding: "10px",
  },
}));

function ListItemLink(props) {
  return <ListItem button {...props} />;
}

const Categories = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [state, dispatch] = useDataLayerValue();

  useEffect(() => {
    setCategories(state.categories);
  }, [state]);

  useEffect(() => {
    dispatch({
      type: FETCH_CATEGORIES,
      payload: { categories: fakeCategories },
    });
  }, [dispatch, categories]);

  return (
    <div className={classes.root}>
      <Card>
        <AppBar color="secondary" className={classes.header} position="static">
          <h2>Categories</h2>
        </AppBar>
        <List component="nav" aria-label="secondary mailbox folders">
          {categories.map((category) => (
            <Link
              to={`/post/category/${category.slug}`}
              key={category.name}
              className={classes.link}
            >
              <ListItemLink>
                <ListItemText primary={category.name} />
              </ListItemLink>
            </Link>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default Categories;
