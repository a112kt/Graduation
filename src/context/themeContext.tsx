import { Colors } from "../constants/colors"
import { ColorSet } from "../../types";
import { createContext, useState } from "react";
import { Appearance } from "react-native";
export type values = {
  colorScheme: "light" | "dark" | null | undefined;
  setColorScheme: React.Dispatch<
    React.SetStateAction<"light" | "dark" | null | undefined>
  >;
  theme: ColorSet;
};
export const themeContext = createContext<values | null>(null);
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  let theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <themeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </themeContext.Provider>
  );
}
