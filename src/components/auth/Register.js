import { Grid, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import customStyle from "./customStyle";
import validator from "validator";
import { useDataLayerValue } from "./../../store/dataLayer";
import { SET_USER } from "./../../store/actionsTypes";
import jwt from "jsonwebtoken";

const useStyle = makeStyles(() => customStyle("20px"));

const Register = () => {
  const classes = useStyle();

  //   hooks
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDataLayerValue()[1];
  const history = useHistory();

  // functions

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { isValid, errors } = validation();
    if (isValid) {
      setErrors({});
      const tokenData = {
        email: user.email,
        password: user.password,
      };
      const token = jwt.sign(tokenData, "SECRET", { expiresIn: "2h" });
      localStorage.setItem("auth", token);
      dispatch({
        type: SET_USER,
        payload: {
          user: tokenData,
        },
      });
      history.push("/");
    } else {
      setErrors(errors);
    }
  };

  const inputChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const validation = () => {
    const errors = {};

    const { name, email, password, confirmPassword } = user;

    if (!name) {
      errors.name = "Please enter your name";
    }

    if (!email) {
      errors.email = "Enter your name";
    } else if (!validator.isEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Enter your password";
    } else if (password.length < 6) {
      errors.password = "Password must be 6 or more";
    } else if (password.length > 27) {
      errors.password = "Password must not be 27";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Password didn't matched!";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item md={4} xs={12} className={classes.collum}>
        <h2 className={classes.title}>Registe Here</h2>
        {errors?.error && (
          <p style={{ color: "red", marginBottom: "20px" }}>
            Your given credential was incorrect
          </p>
        )}
        <form onSubmit={formSubmitHandler}>
          <TextField
            label="Name"
            name="name"
            onChange={inputChangeHandler}
            className={classes.textBox}
            error={errors.name}
            helperText={errors.name ? errors.name : ""}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={inputChangeHandler}
            className={classes.textBox}
            error={errors.email}
            helperText={errors.email ? errors.email : ""}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={inputChangeHandler}
            className={classes.textBox}
            error={errors.password}
            helperText={errors.password ? errors.password : ""}
          />
          <TextField
            label="Confrim Password"
            type="password"
            name="confirmPassword"
            onChange={inputChangeHandler}
            className={classes.textBox}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword : ""}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
        <div className={classes.links}>
          <Link to="/login" className={classes.link}>
            Have an account ? Login Here
          </Link>
          <Link to="/forgot-password" className={classes.link}>
            Forgot Password
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
