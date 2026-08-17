import { Image, View } from "@react-pdf/renderer";
import QRCode from "qrcode";
import type { Style } from "../../styles";

export type PdfQrCodeProps = {
  value: string;
  size?: number;
  style?: Style;
} & QRCode.QRCodeToDataURLOptions;

export function PdfQrCode({ value, size = 64, style = {}, ...options }: PdfQrCodeProps) {
  return (
    <View style={[style, { width: size, height: size }]}>
      <Image src={() => QRCode.toDataURL(value, options)} />
    </View>
  );
}
