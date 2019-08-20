import { all } from "redux-saga/effects";
import {
  actionWatcher,
  actionRemovePosts,
  reviewAddPosts
} from "./posts/postSaga";

export function* rootSaga() {
  yield all([actionWatcher(), actionRemovePosts(), reviewAddPosts()]);
}
