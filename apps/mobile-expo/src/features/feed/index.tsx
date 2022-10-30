import { SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Text } from '@ui/react-native';

const Stack = createNativeStackNavigator();

export const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FeedHome" component={FeedScreen} />
    </Stack.Navigator>
  );
};

const FeedScreen = () => {
  return (
    <SafeAreaView>
      <Box center tw="bg-white flex-1 items-center justify-center">
        <Text tw="font-black text-3xl">Feed</Text>
        <StatusBar barStyle="dark-content" />
      </Box>
    </SafeAreaView>
  );
};
