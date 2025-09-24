import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";

export default function App() {
  const [text, setText] = React.useState("");

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        
        <Card style={{ width: "100%", marginBottom: 20 }}>
          <Card.Title title="React Native Paper" subtitle="Demo Card" />
          <Card.Content>
            <Text>Welcome to Paper Components 🚀</Text>
          </Card.Content>
        </Card>

        <TextInput
          label="Type something"
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={{ width: "100%", marginBottom: 20 }}
        />

        <Button mode="contained" onPress={() => alert(`You typed: ${text}`)}>
          Press me
        </Button>

      </SafeAreaView>
    </PaperProvider>
  );
}
