import { Component, PropsWithChildren, ReactNode } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { backgroundColor } from "../Styles";

interface OverlayProps {
  toggle: boolean;
  color?: keyof typeof overlayColors;
  onEmptySpacePress?: () => void;
}

const overlayColors = {
  none: '#00000000',
  light: '#00000077',
  dark: '#000000bb',
  backgroundColor: backgroundColor,
}

export class Overlay extends Component<PropsWithChildren<OverlayProps>> {

  render(): ReactNode {
    if (!this.props.toggle) return <></>;

    return <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: !this.props.color ? overlayColors.light : overlayColors[this.props.color],
        }}
        onPress={this.props.onEmptySpacePress}
        activeOpacity={1}
      >
        {this.props.children}
      </TouchableOpacity>
    </View>
  }
}
