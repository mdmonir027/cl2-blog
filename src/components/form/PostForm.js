import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDataLayerValue } from "../../store/dataLayer";
import { style } from "./Style";
import { ADD_NEW_POST } from "./../../store/actionsTypes";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import slug from "slugify";

const useStyles = makeStyles((theme) => style(theme));
const PostForm = ({ postData }) => {
  const classes = useStyles();

  //   hook
  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
    file: "",
    thumbnail:
      "https://images.pexels.com/photos/2072175/pexels-photo-2072175.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [state, dispatch] = useDataLayerValue();
  const history = useHistory();
  //   effects
  useEffect(() => setCategories(state.categories), [state]);

  useEffect(() => {
    if (postData) {
      const data = {
        title: postData.title,
        category: postData.category?.slug,
        content: postData.content,
        thumbnail: postData.thumbnail,
      };
      setPost(data);
    }
  }, [postData]);

  useEffect(() => {
    console.log(post);
    console.log(postData);
  }, [post, postData]);

  //   functions

  const changeHandler = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { isValid, errors } = validation();
    if (isValid) {
      setErrors({});
      const { title, category, content, file, thumbnail } = post;
      const generatePost = {
        id: shortid.generate(),
        title,
        slug: slug(title),
        category: {
          id: shortid.generate(),
          name: slug(category.toString()),
          slug: category.toString(),
        },
        user: {
          name: "user name 1",
        },
        content,
        file,

        thumbnail,
        create: new Date(),
      };
      console.log(generatePost);
      dispatch({
        type: ADD_NEW_POST,
        payload: {
          post: generatePost,
        },
      });
      history.push("/");
    } else {
      setErrors(errors);
    }
  };

  const validation = () => {
    const errors = {};

    const { title, content, category } = post;

    if (!title) {
      errors.title = "Please enter post title";
    }
    if (!content) {
      errors.content = "Please enter post content";
    }
    if (!category) {
      errors.category = "Please select a category";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const fileUploadChange = (event) => {
    setPost({ ...post, file: event.target.files[0] });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <TextField
        error={!!errors?.title}
        className={classes.input}
        label="Post Title"
        name="title"
        value={post.title}
        onChange={changeHandler}
        helperText={errors?.title ? errors?.title : ""}
      />
      <FormControl className={classes.formControl}>
        <InputLabel>Select a Category </InputLabel>
        <Select
          error={!!errors?.category}
          name="category"
          value={post.category}
          onChange={changeHandler}
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.slug} key={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors?.category && (
          <FormHelperText error> {errors?.category}</FormHelperText>
        )}
      </FormControl>
      <FormControl className={classes.formControl}>
        <CKEditor
          editor={ClassicEditor}
          data={post.content}
          onChange={(event, editor) =>
            setPost({ ...post, content: editor.getData() })
          }
        />
        {errors?.content && (
          <FormHelperText error> {errors?.content}</FormHelperText>
        )}
      </FormControl>

      <FormControl className={classes.uploadForm}>
        <input
          type="file"
          accept="image/*"
          className={classes.input}
          id="raised-button-file"
          style={{ display: "none" }}
          onChange={fileUploadChange}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            className={classes.uploadButton}
          >
            Upload
          </Button>
        </label>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ display: "block" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default PostForm;
