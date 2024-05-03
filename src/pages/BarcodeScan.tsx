import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {Code, CodeScannerFrame} from 'react-native-vision-camera';
import BarcodeScanner from '../components/BarcodeScanner.tsx';
import useCameraPermissions from '../hooks/useCameraPermission.tsx';
import ApiCaller from '../api/ApiCaller.tsx';

const BarcodeScan: React.FC = () => {
  const [barcodeData, setBarcodeData] = useState<Code | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [apiData, setApiData] = useState<any>(null);
  const hasPermission = useCameraPermissions();

  const onDataReceived = (data: any) => {
    setApiData(data);
  };

  const fetchData = (barcode: Code) => {
    ApiCaller({barcode, onDataReceived});
  };

  const handleBarcodeScanned = (codes: Code[], frame: CodeScannerFrame) => {
    if (codes.length > 0) {
      const scannedData: Code = codes[0];
      console.log(`바코드 스캔: ${scannedData}`);
      setBarcodeData(scannedData);
      setIsScanning(false);

      fetchData(scannedData);
    } else {
      console.log('바코드를 찾지 못했습니다.');
    }
  };

  if (!hasPermission) {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>카메라 사용 권한 없음</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{flex: 1}}>
      {isScanning ? (
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
      ) : (
        <React.Fragment>
          <Text>
            바코드:{' '}
            {barcodeData ? barcodeData.toString() : '바코드가 없습니다.'}
          </Text>
          <Button title="다시 스캔" onPress={() => setIsScanning(true)} />
        </React.Fragment>
      )}
      <Text>{apiData && JSON.stringify(apiData)}</Text>
    </SafeAreaView>
  );
};

export default BarcodeScan;
