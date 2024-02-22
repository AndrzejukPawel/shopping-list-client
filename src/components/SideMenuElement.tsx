import { Component, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor } from "../Styles";

interface SideMenuElementParams {
  text: string;
  onPress: () => void;
}

export class SideMenuElement extends Component<SideMenuElementParams> {
  render(): ReactNode {
    return <View style={style.container}>
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={style.text}>{this.props.text}</Text>
      </TouchableOpacity>
    </View>

  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor,
    borderRadius: 6,
    marginVertical: 1
  },
  touchArea: {

  },
  text: {
    color: "white",
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 18
  }
});
