import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Button, Icon, Switch } from '@rneui/themed';
import { connect } from 'react-redux';
import {
  addUserSelection,
  removeUserSelction,
  resetPageNr,
  fetchProducts,
} from '../redux/actions';
import WavyHeader from '../screens/WavyHeader';

interface Selection {
  userSelections: string[];
  userSelected: string[];
  dispatch: any;
  navigation: any;
}

class Settings extends Component<Selection, {}> {
  addSelection(value: boolean, selection: string) {
    if (value) {
      this.props.dispatch(addUserSelection(selection));
    } else {
      this.props.dispatch(removeUserSelction(selection));
    }
  }

  handleSave() {
    this.props.dispatch(resetPageNr());
    this.props.dispatch(fetchProducts());
    this.props.navigation.navigate('Hitta recept');
  }
  render() {
    return (
      <ScrollView>
        <WavyHeader />
        <Card>
          <Card.Title>Mina val</Card.Title>
          <Card.Divider />

          <View style={{ marginBottom: 10, flexDirection: 'column' }}>
            {this.props.userSelections.map((s) => (
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Text style={{ width: 100, fontWeight: '500' }}>{s}</Text>
                <Switch
                  value={this.props.userSelected.includes(s)}
                  onValueChange={(value) => this.addSelection(value, s)}
                />
              </View>
            ))}
          </View>
        </Card>
        <Button title={'Ladda om recept'} onPress={() => this.handleSave()} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any, myOwnProps: any) => {
  return {
    userSelections: state.recipes.userSelections,
    userSelected: state.recipes.userSelected,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeUserSelction,
  addUserSelection,
  resetPageNr,
  fetchProducts,
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
