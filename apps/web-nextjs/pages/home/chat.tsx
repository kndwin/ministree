import { styled, Box, Text, Button, TextField, Avatar } from '@minis/ui/react';
import { Layout } from 'apps/web-nextjs/features/layout';
import { HiPlus } from 'react-icons/hi';

const t = {
  welcome: 'Chat',
};

export default function ChatPage() {
  return (
    <Layout>
      <Layout.NavSidebar />
      <Box tw="flex-1 flex flex-col">
        <Layout.Header
          leftSection={
            <Box center tw="bg-stone-300 px-2 py-1 rounded dark:bg-stone-700">
              <Text b>{t.welcome}</Text>
            </Box>
          }
        />
        <Layout.Main>
          <ChatsSelections />
          <ChatMessages />
        </Layout.Main>
      </Box>
    </Layout>
  );
}

const channelChats = [
  {
    id: 'channel-chat-1',
    lastMessage: 'We are such cuties! 😘',
    lastUpdatedMessageCounter: 0,
    groupName: 'The cuties inc.',
    attendees: [
      {
        id: 'person-2',
        img: 'https://avatars.dicebear.com/api/open-peeps/2.svg',
      },
      {
        id: 'person-3',
        img: 'https://avatars.dicebear.com/api/open-peeps/3.svg',
      },
    ],
  },
  {
    id: 'channel-chat-2',
    lastMessage: 'We are such cuties! 😘',
    lastUpdatedMessageCounter: 3,
    groupName: 'Ministry AF',
    attendees: [
      {
        id: 'person-4',
        img: 'https://avatars.dicebear.com/api/open-peeps/4.svg',
      },
      {
        id: 'person-5',
        img: 'https://avatars.dicebear.com/api/open-peeps/5.svg',
      },
    ],
  },
];

const singleChats = [
  {
    id: 'single-chat-1',
    lastMessage: 'You cutie! 😘',
    lastUpdatedMessageCounter: 0,
    name: 'John Smith',
    attendee: {
      id: 'person-1',
      img: 'https://avatars.dicebear.com/api/open-peeps/1.svg',
    },
  },
  {
    id: 'single-chat-2',
    lastMessage: 'Got that thing fam?',
    lastUpdatedMessageCounter: 4,
    name: 'Kim Tran',
    attendee: {
      id: 'person-2',
      img: 'https://avatars.dicebear.com/api/open-peeps/11.svg',
    },
  },
  {
    id: 'single-chat-3',
    lastUpdatedMessageCounter: 2,
    lastMessage: 'A super long last messsage because we only talk in blocks',
    name: 'Amr Hossam',
    attendee: {
      id: 'person-3',
      img: 'https://avatars.dicebear.com/api/open-peeps/111.svg',
    },
  },
];

const ChatsSelections = () => {
  return (
    <StyledChatsSelectionContainer>
      <TextField tw="mb-4" placeholder="Search..." />
      <Box tw="flex items-center gap-2 mb-2">
        <Text b>Channels</Text>
        <Button tw="w-fit" color="light" size="icon">
          <HiPlus />
        </Button>
      </Box>
      <Box tw="flex flex-col gap-2">
        {channelChats.map((chat) => (
          <GroupedChatPreview key={chat.id} chat={chat} />
        ))}
      </Box>
      <Box tw="flex items-center gap-2 mt-4 mb-2">
        <Text b>Direct Messages</Text>
        <Button tw="w-fit" color="light" size="icon">
          <HiPlus />
        </Button>
      </Box>
      <Box tw="flex flex-col gap-2">
        {singleChats.map((chat) => (
          <SingleChatPreview key={chat.id} chat={chat} />
        ))}
      </Box>
    </StyledChatsSelectionContainer>
  );
};

const SingleChatPreview = ({ chat }: { chat: any }) => {
  return (
    <StyledChatContainer key={chat.id}>
      {chat.lastUpdatedMessageCounter > 0 && (
        <Box center tw="bg-rose-500 rounded-full w-4 h-4 absolute top-2 left-2">
          <Text color="light" b tw="leading-none text-[10px] text-stone-100">
            {chat.lastUpdatedMessageCounter}
          </Text>
        </Box>
      )}
      <Box tw="w-12 mr-2">
        <Avatar size="lg" src={chat.attendee.img} />
      </Box>
      <Box tw="flex flex-col">
        <Text b>{chat.name}</Text>
        <Text tw="truncate w-40">{chat.lastMessage}</Text>
      </Box>
    </StyledChatContainer>
  );
};

const GroupedChatPreview = ({ chat }: { chat: any }) => {
  return (
    <StyledChatContainer key={chat.id}>
      {chat.lastUpdatedMessageCounter > 0 && (
        <Box center tw="bg-rose-500 rounded-full w-4 h-4 absolute top-2 left-2">
          <Text color="light" b tw="leading-none text-[10px] text-stone-100">
            {chat.lastUpdatedMessageCounter}
          </Text>
        </Box>
      )}
      <Box tw="flex -space-x-4 w-12 mr-2">
        {chat.attendees.map((avatar) => (
          <Avatar size="sm" key={avatar.img} src={avatar.img} />
        ))}
      </Box>
      <Box tw="flex flex-col">
        <Box tw="flex items-center justify-between">
          <Text b>{chat.groupName}</Text>
        </Box>
        <Text tw="truncate w-40">{chat.lastMessage}</Text>
      </Box>
    </StyledChatContainer>
  );
};

const StyledChatContainer = styled(
  'div',
  `flex items-center py-2 px-4 
	hover:bg-stone-200 dark:hover:bg-stone-700 
	dark:hover:text-stone-200 relative rounded
`
);

const StyledChatsSelectionContainer = styled(
  'div',
  `flex flex-col p-4 border-r-2 w-72
	dark:border-stone-700 border-stone-200 `
);

const ChatMessages = () => {
  return <StyledChatMessagesContainer></StyledChatMessagesContainer>;
};

const StyledChatMessagesContainer = styled('div', `flex flex-col p-4 flex-1`);
