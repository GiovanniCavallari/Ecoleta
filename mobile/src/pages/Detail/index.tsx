import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import * as MailComposer from 'expo-mail-composer';
import api from "../../services/api";

import styles from "./styles";

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: { title: string }[];
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleComposeMail = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos.',
      recipients: [data.point.email],
    })
  };

  const handleWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=+5511${data.point.whatsapp}&text=Tenho interesse na coleta de resíduos`);
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: data.point.image_url }}
        />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereços</Text>
          <Text style={styles.addressContent}>{`${data.point.city}, ${data.point.uf}`}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
