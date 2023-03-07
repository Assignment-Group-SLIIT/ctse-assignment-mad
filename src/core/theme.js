import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#1ebeff',
    secondary: '#FFFFFFFF',
    error: '#f13a59',
    buttonBackground: '#1ebeff',
    white: '#FFFFFF',
    black: '#000000',
    inactive: '#808080',
    active: '#1ebeff',
    tabBarBackground: "#1ebeff"
  },
};
