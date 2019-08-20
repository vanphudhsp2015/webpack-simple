// action request all users

const fetchPosts = () => {
  return {
    type: "LOAD_POST_SUCCESS"
  };
};
const deletePost = id => {
  return {
    type: "REMOVE_POSTS",
    payload: id
  };
};
const addPost = data => {
  return {
    type: "ADD_POST",
    payload: data
  };
};
export { fetchPosts, deletePost, addPost };
