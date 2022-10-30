import { Button, Box, Text } from '@ui/react-native';
import { Feather } from '@expo/vector-icons';
import { RootStackParamsList } from 'mobile/screens/_app';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabHeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Setting'>;
};

export const CustomHomeTabHeader = ({ navigation }: TabHeaderProps) => {
  const inset = useSafeAreaInsets();
  return (
    <Box tw="bg-stone-100 dark:bg-stone-800" style={{ paddingTop: inset.top }}>
      <Box tw="h-20 w-full flex flex-row items-center justify-between px-4 py-2">
        <Text b>Header</Text>
        <TabHeaderSettingButton navigation={navigation} />
      </Box>
    </Box>
  );
};

const TabHeaderSettingButton = ({
  navigation,
}: {
  navigation: TabHeaderProps['navigation'];
}) => {
  return (
    <Button onPress={() => navigation.navigate('Setting')}>
      <Feather name="settings" />
    </Button>
  );
};
