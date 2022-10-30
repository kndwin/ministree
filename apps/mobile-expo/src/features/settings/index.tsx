import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';
import colors from 'tailwindcss/colors';
import { StatusBar } from 'react-native';
import { styled, useColorScheme } from 'nativewind';
import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Box, Button } from '@ui/react-native';

import { HomeStackParamsList } from 'mobile/screens/_app';
import { useAuthStore } from 'mobile/features/auth/hooks';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'Setting'>;
};

// TODO(knd): If the header styles get more complex
// Just make it a custom header
export const screenOptions = (
  colorScheme: ColorSchemeName
): Partial<NativeStackNavigationOptions> => ({
  presentation: 'modal',
  title: 'Settings',
  headerTitleStyle: {
    fontSize: 28,
    fontWeight: '900',
  },
  headerTintColor:
    colorScheme === 'dark' ? colors.stone[100] : colors.stone[900],
  headerStyle: {
    backgroundColor:
      colorScheme === 'dark' ? colors.stone[900] : colors.stone[200],
  },
});

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const logout = useAuthStore((s) => s.handleLogout);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Box tw="bg-stone-100 flex-1 items-center justify-center dark:bg-stone-800 px-4 flex">
      <StyledButton onPress={toggleColorScheme}>
        Toggle {colorScheme} Mode Red/Blue
      </StyledButton>
      <Spacer />
      <StyledButton onPress={logout}>Log out</StyledButton>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};

const StyledButton = styled(
  Button,
  'w-full bg-stone-300 dark:bg-stone-700 py-2'
);

const Spacer = styled(Box, 'h-2');
