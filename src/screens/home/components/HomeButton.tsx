import { View, Text, ImageBackground, TouchableOpacity, GestureResponderEvent } from "react-native";
import { homeStyle } from "../../../Styles";

export function HomeButton({ text, image, onPress }: { text: string, image: string, onPress: ((event: GestureResponderEvent) => void) }) {
    return <TouchableOpacity style={homeStyle.touchable} onPress={onPress}>
        <ImageBackground style={homeStyle.background} imageStyle={homeStyle.backgroundImage} source={{ uri: image }} >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
            </View>
            <Text style={homeStyle.buttonText}>{text}</Text>
        </ImageBackground>
    </TouchableOpacity>
}
