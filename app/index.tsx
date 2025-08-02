// App.js
import { auth } from "@/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "",
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      if (!signInResult.data?.idToken) {
        throw new Error("Google Sign In failed. try later");
      }
      // 3. Get Firebase credential from Google token
      const googleCredential = GoogleAuthProvider.credential(
        signInResult.data?.idToken
      );

      const userCredential = await signInWithCredential(auth, googleCredential);

      const firebaseIdToken = await userCredential.user.getIdToken();

      console.log({
        signInResult: signInResult.data?.idToken,
        firebaseIdToken,
      });

      const userdata = await fetch("http://192.168.100.6:3000/protected", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firebaseIdToken}`,
        },
      });

      const response = await userdata.json();

      console.log({ response });
    } catch (error) {
      console.log({
        error,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Login</Text>

      <View style={{ marginVertical: 10 }} />
      <Button
        title="Sign in with Google"
        onPress={() => onGoogleButtonPress()}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {response && (
        <View style={styles.response}>
          <Text>✅ Authenticated</Text>
          <Text>UID: {response.uid}</Text>
          <Text>Email: {response.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  error: { color: "red", marginTop: 10 },
  response: { marginTop: 20 },
});
