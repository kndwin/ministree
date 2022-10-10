/* eslint-disable jsx-a11y/accessible-emoji */
import clsx from 'clsx';
import { styled } from 'nativewind';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Box } from '@minis/ui/react-native';

const StyledContainer = styled(
  View,
  clsx(`items-center justify-center flex-1 bg-white`)
);
const StyledText = styled(Text, `font-black text-2xl`);

const App = () => {
  return (
    <Box center tw="bg-white flex-1">
      <StyledText>Hello world</StyledText>
      <StatusBar barStyle="dark-content" />
    </Box>
  );
};

export default App;
