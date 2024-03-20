import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("https://urbanutopia-tsdk.onrender.com/login", user)
      .then((response) => {
        console.log(response);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            marginTop: "20%",
            marginLeft: "5%",
            color: "#000000",
            fontWeight: "bold",
            fontSize: 35,
          }}
        >
          Login
        </Text>

        <View style={styles.Loginimgview}>
          <Image
            source={require("../assets/Login.png")}
            style={styles.Loginimg}
          />
        </View>

        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Email id"
            placeholderTextColor="#8C8C8C"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8C8C8C"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Register}>
          <Text style={styles.bottomtext}>Don’t have an account ? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.bottombuttontext}> Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Loginimg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    height: 307,
    width: 257,
  },
  Loginimgview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textbox: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 50,
  },
  input: {
    width: "88%",
    height: 60,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: "#E4E3E3",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 18,
    fontWeight: "normal",
  },
  buttons: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#1A4AFF",
    padding: "3.7%",
    height: 60,
    width: "88%",
    margin: 12,
    marginTop: 10,
    borderRadius: 7,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  Register: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  bottomtext: {
    color: "#8C8C8C",
    fontSize: 18,
  },

  bottombuttontext: {
    color: "#1A4AFF",
    fontSize: 18,
  },
});
