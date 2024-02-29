import { Component, ReactNode } from "react";
import { ColorValue, DimensionValue, View } from "react-native";
import { Icon } from "./Icon";

interface CheckboxProps {
  color?: ColorValue;
  borderColor?: ColorValue;
  symbol?: string,
  width: DimensionValue;
  height: DimensionValue;
  fontSize: number;
  value: boolean | undefined;
}

export class Checkbox extends Component<CheckboxProps> {
  render(): ReactNode {
    return <View style={{
      borderColor: this.props.borderColor ?? 'white',
      borderWidth: 1,
      borderRadius: 12,
      flexShrink: 1,
      aspectRatio: 1,
      width: this.props.width,
      height: this.props.height,
      alignContent: 'center',
      justifyContent: 'center'
    }}>
      <Icon
        text={this.props.symbol ?? '\u2713'}
        color={this.props.value ? this.props.color ?? '#58bf69' : '#ffffff00'}
        fontSize={28}></Icon>
    </View>
  }
}
