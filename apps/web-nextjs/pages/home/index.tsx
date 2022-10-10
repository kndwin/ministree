import clsx from 'clsx';
import { faker } from '@snaplet/copycat';

import {
styled, 
  Box,
  Text,
  Button,
  Popover,
  TextField,
  Avatar,
  ScrollArea,
} from '@minis/ui/react';
import { Layout } from 'apps/web-nextjs/features/layout';

const t = {
  welcome: 'Home',
  latestUpdate: 'Latest Updates',
  annoucementTitle: 'Annoucements',
};

export default function HomePage() {
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
          <LatestUpdates />
          <AnnouncementBoard />
        </Layout.Main>
      </Box>
    </Layout>
  );
}

const UPDATE_LENGTH = 30;
const updates = Array.from(Array(UPDATE_LENGTH).keys()).map((index) => ({
  id: `update-${index}`,
  title: `${faker.word.verb()} ${faker.word.noun()}`,
  createdAt: new Date(),
  by: faker.name.firstName(),
}));

const LatestUpdates = () => {
  const today = new Date();
  return (
    <StyledLatestUpdateContainer>
      <Text b tw="m-4 mb-0">
        {t.latestUpdate}
      </Text>
      <ScrollArea className={clsx('max-h-[calc(100vh-114px)]')}>
        <ScrollArea.Viewport>
          <StyledUpdatesContainer>
            <Text tw="text-[10pt]">{today.toDateString()}</Text>
            {updates.map((update) => (
              <StyledUpdateContainer key={update.id}>
                <Text b>{update.title}</Text>
                <StyledByUser>@{update.by}</StyledByUser>
              </StyledUpdateContainer>
            ))}
          </StyledUpdatesContainer>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </StyledLatestUpdateContainer>
  );
};

const StyledLatestUpdateContainer = styled('div',`
	h-full w-72 border-r-2 border-stone-200
	dark:border-stone-700
`);
const StyledUpdatesContainer = styled('div',`flex flex-col gap-4`);
const StyledUpdateContainer = styled('div',`py-2 hover:bg-stone-200
	rounded ring-1 ring-stone-200 px-3 flex flex-col gap-2
	hover:dark:bg-stone-800 dark:ring-stone-700
`);
const StyledByUser = styled('p',`py-1 px-2 rounded bg-stone-200 w-fit text-xs
	dark:bg-stone-800
`);

const notifications = [
  {
    id: 'notifications-1',
    title: '🎉 40 days to go!',
    description: 'Make sure to do this!',
    comments: [
      {
        id: 'comment-1',
        by: {
          id: 'person-1',
          img: 'https://avatars.dicebear.com/api/open-peeps/1.svg',
          name: 'Kevin',
        },
        content: 'This is great!',
        createdAt: new Date(),
      },
      {
        id: 'comment-2',
        by: {
          id: 'person-2',
          img: 'https://avatars.dicebear.com/api/open-peeps/2.svg',
          name: 'Tina',
        },
        content: 'This is great!',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 'notifications-2',
    title: 'Reminder',
    description: 'Make sure to do this!',
    comments: [],
  },
  {
    id: 'notifications-3',
    title: 'Reminder',
    description: 'Make sure to do this!',
    comments: [],
  },
  {
    id: 'notifications-4',
    title: 'Reminder',
    description: 'Make sure to do this!',
    comments: [],
  },
  {
    id: 'notifications-5',
    title: 'Reminder',
    description: 'Make sure to do this!',
    comments: [],
  },
];

const AnnouncementBoard = () => {
  return (
    <StyledNotifcationBoardContainer>
      <Text b tw="mb-0 m-4 text-2xl">
        {t.annoucementTitle}
      </Text>
      <ScrollArea className={clsx('max-h-[calc(100vh-126px)]')}>
        <ScrollArea.Viewport>
          <StyledAnnouncementsContainer>
            {notifications.map((notification) => (
              <StyledAnnouncementContainer key={notification.id}>
                <Text b tw="text-2xl">
                  {notification.title}
                </Text>
                <Text tw="mb-6 mt-1">{notification.description}</Text>

                <Text b>Comments</Text>
                <StyledCommentsContainer>
                  {notification.comments.map((comment) => (
                    <StyledCommentContainer key={comment.id}>
                      <Avatar src={comment.by.img} />
                      <Box>
                        <Text b>{comment.by.name}</Text>
                        <Text>{comment.content}</Text>
                      </Box>
                    </StyledCommentContainer>
                  ))}
                  <Box tw="w-full flex gap-4">
                    <TextField tw="w-full" placeholder="Add a comment!" />
                    <Button>Send</Button>
                  </Box>
                </StyledCommentsContainer>
              </StyledAnnouncementContainer>
            ))}
          </StyledAnnouncementsContainer>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </StyledNotifcationBoardContainer>
  );
};

const StyledNotifcationBoardContainer = styled('div', `flex-1 flex-col`);
const StyledAnnouncementsContainer = styled('div', `flex flex-col gap-12`);
const StyledAnnouncementContainer = styled(
  'div',
  `p-4
	rounded ring-1 ring-stone-200 flex flex-col gap-2
	hover:dark:bg-stone-800 dark:ring-stone-700
	shadow-md dark:shadow-stone-300 dark:shadow
`
);
const StyledCommentsContainer = styled(
  'div',
  `flex flex-col gap-4
	p-4 ring-1 ring-stone-200 dark:ring-stone-700 rounded-lg
`
);
const StyledCommentContainer = styled(
  'div',
  `py-2 hover:bg-stone-200
	rounded px-3 flex gap-2
	hover:dark:bg-stone-800 
`
);
