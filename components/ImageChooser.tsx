import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Styles from "./Styles";

type ImageChooserProps = {
  onChangeImage: (image: string) => void;
};

const ImageChooser = (props: ImageChooserProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission required", "We need camera and gallery permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.canceled) return;
    processImage(result.assets[0].uri);
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.canceled) return;
    processImage(result.assets[0].uri);
  };

  const processImage = async (uri: string) => {
    setLoading(true);
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 50, height: 50 } }],
        { base64: true }
      );
      const imageBase64 = resizedImage.base64 ?? "";
      setImage(uri);
      props.onChangeImage(imageBase64);
    } catch (error) {
      Alert.alert("Error", "Failed to process the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Button title="Open Camera" onPress={openCamera} />
      {loading ? (
        <Text>Loading...</Text>
      ) : image ? (
        <Image
          resizeMode="cover"
          source={{ uri: image }}
          style={Styles.avatarBig}
        />
      ) : (
        <Text>No image selected</Text>
      )}
    </View>
  );
};

export default ImageChooser;
