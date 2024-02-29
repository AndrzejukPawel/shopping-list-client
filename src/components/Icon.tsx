import { Component, ReactNode } from "react";
import { ColorValue, Text } from "react-native";

interface IconProps {
  color: ColorValue;
  text: string;
  fontSize: number;
}

export class Icon extends Component<IconProps> {
  render(): ReactNode {
    return <Text style={{
      paddingLeft: this.props.fontSize / 4,
      color: this.props.color,
      aspectRatio: 1,
      fontFamily: "fa-solid-900",
      fontSize: this.props.fontSize,
      textAlign: 'center',
      textAlignVertical: 'center',
    }}>{this.props.text} </Text>
  }
}
