import QRCode from "qrcode";
import { Image, View } from "@react-pdf/renderer";
import { forceRemountOnFastRefresh } from "../../../../utilities/fast-refresh";
import { Style } from "../../styles";

// TODO
forceRemountOnFastRefresh(module);

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
