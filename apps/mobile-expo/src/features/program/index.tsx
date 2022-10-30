import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Text } from '@ui/react-native';

const Stack = createNativeStackNavigator();

export const ProgramsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProgramsHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProgramsHome" component={ProgramsScreen} />
    </Stack.Navigator>
  );
};

const ProgramsScreen = () => {
  return (
    <Box center tw="bg-white flex-1 items-center justify-center">
      <Text tw="font-black text-3xl">Programs</Text>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};
