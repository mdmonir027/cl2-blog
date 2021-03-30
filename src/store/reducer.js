import * as types from "./actionsTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES: {
      const { categories } = action.payload;
      return {
        ...state,
        categories,
      };
    }
    case types.FETCH_POSTS: {
      const { posts } = action.payload;
      return {
        ...state,
        fetchPosts: posts,
        posts,
      };
    }
    case types.HOME_POST: {
      const posts = [...state.fetchPosts];
      return {
        ...state,
        posts,
      };
    }
    case types.SET_USER: {
      const { user } = action.payload;
      const auth = {
        isLoggeIn: Object.keys(user).length !== 0,
        user,
      };
      return {
        ...state,
        auth,
      };
    }
    case types.POST_SEARCH: {
      const { keyword } = action.payload;
      const posts = [...state.fetchPosts];
      const newPost = posts.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase())
      );

      return {
        ...state,
        posts: newPost,
      };
    }
    case types.ADD_NEW_POST: {
      const { post } = action.payload;
      const fetchPosts = [post, ...state.fetchPosts];

      return {
        ...state,
        fetchPosts,
      };
    }
    default:
      return state;
  }
};

export default reducer;
