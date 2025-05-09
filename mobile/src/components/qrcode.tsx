import { colors } from "@/styles/colors";
import QRCodeSvg from "react-native-qrcode-svg";

interface Props {
  value: string;
  size: number;
}

export function QRCode({ size, value }: Props) {
  return (
    <QRCodeSvg
      value={value}
      size={size}
      color={colors.white}
      backgroundColor="transparent"
    />
  );
}
