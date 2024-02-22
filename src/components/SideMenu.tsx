import { Component, PropsWithChildren, ReactElement, ReactNode } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Overlay } from "./Overlay";
import { SideMenuElement } from "./SideMenuElement";

interface SideMenuProps {
  toggle?: boolean;
  menuItems: {
    text: string,
    onPress: () => void,
  }[];
  onBackgroundClick: () => void;
}

export class SideMenu extends Component<PropsWithChildren<SideMenuProps>> {
  render(): ReactNode {
    if (!this.props.toggle) return <></>;

    return <Overlay toggle={this.props.toggle} onEmptySpacePress={() => this.props.onBackgroundClick()}>
      <ScrollView
        style={style.list}>
        {
          this.props.menuItems.map((item, idx) => {
            return <SideMenuElement
              key={idx}
              text={item.text}
              onPress={item.onPress} />;
          })
        }
      </ScrollView>
    </Overlay >;
  }
}

const style = StyleSheet.create({
  list: {
    alignSelf: 'flex-end',
    display: 'flex',
    minWidth: '25%',
  }
})
