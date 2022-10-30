import clsx from 'clsx';
import { faker } from '@snaplet/copycat';
import {
  styled,
  Box,
  Text,
  Button,
  TextField,
  Avatar,
  ScrollArea,
} from '@ui/react';
import { Layout, getLayout } from 'web/common/ui/layout';

const t = {
  welcome: 'Home',
  latestUpdate: 'Latest Updates',
  annoucementTitle: 'Annoucements',
};

export default function HomePage() {
  return (
    <Layout.Main>
      <AnnouncementBoard />
    </Layout.Main>
  );
}

HomePage.getLayout = getLayout;

const updates = Array.from(Array(30).keys()).map((index) => ({
  id: `update-${index}`,
  title: `${faker.word.verb()} ${faker.word.noun()}`,
  createdAt: new Date(),
  by: faker.name.firstName(),
}));

const LatestUpdates = () => {
  const today = new Date();
  return (
    <StyledLatestUpdateContainer>
      <ScrollArea className={clsx('max-h-[calc(100vh-80px)]')}>
        <Text tw="mb-4 ml-2 text-xl font-black">{t.latestUpdate}</Text>
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

const StyledLatestUpdateContainer = styled(
  'div',
  `h-full w-72 border-r-2 border-stone-200
	dark:border-stone-700
`
);
const StyledUpdatesContainer = styled('div', `flex flex-col gap-4`);
const StyledUpdateContainer = styled(
  'div',
  `py-2 hover:bg-stone-200
	rounded ring-1 ring-stone-200 px-3 flex flex-col gap-2
	hover:dark:bg-stone-800 dark:ring-stone-700
`
);
const StyledByUser = styled(
  'p',
  `py-1 px-2 rounded bg-stone-200 w-fit text-xs
	dark:bg-stone-800
`
);

const annoucements = Array.from(Array(30).keys()).map((index) => ({
  id: `annoucement-${index}`,
  title: `${faker.word.verb()} ${faker.word.noun()}`,
  description: faker.lorem.paragraph(),
  createdAt: new Date(),
  by: faker.name.firstName(),
  comments: Array.from(Array(10).keys()).map((index) => ({
    content: faker.lorem.sentence(),
    id: `${faker.word.adverb()}-${index}`,
    by: {
      name: faker.name.findName(),
      img: `https://avatars.dicebear.com/api/open-peeps/${faker.word.noun()}${index}.svg`,
    },
  })),
}));

const AnnouncementBoard = () => {
  return (
    <StyledNotifcationBoardContainer>
      <ScrollArea className={clsx('max-h-[calc(100vh-80px)]')}>
        <Text tw="mb-4 ml-2 text-xl font-black">{t.annoucementTitle}</Text>
        <ScrollArea.Viewport>
          <StyledAnnouncementsContainer>
            {annoucements.map((a) => (
              <Annoucement annoucement={a} key={a.id} />
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

type AnnoucementProps = {
  annoucement: typeof annoucements[0];
};

const Annoucement = (props: AnnoucementProps) => {
  const { annoucement } = props;
  return (
    <StyledAnnouncementContainer key={annoucement.id}>
      <Text b tw="text-2xl">
        {annoucement.title}
      </Text>
      <Text tw="mb-6 mt-1">{annoucement.description}</Text>

      <Text b>Comments</Text>
      <StyledCommentsContainer>
        {annoucement.comments.map((comment) => (
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
  );
};

const StyledNotifcationBoardContainer = styled('div', `flex-1 flex-col`);
const StyledAnnouncementsContainer = styled('div', `flex flex-col gap-12`);
const StyledAnnouncementContainer = styled(
  'div',
  `p-8 rounded ring-1 ring-stone-200 flex flex-col gap-2
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
