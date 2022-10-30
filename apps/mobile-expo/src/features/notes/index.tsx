import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Text } from '@ui/react-native';

const Stack = createNativeStackNavigator();

export const NotesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotesHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NotesHome" component={NotesScreen} />
    </Stack.Navigator>
  );
};

const NotesScreen = () => {
  return (
    <Box center tw="bg-white flex-1 items-center justify-center">
      <Text tw="font-black text-3xl">Notes</Text>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};
