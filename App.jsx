import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { View,ActivityIndicator } from "react-native";
import ThemeProvider from "./src/context/themeContext";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";
<<<<<<< HEAD
import { 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import { CinzelDecorative_400Regular } from "@expo-google-fonts/cinzel-decorative";
import { Lato_400Regular, Lato_500Medium } from "@expo-google-fonts/lato";

export default function App() {
  const [loaded,error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    CinzelDecorative_400Regular,
    Lato_400Regular,
    Lato_500Medium,
  });
=======
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const customFonts = {
  "CinzelDecorative-Regular": require("./src/assests/fonts/CinzelDecorative-Regular.ttf"),
  "CinzelDecorative-Bold": require("./src/assests/fonts/CinzelDecorative-Bold.ttf"),
  "CinzelDecorative-Black": require("./src/assests/fonts/CinzelDecorative-Black.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const queryClient = new QueryClient()
>>>>>>> Feature/axios

  if (!loaded &!error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
<<<<<<< HEAD
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
=======
   <QueryClientProvider client={queryClient}>
     <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
     </PaperProvider>
    </QueryClientProvider>
>>>>>>> Feature/axios
  );
}
