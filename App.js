import * as React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import SplashScreen from "./src/Screens/auth/SplashScreen";

const customFonts = {
  "CinzelDecorative-Regular": require("./src/assests/fonts/CinzelDecorative-Regular.ttf"),
  "CinzelDecorative-Bold": require("./src/assests/fonts/CinzelDecorative-Bold.ttf"),
  "CinzelDecorative-Black": require("./src/assests/fonts/CinzelDecorative-Black.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  const loadFonts = async () => {
    await Font.loadAsync(customFonts);
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(e) => console.warn("Font loading error:", e)}
      />
    );
  }

  const theme = {
    ...DefaultTheme,
    fonts: {
      regular: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },
      medium: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      light: { fontFamily: "CinzelDecorative-Regular", fontWeight: "300" },
      thin: { fontFamily: "CinzelDecorative-Regular", fontWeight: "100" },
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SplashScreen />
    </PaperProvider>
  );
}
