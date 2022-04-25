import {
  ADD_RECIPE,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  GO_TO_NEXT_PAGE,
  ADD_USER_SELECTION,
  REMOVE_USER_SELECTION,
  RESET_PAGE_NR,
  FETCH_SAVED_RECIPES_SUCCESS,
  FETCH_SAVED_RECIPES_BEGIN,
  FETCH_SAVED_RECIPES_FAILURE,
  FETCH_RECIPE_INFO_SUCCESS,
  FETCH_RECIPE_INFO_BEGIN,
  FETCH_RECIPE_INFO_FAILURE,
  START_LOADING,
} from '../actionTypes';

const INITIAL_STATE = {
  recipeCards: [
    {
      Id: 1,
      Title: 'Inga recept hittades',
      CookingTimeMinutes: '30',
      ImageUrl: '',
      AverageRating: 5,
      IngredientGroups: null,
      Difficulty: 'Medel',
    },
  ],
  savedRecipesIds: [],
  savedRecipesInfo: [],
  loading: false,
  error: null,
  currentPage: 1,
  userSelections: [
    'Fisk',
    'Grönsaker',
    'Kött',
    'Kyckling',
    'Korv',
    'Ost',
    'Rotfrukter',
    'Skaldjur',
    'Svamp',
    'Bönor',
    'Förrätt',
    'Efterrätt',
    'Huvudrätt',
    'Dryck',
    'Mellanmål',
    'Glutenfri',
    'Laktosfri',
    'Vegan',
    'Vegetarisk',
    'Äggfri',
  ],
  userSelected: ['Huvudrätt'],
  TotalNumberOfRecipes: 0,
};

// action is an object -> {type: 'ADD_TODO', payload:{id:1, task:"matulog"} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        recipeCards: action.payload.Recipes,
        TotalNumberOfRecipes: action.payload.TotalNumberOfRecipes,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    case FETCH_SAVED_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        savedRecipesIds: action.payload,
      };

    case FETCH_SAVED_RECIPES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SAVED_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_RECIPE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        savedRecipesInfo: action.payload,
      };

    case FETCH_RECIPE_INFO_BEGIN:
      return {
        ...state,
        loading: false,
      };

    case FETCH_RECIPE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case GO_TO_NEXT_PAGE:
      return {
        ...state,
        currentPage: ++state.currentPage,
      };

    case RESET_PAGE_NR:
      return {
        ...state,
        currentPage: 1,
      };

    case ADD_USER_SELECTION:
      return {
        ...state,
        userSelected: [...state.userSelected, action.payload],
      };

    case REMOVE_USER_SELECTION:
      return {
        ...state,
        userSelected: state.userSelected.filter((e) => e !== action.payload),
      };

    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
