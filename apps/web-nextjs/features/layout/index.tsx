import { ReactNode, useState } from 'react';
import {
  styled,
  Box,
  Text,
  Button,
  Popover,
  ScrollArea,
  LogoIcon,
  Avatar,
} from '@minis/ui/react';
import {
  HiSun,
  HiMoon,
  HiOutlineHome,
  HiOutlineChat,
  HiOutlineDocument,
  HiOutlineCalendar,
  HiChevronDown,
  HiOutlineLogout,
  HiOutlineLogin,
} from 'react-icons/hi';
import { SlashIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

const t = {
  title: 'Mini',
  signIn: 'Sign in',
  signOut: 'Sign out',
  name: 'Kevin Nguyen',
};

export const IconButtonToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="icon"
      color="transparent"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? <HiSun /> : <HiMoon />}
    </Button>
  );
};

export const ButtonSignInGoogle = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/home')}>
      <HiOutlineLogin />
      {t.signIn}
    </Button>
  );
};

export const ButtonSignOut = () => {
  const router = useRouter();
  return (
    <Button
      color="transparent"
      align="left"
      tw="w-full font-bold"
      onClick={() => router.push('/')}
    >
      <HiOutlineLogout />
      {t.signOut}
    </Button>
  );
};

// LAYOUT

const avatars = [
  'https://avatars.dicebear.com/api/open-peeps/1231.svg',
  'https://avatars.dicebear.com/api/open-peeps/1232.svg',
  'https://avatars.dicebear.com/api/open-peeps/1233.svg',
  'https://avatars.dicebear.com/api/open-peeps/1234.svg',
  'https://avatars.dicebear.com/api/open-peeps/1235.svg',
  'https://avatars.dicebear.com/api/open-peeps/1236.svg',
  'https://avatars.dicebear.com/api/open-peeps/1237.svg',
  'https://avatars.dicebear.com/api/open-peeps/1238.svg',
  'https://avatars.dicebear.com/api/open-peeps/1239.svg',
];

const teams = [
  { label: 'Growth Group 2022', id: 1 },
  { label: 'Beach Mission 2022', id: 2 },
  { label: 'Kids Camp 2022', id: 3 },
  { label: 'Preschool 2022', id: 4 },
];

const StyledHeader = styled(
  'header',
  `w-full py-4 flex justify-between px-2
	border-b-2 border-stone-200 dark:border-stone-700
`
);
const StyledNavSidebar = styled(
  'nav',
  `w-40 border-stone-200 border-r-2
	h-full min-h-screen p-4 flex flex-col items-center gap-4
	dark:border-stone-700
`
);
const StyledLayoutMain = styled(
  'main',
  `w-full flex flex-1 h-full dark:boder-t-stone-100`
);
const StyledLayoutContainer = styled(
  'div',
  `w-full h-full min-h-screen bg-stone-100
	dark:bg-stone-900 flex
`
);

type LayoutHeaderProps = {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};

const defaultRightSection = (
  <Box tw="flex items-center gap-2">
    <Box tw="flex -space-x-2 w-fit">
      {avatars.map((src, index) => (
        <Avatar className={clsx(index > 3 && 'brightness-50')} src={src} />
      ))}
    </Box>
    <IconButtonToggleTheme />
  </Box>
);

const LayoutHeader = ({
  leftSection,
  rightSection = defaultRightSection,
}: LayoutHeaderProps) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  return (
    <StyledHeader>
      <Box tw="flex gap-4 items-center">
        <Box tw="p-2 flex gap-2 items-center">
          <Text b>Team</Text>
          <SlashIcon />
          <Popover>
            <Popover.Trigger
              className={clsx(
                'flex items-center gap-2 px-2 py-1 justify-between',
                'rounded cursor-pointer w-fit',
                'hover:ring-stone-200 hover:ring-2'
              )}
            >
              <Text>{selectedTeam.label}</Text>
              <HiChevronDown />
            </Popover.Trigger>
            <Popover.Content
              sideOffset={4}
              side="bottom"
              align="start"
              className="z-10"
            >
              <ScrollArea className={clsx('max-h-[20em]')}>
                <ScrollArea.Viewport
                  className={clsx(
                    'w-full h-full rounded-[inherit] p-2',
                    'focus:outline-none focus:ring-2 focus:ring-stone-200',
                    'dark:focus:ring-stone-800'
                  )}
                >
                  <Box className="flex flex-col gap-2">
                    {teams.map((team) => (
                      <Popover.Close asChild>
                        <Button
                          color={
                            selectedTeam.id === team.id
                              ? 'light'
                              : 'transparent'
                          }
                          onClick={() => setSelectedTeam(team)}
                          className="w-full"
                          key={team.id}
                        >
                          {team.label}
                        </Button>
                      </Popover.Close>
                    ))}
                    <Button color="dark" className="w-full">
                      Add team
                    </Button>
                  </Box>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea>
            </Popover.Content>
          </Popover>
        </Box>
        {leftSection}
      </Box>

      {rightSection}
    </StyledHeader>
  );
};

export const navOptions = [
  {
    label: 'Home',
    href: '/home',
    icon: <HiOutlineHome />,
  },
  {
    label: 'Chat',
    href: '/home/chat',
    icon: <HiOutlineChat />,
  },
  {
    label: 'Notes',
    href: '/home/notes',
    icon: <HiOutlineDocument />,
  },
  {
    label: 'Roster',
    href: '/home/roster',
    icon: <HiOutlineCalendar />,
  },
];

const LayoutNavSidebar = () => {
  const router = useRouter();
  return (
    <StyledNavSidebar>
      <LogoIcon size={96} />

      <Box tw="flex flex-col gap-2 w-full flex-1">
        {navOptions.map((option) => (
          <Link href={option.href} key={option.href}>
            <Button
              as="a"
              align="left"
              tw={clsx('w-full font-bold items-left')}
              color={router.pathname === option.href ? 'light' : 'transparent'}
            >
              {option.icon}
              {option.label}
            </Button>
          </Link>
        ))}
      </Box>

      <Popover>
        <Popover.Trigger
          className={clsx(
            'flex items-center gap-2 bg-stone-200 rounded hover:bg-stone-300 pr-4 pl-2',
            'dark:bg-stone-800 py-2'
          )}
        >
          <Avatar src="https://avatars.dicebear.com/api/open-peeps/kevin.svg" />
          <Text b className="text-xs text-left">
            {t.name}
          </Text>
        </Popover.Trigger>
        <Popover.Content
          sideOffset={4}
          side="top"
          align="start"
          className="z-10"
        >
          <ButtonSignOut />
        </Popover.Content>
      </Popover>
    </StyledNavSidebar>
  );
};

export const Layout = Object.assign(StyledLayoutContainer, {
  NavSidebar: LayoutNavSidebar,
  Header: LayoutHeader,
  Main: StyledLayoutMain,
});
