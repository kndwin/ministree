import { StatusBar } from 'react-native';
import { Box, Text } from '@minis/ui/react-native';

export const LoginScreen = () => {
  return (
    <Box center tw="bg-white flex-1 items-center justify-center">
      <Text tw="font-black text-3xl">Login</Text>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};
