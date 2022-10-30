import {
  styled,
  Box,
  Text,
  Button,
  TextField,
  Avatar,
  ScrollArea,
  Tooltip,
} from '@ui/react';
import clsx from 'clsx';
import { faker } from '@snaplet/copycat';
import { ReactNode } from 'react';
import {
  HiPlus,
  HiOutlineDocument,
  HiOutlineEmojiHappy,
  HiChevronRight,
} from 'react-icons/hi';
import { nanoid } from 'nanoid';

const getRandomNumber = (max = 10) => {
  return Math.floor(Math.random() * max);
};

const channelChats = Array.from(Array(10).keys()).map((index) => ({
  id: `channel-chat-${index}`,
  lastMessage: faker.lorem.sentence(),
  lastUpdatedMessageCounter: getRandomNumber(),
  groupName: faker.lorem.words(5),
  attendees: Array.from(Array(2).keys()).map((index) => ({
    id: `person-${faker.word.noun()}`,
    img: `https://avatars.dicebear.com/api/open-peeps/21${index}.svg`,
  })),
}));

const singleChats = Array.from(Array(10).keys()).map((index) => ({
  id: `single-chat-${index}`,
  lastUpdatedMessageCounter: getRandomNumber(10),
  lastMessage: faker.lorem.sentence(),
  name: faker.name.findName(),
  attendee: {
    id: `person-${nanoid()}`,
    img: `https://avatars.dicebear.com/api/open-peeps/29${index}.svg`,
  },
}));

export const ChatsSelections = () => {
  return (
    <StyledChatsSelectionContainer>
      <ScrollArea className={clsx('max-h-[calc(100vh-85px)] pb-16')}>
        <TextField tw="mb-4 w-full" placeholder="Search..." />
        <ScrollArea.Viewport className="p-0">
          <Box tw="flex items-center gap-2 mb-2">
            <Text b>Channels</Text>
          </Box>

          <Box tw="flex flex-col gap-2">
            {channelChats.map((chat) => (
              <GroupedChatPreview key={chat.id} chat={chat} />
            ))}
          </Box>
          <Box tw="flex items-center gap-2 mt-4 mb-2">
            <Button tw="w-fit" color="light" size="icon">
              <HiPlus />
            </Button>
            <Text b>Add Channel</Text>
          </Box>

          <Box tw="flex items-center gap-2 mt-4 mb-2">
            <Text b>Direct Messages</Text>
          </Box>

          <Box tw="flex flex-col gap-2">
            {singleChats.map((chat) => (
              <SingleChatPreview key={chat.id} chat={chat} />
            ))}
          </Box>
          <Box tw="flex items-center gap-2 mt-4 mb-2">
            <Button tw="w-fit" color="light" size="icon">
              <HiPlus />
            </Button>
            <Text b>Add Direct Messages</Text>
          </Box>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </StyledChatsSelectionContainer>
  );
};

const SingleChatPreview = ({ chat }: { chat: typeof singleChats[0] }) => {
  return (
    <StyledChatContainer key={chat.id}>
      {chat.lastUpdatedMessageCounter > 0 && (
        <Chip>{chat.lastUpdatedMessageCounter}</Chip>
      )}
      <Box tw="w-12 mr-4">
        <Avatar size="lg" src={chat.attendee.img} />
      </Box>
      <Box tw="flex flex-col">
        <Text b tw="truncate w-40">
          {chat.name}
        </Text>
        <Text tw="truncate w-40">{chat.lastMessage}</Text>
      </Box>
    </StyledChatContainer>
  );
};

const GroupedChatPreview = ({ chat }: { chat: typeof channelChats[0] }) => {
  return (
    <StyledChatContainer key={chat.id}>
      {chat.lastUpdatedMessageCounter > 0 && (
        <Chip>{chat.lastUpdatedMessageCounter}</Chip>
      )}
      <Box tw="flex -space-x-4 w-12 mr-4">
        {chat.attendees.map((avatar) => (
          <Avatar size="sm" key={avatar.img} src={avatar.img} />
        ))}
      </Box>
      <Box tw="flex flex-col">
        <Box tw="flex items-center justify-between">
          <Text b tw="truncate w-40">
            {chat.groupName}
          </Text>
        </Box>
        <Text tw="truncate w-40">{chat.lastMessage}</Text>
      </Box>
    </StyledChatContainer>
  );
};

type ChipProps = {
  children: ReactNode;
};

const Chip = ({ children }: ChipProps) => (
  <Box center tw="bg-rose-500 rounded-full w-4 h-4 absolute top-2 left-2">
    <Text color="light" b tw="leading-none text-[10px] text-stone-100">
      {children}
    </Text>
  </Box>
);

const StyledChatContainer = styled(
  'div',
  `flex items-center py-2  pl-4
	hover:bg-stone-200 dark:hover:bg-stone-700 
	dark:hover:text-stone-200 relative rounded
`
);

const StyledChatsSelectionContainer = styled(
  'div',
  `flex flex-col border-r-2 w-72
	dark:border-stone-700 border-stone-200 `
);

const messages = Array.from(Array(50).keys()).map((index) => ({
  id: `single-chat-${index}`,
  content: faker.lorem.sentences(6),
  name: faker.name.findName(),
  by: {
    id: `person-${nanoid()}`,
    img: `https://avatars.dicebear.com/api/open-peeps/29${index}.svg`,
    name: faker.name.findName(),
  },
}));

export const ChatMessages = () => {
  return (
    <StyledChatMessagesContainer>
      <ScrollArea className={clsx('max-h-[calc(100vh-280px)]')}>
        <Text b tw="px-2 text-2xl pb-4">
          Group name for realzzz
        </Text>
        <ScrollArea.Viewport className="p-0 flex flex-col gap-4 pb-4">
          {messages.map((message) => (
            <Box key={message.id} tw="flex py-4 px-2">
              <Avatar size="lg" src={message.by.img} tw="mr-4" />
              <Box>
                <Text b>{message.by.name}</Text>
                <Text>{message.content}</Text>
              </Box>
            </Box>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
      <MessageBoxInput />
    </StyledChatMessagesContainer>
  );
};

const StyledChatMessagesContainer = styled(Box, `flex flex-col flex-1 h-full `);

const MessageBoxInput = () => {
  return (
    <Box
      tw={clsx(
        'm-4 p-4 ring-1 ring-stone-200 rounded-lg h-full',
        'flex flex-col flex flex-col gap-4 bg-stone-100',
        'max-h-60 items-center justify-between shadow-lg',
        'min-h-40',
        'dark:bg-stone-800 dark:ring-stone-700'
      )}
    >
      <textarea
        className={clsx(
          'resize-none flex-1 p-4',
          'bg-stone-100 rounded-lg w-full',
          'focus:outline-none focus:ring-1 focus:ring-stone-200',
          'dark:bg-stone-800 dark:ring-stone-700'
        )}
      />
      <Box tw="flex items-center justify-between w-full">
        <Box tw="flex items-center gap-2">
          <Tooltip>
            <Tooltip.Trigger>
              <StyledIconContainer>
                <HiOutlineEmojiHappy />
              </StyledIconContainer>
            </Tooltip.Trigger>
            <Tooltip.Content>Emojies</Tooltip.Content>
          </Tooltip>
          <StyledIconContainer>
            <HiOutlineDocument />
          </StyledIconContainer>
        </Box>

        <StyledIconContainer>
          <HiChevronRight />
        </StyledIconContainer>
      </Box>
    </Box>
  );
};

const StyledIconContainer = styled(
  Box,
  'p-2 rounded-full hover:bg-stone-200 w-fit'
);
