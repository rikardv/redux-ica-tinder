import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  GO_TO_NEXT_PAGE,
  ADD_USER_SELECTION,
  REMOVE_USER_SELECTION,
  POST_USER_RECIPE_BEGIN,
  POST_USER_RECIPE_SUCCESS,
  POST_USER_RECIPE_FAILURE,
  RESET_PAGE_NR,
  FETCH_SAVED_RECIPES_BEGIN,
  FETCH_SAVED_RECIPES_SUCCESS,
  FETCH_SAVED_RECIPES_FAILURE,
  FETCH_RECIPE_INFO_BEGIN,
  FETCH_RECIPE_INFO_SUCCESS,
  FETCH_RECIPE_INFO_FAILURE,
  START_LOADING,
} from './actionTypes';
import {
  URL,
  AUTH_TICKET,
  POST_RECIPE_URL,
  RECIPE_BY_ID_URL,
  DELETE_RECIPE_URL,
} from './url';

let id = 0;

export function fetchProducts() {
  return (dispatch, getState) => {
    const state = getState();
    let filters = state.recipes.userSelected.join(',');
    let currentPage = state.recipes.currentPage;

    dispatch(fetchProductsBegin());
    return fetch(
      URL +
        `/api/recipes/searchwithfilters?phrase=&recordsPerPage=10&pageNumber=${currentPage}&sorting=0&filters=` +
        filters,
      {
        method: 'GET',
        headers: {
          AuthenticationTicket: AUTH_TICKET,
        },
      }
    )
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccess(json));
        return json.Recipes;
      })
      .catch((error) => dispatch(fetchProductsFailure(error)));
  };
}

export function fetchSavedRecipes() {
  return (dispatch) => {
    dispatch(fetchSavedRecipesBegin());
    return fetch(POST_RECIPE_URL, {
      method: 'GET',
      headers: {
        AuthenticationTicket: AUTH_TICKET,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchSavedRecipesSuccess(json));
        if (json.RecipeIds) {
          let recipeIds = json.RecipeIds.map((id) => id);
          dispatch(savedRecipesInfo(recipeIds));
        }
        return json;
      })
      .catch((error) => dispatch(fetchSavedRecipesFailure(error)));
  };
}

export function savedRecipesInfo(id) {
  return async (dispatch) => {
    dispatch(fetchRecipeInfoBegin());

    Promise.all(
      id.map(async (id) => {
        let url = RECIPE_BY_ID_URL + id.toString();
        const recipe = await fetch(url, {
          method: 'GET',
          headers: {
            AuthenticationTicket: AUTH_TICKET,
          },
        })
          .then(handleErrors)
          .then((res) => res.json())
          .then((json) => {
            //dispatch(fetchSavedRecipesSuccess(json));

            return json;
          })
          .catch((error) => dispatch(fetchRecipeInfoFailure(error)));
        return recipe;
      })
    ).then((values) => dispatch(fetchRecipeInfoSuccess(values)));

    //return dispatch(fetchSavedRecipeInfo(items));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

export function postRecipe(recipe) {
  let bodyParam = JSON.stringify({ Recipes: [recipe.Id] });
  return (dispatch) => {
    dispatch(postProductBegin());
    return fetch(POST_RECIPE_URL, {
      method: 'POST',
      headers: {
        AuthenticationTicket: AUTH_TICKET,
        'Content-Type': 'application/json',
      },
      body: bodyParam,
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(postProductSuccess());
      })
      .catch((error) => dispatch(postProductFailure(error)));
  };
}

export function deleteRecipe(id) {
  console.log(DELETE_RECIPE_URL + id);
  return (dispatch) => {
    dispatch(postProductBegin());
    return fetch(DELETE_RECIPE_URL + id, {
      method: 'DELETE',
      headers: {
        AuthenticationTicket: AUTH_TICKET,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {})
      .catch((error) => dispatch(postProductFailure(error)));
  };
}

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});
export const fetchProductsSuccess = (recipes) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: recipes,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const fetchSavedRecipesBegin = () => ({
  type: FETCH_SAVED_RECIPES_BEGIN,
});

export const fetchSavedRecipesSuccess = (recipes) => ({
  type: FETCH_SAVED_RECIPES_SUCCESS,
  payload: recipes,
});

export const fetchSavedRecipesFailure = (error) => ({
  type: FETCH_SAVED_RECIPES_FAILURE,
  payload: { error },
});

export const fetchRecipeInfoSuccess = (recipe) => ({
  type: FETCH_RECIPE_INFO_SUCCESS,
  payload: recipe,
});

export const fetchRecipeInfoBegin = () => ({
  type: FETCH_RECIPE_INFO_BEGIN,
});

export const fetchRecipeInfoFailure = (error) => ({
  type: FETCH_RECIPE_INFO_FAILURE,
  payload: { error },
});

export const resetPageNr = () => ({
  type: RESET_PAGE_NR,
});
export const goToNextPage = () => ({
  type: GO_TO_NEXT_PAGE,
});

export const addUserSelection = (selection) => ({
  type: ADD_USER_SELECTION,
  payload: selection,
});

export const removeUserSelction = (selection) => ({
  type: REMOVE_USER_SELECTION,
  payload: selection,
});

export const postProductBegin = () => ({
  type: POST_USER_RECIPE_BEGIN,
});

export const postProductSuccess = () => ({
  type: POST_USER_RECIPE_SUCCESS,
});

export const postProductFailure = (error) => ({
  type: POST_USER_RECIPE_FAILURE,
  payload: error,
});

export const startLoading = () => ({
  type: START_LOADING,
});
