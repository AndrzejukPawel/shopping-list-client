import { Component, ReactNode } from "react";
import { Overlay } from "./Overlay";
import { ActivityIndicator } from "react-native";

interface PleaseWaitOverlayProps {
  toggle: boolean;
}

export class PleaseWaitOverlay extends Component<PleaseWaitOverlayProps> {
  render(): ReactNode {
    if (!this.props.toggle) return <></>

    return <Overlay toggle={this.props.toggle}>
      <ActivityIndicator style={{ flex: 1 }} size={"large"} />
    </Overlay>
  }
}
