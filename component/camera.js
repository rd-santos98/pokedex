import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraCapture() {
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access the camera was denied');
      }
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
      </View>
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: '70%',
    aspectRatio: 1,
    overflow: 'hidden', 
  },
  camera: {
    flex: 1,
  },
  captureButtonContainer: {
    marginTop: 30,
    marginRight: 180,
  },
  captureButton: {
    backgroundColor: 'grey',
    borderRadius: 75,
    padding: 25,
  },
  captureButtonText: {
    color: 'white',
  },
});
