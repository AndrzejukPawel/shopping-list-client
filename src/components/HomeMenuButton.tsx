import { View, Text, ImageBackground, TouchableOpacity, GestureResponderEvent } from "react-native";
import { homeStyle } from "../Styles";
import { Component, ReactNode } from "react";

interface HomeMenuButtonProps {
  text: string;
  image: string;
  onPress: ((event: GestureResponderEvent) => void);
}

export class HomeMenuButton extends Component<HomeMenuButtonProps> {
  render() {
    return <TouchableOpacity style={homeStyle.touchable} onPress={this.props.onPress}>
      <ImageBackground
        style={homeStyle.background}
        imageStyle={homeStyle.backgroundImage}
        source={{ uri: this.props.image }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
        </View>
        <Text style={homeStyle.buttonText}>{this.props.text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  }
}
