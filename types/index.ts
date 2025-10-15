export type ColorSet = {

 mainColors: {
    primary: string;
    secondary: string;
    white: string;
    black: string;
  };
  backgroundColors: {
    main: string;
    light: string;
    heavy: string;
    bottomSheet: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    uploadBg: string;
  };
  typographyColors: {
    title: string;
    subtitle: string;
    body: string;
    hint: string;
    link: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    secondary: string;
    inactive: string;
  };
  buttonsColors: {
    primary: string;
    secondary: string;
    label: string;
    bgInactive: string;
    primaryHover: string;
    primaryPressed: string;
    primaryDisabled: string;
    secondaryHover: string;
    secondaryPressed: string;
    secondaryDisabled: string;
  };
  inputsColors: {
    background: string;
    border: string;
    label: string;
    placeholder: string;
    inactiveText: string;
  };
  iconsColors: {
    primary: string;
    secondary: string;
    light: string;
    gray: string;
    success: string;
    warning: string;
    danger: string;
  };
  separatingColors: {
    border: string;
    separator: string;
  }
};
import { TextStyle } from "react-native";

export type Typography = {
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  titleSpecial: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  captionLarge: TextStyle;
  captionMedium: TextStyle;
  captionSmall: TextStyle;
  inputLabel: TextStyle;
  inputError: TextStyle;
  link: TextStyle;
  lato: TextStyle;
};