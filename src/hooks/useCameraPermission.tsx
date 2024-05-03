import { useState, useEffect } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function useCameraPermissions() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function checkAndRequestPermission() {
      const status = await check(PERMISSIONS.ANDROID.CAMERA);
      if (status === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        setHasPermission(result === RESULTS.GRANTED);
      }
    }
    checkAndRequestPermission();
  }, []);

  return hasPermission;
}