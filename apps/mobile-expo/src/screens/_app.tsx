import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import { Feather } from '@expo/vector-icons';

import { CustomHomeTabHeader } from 'mobile/common/layout';
import { LoginScreen } from 'mobile/features/auth';
import { FeedStack } from 'mobile/features/feed';
import { ChatStack } from 'mobile/features/chat';
import { NotesStack } from 'mobile/features/notes';
import { ProgramsStack } from 'mobile/features/program';
import { useAuthStore } from 'mobile/features/auth/hooks';
import {
  SettingsScreen,
  screenOptions as settingScreenOptions,
} from 'mobile/features/settings';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Setting: undefined;
};

export type HomeStackParamsList = {
  Feed: undefined;
  Chat: undefined;
  Note: undefined;
  Program: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <CustomHomeTabHeader navigation={navigation} />,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          tabBarIcon: () => <Feather name="list" />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: () => <Feather name="message-circle" />,
        }}
      />
      <Tab.Screen
        name="Note"
        component={NotesStack}
        options={{
          tabBarIcon: () => <Feather name="file-text" />,
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramsStack}
        options={{
          tabBarIcon: () => <Feather name="calendar" />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {isLoggedIn && (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Setting"
                component={SettingsScreen}
                options={settingScreenOptions(colorScheme)}
              />
            </Stack.Group>
          )}
          {!isLoggedIn && (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
