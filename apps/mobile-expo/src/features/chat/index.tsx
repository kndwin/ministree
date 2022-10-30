import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Box, Text } from '@ui/react-native';

const Stack = createNativeStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ChatHome" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ChatScreen = () => {
  return (
    <Box center tw="bg-white flex-1 items-center justify-center">
      <Text tw="font-black text-3xl">Chat</Text>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};
