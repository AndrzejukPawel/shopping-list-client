import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Button, FlatList, Alert } from "react-native";
import { apiClient } from "../../api/ApiClient";
import { GroceryListModel } from "../../api/models/groceryList";
import { GroceryListsItem } from "./components/GroceryListsItem";
import { groceryListsStyle } from "../../Styles";
import { alertWrapper } from "../../alerts";

type Params = {
  GroceryList: { id: number };
};

type Props = { navigation: NativeStackNavigationProp<Params> };

export function GroceryLists({ navigation }: Props) {

  const [data, setData] = useState<GroceryListModel[]>();

  const fetchData = async () => {
    const response = await apiClient.getGroceryLists();
    setData(await response?.json());
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { t } = useTranslation();

  return <View style={groceryListsStyle.container}>
    <FlatList data={data} renderItem={(info) => {
      return <GroceryListsItem
        key={info.item.id}
        groceryList={info.item}
        onPressView={() => {
          console.log(`View item: ${info.item.id}`);
          navigation.navigate('GroceryList', { id: info.item.id });
        }}
        onPressDelete={() => {

          alertWrapper({
            message: t('areYouSureYouWantToDelete', { items: info.item.name }),
            buttons: [
              {
                text: t('yes'), onPress: () => {
                  apiClient.deleteGroceryList(info.item.id)
                    .then((response) => {
                      if (response?.ok) {
                        setData(data?.filter((list) => list.id != info.item.id));

                        alertWrapper({
                          message: t('itemSuccessfullyDeleted', { item: info.item.name }),
                          buttons: [{ text: t('ok') }],
                          options: { cancelable: true },
                        });
                      }
                      // TODO: send report
                      alertWrapper({
                        title: t('errorAlertTitle'),
                        message: response?.statusText,
                        buttons: [
                          {
                            text: t('sendReport'),
                            onPress: () => console.log('ERROR SENT REPORT'),
                            style: 'cancel',
                          },
                          { text: t('close') },
                        ]
                      });
                    });
                }
              },
              {
                text: t('no'),
                style: 'cancel',
              },
            ]
          });
        }} />
    }}>

    </FlatList>
  </View>
}
