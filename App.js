import React, { useCallback } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function AnimatedScreen() {
  // console.log("CHANGE ME TO something else to SEE THE UPDATE taking place");

  const someMeasuredValue = useSharedValue(0);
  const onLayout = useCallback(() => {
    someMeasuredValue.value = 60;
  }, [someMeasuredValue]);

  const animStyle = useAnimatedStyle(() => {
    console.log("shared value:", someMeasuredValue.value);

    return ({
      transform: [{
        translateY: someMeasuredValue.value,
      }]
    });
}, [someMeasuredValue]);

  return (
    <View style={styles.container}>
      <Text>This orange element is expected to translate 60px on Y-axis after the measure took place. It doesn't always.</Text>
      {/* In my testing the issue appeared more often if we put the following two components and the animated code in its own component. But thats maybe also only a conicidince */}
      <View onLayout={onLayout} style={styles.dividerLine} />
      <Animated.View style={[styles.item, animStyle]} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("AnimatedBug")}>
          <Text>Open animated page</Text>
        </Pressable>
      </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AnimatedBug" component={AnimatedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'red',
    width: '100%',
  },
  item: {
      width: 100,
      height: 50,
      backgroundColor: "orange",
  },
});
