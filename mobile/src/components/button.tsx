import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  textButton: string;
  isLoading?: boolean;
};

export function Button({ textButton, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
      disabled={isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500 " />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {textButton}
        </Text>
      )}
    </TouchableOpacity>
  );
}
