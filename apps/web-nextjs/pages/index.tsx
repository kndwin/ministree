import { tw, Box, Text, Button, LogoIcon, HoverCard } from '@minis/ui/react';
import {
  ButtonSignInGoogle,
  IconButtonToggleTheme,
  navOptions,
} from 'apps/web-nextjs/features/layout';

const t = {
  title: 'ministree',
  heroTag: 'making ministree easier',
  heroDescription: `spend more time caring for people\nless time stuck in administration`,
};

const renderFeatureCardDetail = {
  Roster: (
    <Box>
      <Text>Add Roster GIF</Text>
    </Box>
  ),
  Notes: (
    <Box>
      <Text>Add Notes GIF</Text>
    </Box>
  ),
  Chat: (
    <Box>
      <Text>Add Chat GIF</Text>
    </Box>
  ),
  Home: (
    <Box>
      <Text>Add Home GIF</Text>
    </Box>
  ),
};

export default function LandingPage() {
  return (
    <StyledContainer>
      <StyledHeader>
        <Box center tw="gap-2">
          <LogoIcon />
          <Text b tw="text-lg">
            {t.title}
          </Text>
        </Box>
        <Box tw="flex items-center gap-2">
          <IconButtonToggleTheme />
          <ButtonSignInGoogle />
        </Box>
      </StyledHeader>

      <StyledMain>
        <HeroContainer>
          <StyledTitle>making</StyledTitle>
          <StyledTitle>ministree</StyledTitle>
					<StyledTitle className="text-stone-600 dark:text-stone-700">easier</StyledTitle>
          <Text tw="mt-8 md:text-3xl max-w-[25ch] text-center text-xl">
            {t.heroDescription}
          </Text>
        </HeroContainer>

        <FeaturesContainer>
          {navOptions.map((option) => (
            <HoverCard openDelay={100}>
              <HoverCard.Trigger>
                <FeatureContainer>
                  {option.icon}
                  <Text b>{option.label}</Text>
                </FeatureContainer>
              </HoverCard.Trigger>
              <HoverCard.Content
                sideOffset={8}
                className="w-full"
                align="bottom"
              >
                {renderFeatureCardDetail[option.label]}
              </HoverCard.Content>
            </HoverCard>
          ))}
        </FeaturesContainer>

        <Box center tw="mt-8">
          <Text b tw="text-5xl font-black">
            Responsive Design
          </Text>
        </Box>
      </StyledMain>
    </StyledContainer>
  );
}

const StyledContainer = tw.div<any>`w-full h-full min-h-screen bg-stone-100 dark:bg-stone-900`;
const StyledMain = tw.main<any>`container mx-auto px-4`;
const StyledHeader = tw.header<any>`container mx-auto py-8 flex justify-between px-4`;
const HeroContainer = tw.div`flex flex-col items-center 
	py-20 px-10 rounded-xl justify-between
`;
const StyledTitle = tw.p`md:text-8xl max-w-10ch text-center font-black text-6xl`;

const FeaturesContainer = tw.div`grid md:grid-cols-4 
grid-cols-1 sm:grid-cols-2 gap-4
items-center mt-12`;

const FeatureContainer = tw.div`flex items-center justify-start
w-full ring-1 ring-stone-200 py-4 bg-stone-200 rounded-lg gap-4 px-5
hover:bg-stone-300 
dark:bg-stone-800 dark:ring-stone-800 dark:hover:bg-stone-700
`;
