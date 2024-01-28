import { Alert, AlertButton, AlertOptions } from "react-native";

export function alertWrapper({ title, message, buttons, options }: { title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions }) {
    return Alert.alert(title ?? '', message, buttons, options);
}
