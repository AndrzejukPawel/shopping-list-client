import { Component, ReactNode } from "react";
import { Text } from "react-native";

interface IconProps {
  color: string;
  text: string;
  size: number;
}

export class Icon extends Component<IconProps> {
  render(): ReactNode {
    return <Text style={{
      fontFamily: "fa-solid-900",
      fontSize: this.props.size,
    }}>{this.props.text} </Text>
  }
}
