import { StatusBar } from 'expo-status-bar';
import { Box, Text, Button } from '@ui/react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from 'apps/mobile-expo/src/screens/_app';
import { useAuthStore } from './hooks';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const login = useAuthStore((s) => s.handleLogin);
  const handleLogin = () => {
    login();
  };

  return (
    <Box
      center
      tw="bg-stone-100 dark:bg-stone-800 flex-1 items-center justify-center"
    >
      <StatusBar />
      <Button
        onPress={handleLogin}
        tw="bg-stone-300 dark:bg-stone-700 rounded"
        textProps={{
          tw: 'font-bold text-3xl text-stone-900 dark:text-stone-200',
        }}
      >
        Login
      </Button>
    </Box>
  );
};
