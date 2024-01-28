import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { View, Button } from "react-native";
type Params = {
    Home: undefined;
};

type Props = { navigation: NativeStackNavigationProp<Params> };

export function GroceryItemList({ navigation }: Props) {
    const { t } = useTranslation();
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title={t('buttonGroceryItemList')} onPress={() => navigation.goBack()}></Button>
    </View>
}



