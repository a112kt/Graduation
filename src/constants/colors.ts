/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';




export const Colors = {
  light: {
    mainColors: {
      primary: "#1B2351",
      secondary: "#47C0D2",
      white: "#FEFEFE",
      black: "#000814",
    },
    backgroundColors: {
      main: "#F6F3EC",
      light: "#F5F5F5",
      heavy: "#50546E",
      bottomSheet: "#FFFFFF",
      success: "#EDFFF6",
      info: "#DDEEFD",
      warning: "#FEF3C7",
      danger: "#FEE2E2",
      uploadBg: "#EBEBEB",
    },
    typographyColors: {
      title: "#383644",
      subtitle: "#535456",
      body: "#30343C",
      hint: "#ABADB6",
      link: "#3E548D",
      success: "#10B981",
      info: "#4A90E2",
      warning: "#F59E0B",
      danger: "#EF4444",
      secondary: "#FE6239",
      inactive: "#919193",
    },
    buttonsColors: {
      primary: "#1B2351",
      secondary: "#47C0D2",
      label: "#666666",
      bgInactive: "#EBEBEB",
      primaryHover: "#4D26A0",
      primaryPressed: "#000C53",
      primaryDisabled: "#838AB2",
      secondaryHover: "#3BB0C1",
      secondaryPressed: "#CC482A",
      secondaryDisabled: "#9FDDE6",
    },
    inputsColors: {
      background: "#ffffff",
      border: "#D0D5DD",
      label: "#1B2351",
      placeholder: "#667085",
      inactiveText: "#98A1B2",
    },
    iconsColors: {
      primary: "#1B2351",
      secondary: "#47C0D2",
      light: "#CDD5DF",
      gray: "#6F7073",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
    },
    separatingColors: {
      border: "#D0D5DD",
      separator: "#D2D3D4",
    },
},

dark: {
  mainColors: {
    primary: "#47C0D2", 
    secondary: "#1B2351",
    white: "#FFFFFF",
    black: "#000000",
  },
  backgroundColors: {
    main: "#121212",
    light: "#1E1E1E",
    heavy: "#2C2C2C",
    bottomSheet: "#1A1A1A",
    success: "#003E1F",
    info: "#0C2D48",
    warning: "#4A3C00",
    danger: "#4A0E0E",
    uploadBg: "#2A2A2A",
  },
  typographyColors: {
    title: "#FFFFFF",
    subtitle: "#E0E0E0",
    body: "#CFCFCF",
    hint: "#9E9E9E",
    link: "#47C0D2",
    success: "#34D399",
    info: "#60A5FA",
    warning: "#FBBF24",
    danger: "#F87171",
    secondary: "#FE6239",
    inactive: "#6B7280",
  },
  buttonsColors: {
    primary: "#47C0D2",
    secondary: "#1B2351",
    label: "#E0E0E0",
    bgInactive: "#2A2A2A",
    primaryHover: "#3BB0C1",
    primaryPressed: "#2C8E99",
    primaryDisabled: "#4C4C4C",
    secondaryHover: "#252A55",
    secondaryPressed: "#0F1535",
    secondaryDisabled: "#3A3A3A",
  },
  inputsColors: {
    background: "#1E1E1E",
    border: "#3C3C3C",
    label: "#47C0D2",
    placeholder: "#A0A0A0",
    inactiveText: "#7C7C7C",
  },
  iconsColors: {
    primary: "#47C0D2",
    secondary: "#1B2351",
    light: "#9E9E9E",
    gray: "#7C7C7C",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
  },
  separatingColors: {
    border: "#3C3C3C",
    separator: "#2A2A2A",
  },
}

};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
