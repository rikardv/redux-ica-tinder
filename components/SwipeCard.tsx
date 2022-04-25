import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import { fetchProducts, goToNextPage, postRecipe } from '../redux/actions';
import { Text, Card, Button, Icon, AirbnbRating } from '@rneui/themed';
import RecipeDialog from './RecipeDialog';
import Loading from '../components/Loading';
import { COLOR } from '../colors';

interface Recipes {
  recipes: {
    recipeCards: [];
    loading: boolean;
    error: {
      message: string;
    };
    currentPage: number;
    TotalNumberOfRecipes: number;
  };
}

interface MyProps {
  recipeCards: [];
  loading: boolean;
  error: {
    message: string;
  };
  dispatch: any;
  currentPage: number;
  TotalNumberOfRecipes: number;
}

interface Recipe {
  Title: string;
  Id: boolean;
  ImageUrl: string;
  PreambleHTML: string;
  AverageRating: number;
  CookingTimeMinutes: string;
  IngridientGroups: [
    {
      Portions: string;
      Ingredients: [
        {
          Text: string;
        }
      ];
    }
  ];
  Difficulty: string;
}

interface MyState {
  isSwiping: boolean;
  swipeText: string;
  openDialog: boolean;
  infoText: string;
  ingredients: any;
}

class SwipeCard extends Component<MyProps, MyState> {
  state = {
    isSwiping: false,
    swipeText: '',
    openDialog: false,
    infoText: '',
    ingredients: [],
  };

  componentDidMount(): void {
    this.props.dispatch(fetchProducts());
  }

  fetchNewRecipes() {
    this.props.dispatch(goToNextPage());
    this.props.dispatch(fetchProducts());
  }

  openDialog(card) {
    this.setState({
      openDialog: true,
      infoText: card.PreambleHTML,
      ingredients: card.IngredientGroups,
    });
  }

  closeDialog = () => {
    console.log('closing dialog');
    this.setState({ openDialog: false });
  };

  render() {
    if (this.props.error) {
      return (
        <View style={{ flex: 6 }}>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }

    if (this.props.loading) {
      return (
        <View style={{ flex: 6 }}>
          <Loading />
        </View>
      );
    }

    if (this.props.TotalNumberOfRecipes <= 0) {
      return (
        <View style={{ flex: 6 }}>
          <Text>Inga recept, ändra filterinställningar</Text>
        </View>
      );
    }

    return (
      <>
        {this.state.isSwiping ? (
          <View
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              zIndex: 1,
              alignSelf: 'center',
              marginTop: 90,

              padding: 5,
            }}
          >
            <Text
              h3
              style={{
                alignSelf: 'center',
                fontWeight: '900',
                color: 'white',
              }}
            >
              {this.state.swipeText}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            flex: 6,
            justifyContent: 'center',
          }}
        >
          <Swiper
            stackSize={2}
            cardHorizontalMargin={0}
            containerStyle={{ height: '100%' }}
            cardStyle={{ height: '100%' }}
            cardVerticalMargin={0}
            verticalSwipe={false}
            backgroundColor='transparent'
            cards={this.props.recipeCards && this.props.recipeCards}
            onSwipedAll={() => this.fetchNewRecipes()}
            onSwiped={() => this.setState({ swipeText: '', isSwiping: false })}
            onSwiping={(card) => {
              if (card > 0)
                this.setState({
                  isSwiping: true,
                  swipeText: 'Låter gott!😍',
                });
              else
                this.setState({ isSwiping: true, swipeText: 'Nej tack! 🤮' });
            }}
            onSwipedAborted={() => this.setState({ isSwiping: false })}
            onSwipedRight={(e) =>
              this.props.dispatch(postRecipe(this.props.recipeCards[e]))
            }
            renderCard={(card: Recipe) => {
              return (
                <Card
                  containerStyle={{
                    borderRadius: 25,
                    borderWidth: 1,
                  }}
                >
                  <Card.Title>
                    {card && card.Difficulty} {card && card.CookingTimeMinutes}{' '}
                    minuter
                  </Card.Title>
                  <Card.Divider />
                  <Image
                    source={{ uri: card.ImageUrl }}
                    style={{ height: '70%' }}
                  />

                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      fontWeight: '900',
                    }}
                  >
                    {card && card.Title}
                  </Text>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                  >
                    <AirbnbRating
                      size={20}
                      showRating={false}
                      count={5}
                      defaultRating={card && card.AverageRating}
                      reviewColor={COLOR}
                      selectedColor={COLOR}
                      isDisabled
                    />
                    <TouchableOpacity
                      onPress={() => this.openDialog(card)}
                      style={{ marginLeft: 10 }}
                    >
                      <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={20}
                      ></Icon>
                    </TouchableOpacity>
                  </View>
                  {/* 
                  <Button
                    buttonStyle={{ backgroundColor: '#e26d5c' }}
                    titleStyle={{ fontWeight: '900' }}
                    title='Visa ingredienser'
                    containerStyle={{ borderRadius: 30, margin: 5 }}
                    onPress={() => this.openDialog()}
                  ></Button>
                  <Text
                    style={{
                      margin: 10,
                      textAlign: 'center',
                      fontWeight: '400',
                    }}
                  >
                    {card && card.PreambleHTML}
                  </Text> */}
                </Card>
              );
            }}
          ></Swiper>
        </View>

        <RecipeDialog
          isVisible={this.state.openDialog}
          toggle={this.closeDialog}
          preambleHTML={this.state.infoText}
          ingredients={this.state.ingredients}
        />
      </>
    );
  }
}

const mapStateToProps = (state: Recipes, myOwnProps) => {
  return {
    recipeCards: state.recipes.recipeCards,
    loading: state.recipes.loading,
    error: state.recipes.error,
    currentPage: state.recipes.currentPage,
    NrRecipes: state.recipes.TotalNumberOfRecipes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postRecipe,
  fetchProducts,
  goToNextPage,
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SwipeCard);
