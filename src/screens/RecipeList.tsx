import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export function RecipeList() {
    const { t } = useTranslation();
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{"Recipe list"}</Text>
    </View>
}
