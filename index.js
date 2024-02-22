/**
 * @format
 */

//TODO: check out https://github.com/welldone-software/why-did-you-render

import { AppRegistry } from 'react-native';
import i18n from './src/i18n.config';
import { name as appName } from './app.json';
import { Navigation } from './src/Navigation';

AppRegistry.registerComponent(appName, () => Navigation);
