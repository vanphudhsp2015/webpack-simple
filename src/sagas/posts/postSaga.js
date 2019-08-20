import { call, put, takeLatest } from "redux-saga/effects";
import ApiPosts from "../../services/posts";
import { message } from "antd";
import { POST, MESSAGES } from "../../constants";

// get data
export function* loadPosts() {
  try {
    const posts = yield call(ApiPosts.fetchPosts);
    yield put({
      type: POST.LOAD_GET,
      payload: posts.data
    });
  } catch (error) {
    message.error(MESSAGES.Error.replace("{value}", "Network"));
  }
}
export function* actionWatcher() {
  yield takeLatest(POST.LOAD_POST_SUCCESS, loadPosts);
}
// remove data
export function* removePosts(action) {
  try {
    yield call(ApiPosts.deletePosts, action.payload);
    message.info(MESSAGES.SUCCESS.replace("{value}", "Remove"));
  } catch (error) {
    message.error(MESSAGES.Error.replace("{value}", "Network"));
  }
}
export function* actionRemovePosts() {
  yield takeLatest(POST.REMOVE_POSTS, removePosts);
}
// add data
export function* createPosts(action) {
  try {
    const posts = yield call(ApiPosts.addPosts, action.payload);
    yield put({
      type: POST.ADD_POST_SUCCESS,
      payload: posts.data
    });
    message.info(MESSAGES.SUCCESS.replace("{value}", "Add"));
  } catch (error) {
    message.error(MESSAGES.Error.replace("{value}", "Network"));
  }
}
export function* reviewAddPosts() {
  yield takeLatest(POST.ADD_POST, createPosts);
}
// diffirent takeEvery and takeLatest
