import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  Code,
  CodeScannerFrame,
} from 'react-native-vision-camera';
import ApiCaller from '../api/ApiCaller.tsx';

interface BarcodeScannerProps {
  onBarcodeScanned?: (codes: Code[], frame: CodeScannerFrame) => void;
}
const BarcodeScanner: React.FC<BarcodeScannerProps> = ({onBarcodeScanned}) => {
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes, frame) => {
      if (onBarcodeScanned) {
        onBarcodeScanned(codes, frame);
        const barcodeData = codes[0];
        <ApiCaller
          barcode={barcodeData}
          onDataReceived={(data) => console.log(data)}
        />;
      }
    },
  });

  if (device == null) return null;

  return (
    <Camera
      style={{flex: 1}}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};

export default BarcodeScanner;
