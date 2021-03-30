import { Grid, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import customStyle from "./customStyle";
import { useDataLayerValue } from "../../store/dataLayer";
import jwt from "jsonwebtoken";
import { SET_USER } from "./../../store/actionsTypes";

const useStyle = makeStyles(() => customStyle("80px"));

const Login = () => {
  const classes = useStyle();

  //   hooks
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDataLayerValue()[1];

  // effect

  // functions
  const changeHandler = (event) => {
    const target = event.target;
    setUser({ ...user, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validate = validations();
    if (validate.isValid) {
      setErrors({});

      const token = jwt.sign(user, "SECRET", { expiresIn: "2h" });
      localStorage.setItem("auth", token);
      dispatch({
        type: SET_USER,
        payload: { user },
      });
      history.push("/");
    } else {
      setErrors(validate.errors);
    }
  };

  const validations = () => {
    const errors = {};

    const { email, password } = user;
    if (!email) {
      errors.email = "Please enter your email or username";
    }
    if (!password) {
      errors.password = "Please enter password";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item md={4} xs={12} className={classes.collum}>
        <h2 className={classes.title}>Login Here</h2>
        {errors?.error && (
          <p style={{ color: "red", marginBottom: "20px" }}>
            Your given credential was incorrect
          </p>
        )}
        <form onSubmit={submitHandler}>
          <TextField
            error={errors?.email}
            label="User Name"
            name="email"
            onChange={changeHandler}
            className={classes.textBox}
            defaultValue={user.email}
            helperText={errors?.email ? errors?.email : ""}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            defaultValue={user.password}
            onChange={changeHandler}
            className={classes.textBox}
            error={errors?.password}
            helperText={errors?.password ? errors?.password : ""}
          />
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </form>
        <div className={classes.links}>
          <Link to="/register" className={classes.link}>
            Don't Have an account ? Register Here
          </Link>
          <Link to="/register" className={classes.link}>
            Forgot Password
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
