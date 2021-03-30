import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, ButtonBase, Button, Typography, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import stringHelper from "./../../utils/stringHelper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { style } from "./Style";
import { useDataLayerValue } from "../../store/dataLayer";

const useStyles = makeStyles((theme) => style(theme));

const Post = (props) => {
  const classes = useStyles();

  // hook
  const [state] = useDataLayerValue();

  // props destructure
  const { title, slug, content, thumbnail, user, createAt, single } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item md={single ? "12" : false}>
            <ButtonBase
              className={single ? classes.singleImage : classes.image}
            >
              <img className={classes.img} alt={title} src={thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {single ? content : stringHelper.subString(content)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user}
                </Typography>
              </Grid>
              {single && state?.auth?.isLoggeIn && (
                <Grid item>
                  <div className={classes.buttonWrapper}>
                    <Link to={`/edit-post/${slug}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        size="small"
                      >
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </Grid>
              )}

              {!single && (
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    <Link to={`/post/${slug}`} style={{ all: "inherit" }}>
                      Read More
                    </Link>
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{createAt}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Post;
