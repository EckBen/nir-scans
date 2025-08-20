import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

export default function Loading() {
  return (
    <View style={ styles.container }>
      <Image
        style={ styles.image }
        source={require('../assets/images/corn.jpg')}
      />
      <ActivityIndicator size="large" color="#2e9910" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: 'auto',
    height: '80%',
    aspectRatio: 4431 / 5908,
  }
});