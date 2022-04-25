import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  CheckBox,
  ListItem,
  Avatar,
  Text,
} from '@rneui/themed';

interface Props {
  isVisible: boolean;
  toggle: any;
  preambleHTML: string;
  ingredients: [
    {
      Ingredients: [
        {
          Text: string;
        }
      ];
    }
  ];
}

class RecipeDialog extends Component<Props, {}> {
  render() {
    return (
      <Dialog
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.toggle}
      >
        <Dialog.Title title='Ingredienser' />
        {this.props.ingredients.map((e) => (
          <View>
            {e.Ingredients.map((e) => (
              <Text>{e.Text}</Text>
            ))}
          </View>
        ))}
        <Dialog.Title title='Om mig' />
        <Text>{this.props.preambleHTML}</Text>
      </Dialog>
    );
  }
}

export default RecipeDialog;
