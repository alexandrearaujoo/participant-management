import { colors } from "@/styles/colors";
import { ReactElement } from "react";
import { TextInput, View, TextInputProps } from "react-native";

function Input({ children }: { children: ReactElement[] }) {
  return (
    <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
