import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeSetup =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      composeSetup
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;
