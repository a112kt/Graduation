// App.tsx
import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";

const customFonts = {
  "CinzelDecorative-Regular": require("./src/assests/fonts/CinzelDecorative-Regular.ttf"),
  "CinzelDecorative-Bold": require("./src/assests/fonts/CinzelDecorative-Bold.ttf"),
  "CinzelDecorative-Black": require("./src/assests/fonts/CinzelDecorative-Black.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn("Font loading error:", e);
      } finally {
        if (mounted) setFontsLoaded(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const theme = {
    ...DefaultTheme,
    fonts: {
      displayLarge: { fontFamily: "CinzelDecorative-Black", fontWeight: "900" },
      displayMedium: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      displaySmall: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },

      headlineLarge: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      headlineMedium: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      headlineSmall: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },

      titleLarge: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      titleMedium: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      titleSmall: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },

      bodyLarge: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },
      bodyMedium: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },
      bodySmall: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },

      labelLarge: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      labelMedium: { fontFamily: "CinzelDecorative-Bold", fontWeight: "700" },
      labelSmall: { fontFamily: "CinzelDecorative-Regular", fontWeight: "400" },
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

