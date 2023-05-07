import { takeLatest, put, all, call } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.type";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}

type Alien = {
  fly: () => {};
};

type Human = {
  speak: () => {};
};

function isHuman(entity: Human | Alien): entity is Human {
  return (entity as Human).speak != undefined;
}
