import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { connect } from 'react-redux';
import {
  fetchSavedRecipes,
  deleteRecipe,
  startLoading,
} from '../redux/actions';
import WavyHeader from './WavyHeader';
import RenderHTML from 'react-native-render-html';
import Loading from '../components/Loading';

interface UserRecipe {
  Id: string;
  Title: string;
  ImageUrl: string;
  IngredientGroups: Ingredients[];
  PreambleHTML: string;
  CookingSteps: string[];
  CookingStepsWithTimers: Step[];
  Difficulty: string;
}

interface Step {
  Description: string;
  TimersInMinutes: [];
}

interface Ingredients {
  Portions: string;
  Ingredients: Ingredient[];
}

interface Ingredient {
  Text: string;
  Quantity: number;
  Unit: string;
  IngredientId: number;
}

interface Props {
  savedRecipesInfo: UserRecipe[];
  loading: boolean;
  error: {
    message: string;
  };
  dispatch: any;
}

class MyRecipes extends Component<Props, {}> {
  componentDidMount() {
    this.props.dispatch(fetchSavedRecipes());
  }

  handleDelete(e) {
    this.props.dispatch(deleteRecipe(e));
    this.props.dispatch(startLoading());
    setTimeout(() => {
      this.props.dispatch(fetchSavedRecipes());
    }, 5000);
  }
  render() {
    return (
      <ScrollView>
        <WavyHeader />
        {this.props.loading || this.props.error ? (
          <Loading />
        ) : (
          <View>
            {this.props.savedRecipesInfo &&
              this.props.savedRecipesInfo.map((e) => (
                <Card containerStyle={{ borderRadius: 25, borderWidth: 0 }}>
                  <Card.Title>{e.Title}</Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{ padding: 0 }}
                    source={{
                      uri: e.ImageUrl,
                    }}
                  />
                  <Text h4 style={{ fontWeight: '900' }}>
                    Instruktioner
                  </Text>
                  {e &&
                    e.CookingStepsWithTimers.map((step) => (
                      <View style={{ margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '900' }}>
                          <RenderHTML
                            source={{
                              html: `<p style='font-size: 14px;'>${step.Description}</p>`,
                            }}
                            contentWidth={Dimensions.get('window').width}
                          />
                        </Text>
                        <Divider />
                      </View>
                    ))}
                  <Text h4 style={{ fontWeight: '900' }}>
                    Ingredienser
                  </Text>
                  <View style={{ padding: 10 }}>
                    {e.IngredientGroups.map((e) => (
                      <View>
                        {e.Ingredients.map((res) => (
                          <Text>{res.Text}</Text>
                        ))}
                      </View>
                    ))}
                    {/* {e.IngredientGroups &&
                      e.IngredientGroups.Ingredients.map((step) => (
                        <Text style={{ fontWeight: '400', fontSize: 16 }}>
                          {step.Text}
                        </Text>
                      ))} */}
                  </View>

                  <Button
                    title='Ta bort recept'
                    style={{ margin: 10 }}
                    onPress={() => this.handleDelete(e.Id)}
                  />
                  <Button title='Lägg i shoppinglista' style={{ margin: 10 }} />
                </Card>
              ))}
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any, myOwnProps: any) => {
  return {
    savedRecipesInfo: state.recipes.savedRecipesInfo,
    loading: state.recipes.loading,
    error: state.recipes.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSavedRecipes,
  deleteRecipe,
  startLoading,
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);
