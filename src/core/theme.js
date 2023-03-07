import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#0FA958',
    secondary: '#FFCF35',
    error: '#f13a59',
    buttonBackground: '#0FA958',
    white: '#FFFFFF',
    black: '#000000',
    inactive: '#808080',
    active: '#00AD79',
    // tabBarBackground: "#0FA958"
    tabBarBackground: "#2E8B57"

    // tabBarBackground: "#4CBB17"
    // tabBarBackground: "#7FFF00"
    // tabBarBackground: "#32CD32"
    // tabBarBackground: "#00FF7F"
    // tabBarBackground: "#355E3B"
  },
};
