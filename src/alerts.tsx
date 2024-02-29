import i18n from "./i18n.config";
import { Alert, AlertButton, AlertOptions } from "react-native";

const { t } = i18n;

export function alertWrapper({ title, message, buttons, options }: { title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions }) {
  return Alert.alert(title ?? '', message, buttons, options);
}

export function alertError(message?: string) {
  return alertWrapper({
    title: t('errorAlertTitle'),
    message,
    buttons: [
      {
        text: t('sendReport'),
        // TODO: send report
        onPress: () => console.log('ERROR SENT REPORT'),
        style: 'cancel',
      },
      { text: t('close') },
    ]
  });
}
