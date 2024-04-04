import { Image, StatusBar, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Input } from "@/components/input";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link } from "expo-router";
import { useRef } from "react";

export default function Home() {
  const code = useRef("")

  const handleAccessCredential = () => {
    if (!code.current.trim()) return 

    
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
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={(value) => code.current = value}
          />
        </Input>
        <Button
          textButton="Acessar credencial"
          onPress={handleAccessCredential}
        />
        <Link href="/register">Ainda não possui ingresso ?</Link>
      </View>
    </View>
  );
}
