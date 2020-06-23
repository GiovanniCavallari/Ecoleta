import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/logo.png";
import background from "../../assets/home-background.png";

import styles from "./styles";

const Home = () => {
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  const navigation = useNavigation();

  const handleNavigateToPoint = () => {
    navigation.navigate("Points", {
      uf,
      city,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={background}
        style={styles.container}
        resizeMode="contain"
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={logo} />
          <Text style={styles.title}>
            Seu marketplace para coleta de resíduos
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setUf}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoint}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
