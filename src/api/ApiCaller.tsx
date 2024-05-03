import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Code} from 'react-native-vision-camera';

interface ApiCallerProps {
  barcode: Code;
  onDataReceived: (data: any) => void;
}

const ApiCaller: React.FC<ApiCallerProps> = ({barcode, onDataReceived}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://openapi.foodsafetykorea.go.kr/api/ecd857afaec64b88a2a9/I2570/json/1/5/BCRD_NO=${barcode}`,
        );
        onDataReceived(response.data);
      } catch (error) {
        console.error(error);
        onDataReceived(null);
      }
    };

    fetchData();
  }, [barcode, onDataReceived]);

  return null;
};

export default ApiCaller;
