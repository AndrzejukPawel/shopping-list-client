/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import i18n from './i18n.config';
import { Navigation } from './src/Navigation';

AppRegistry.registerComponent(appName, () => Navigation);
