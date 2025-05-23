import { Image, StatusBar, View } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import { Input } from "@/components/input";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useRef } from "react";

export default function Register() {
  const infos = useRef({
    name: "",
    email: "",
  });

  const handleRegister = () => {
    if (!infos.current.email.trim() || !infos.current.name.trim()) return;

    router.push("/ticket");
  };

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={(value) => (infos.current.name = value)}
          />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={(value) => (infos.current.email = value)}
          />
        </Input>
        <Button textButton="Realizar inscrição" onPress={handleRegister} />
        <Link href="/">Já possui ingresso ?</Link>
      </View>
    </View>
  );
}
