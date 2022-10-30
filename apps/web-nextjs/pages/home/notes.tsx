import { styled, Box, Text, Button, TextField, ScrollArea } from '@ui/react';
import { HiPlus } from 'react-icons/hi';
import { Layout, getLayout } from 'web/common/ui/layout';
import { faker } from '@snaplet/copycat';
import clsx from 'clsx';

export default function NotesPage() {
  return (
    <Layout.Main>
      <FolderTree />
      <Note />
    </Layout.Main>
  );
}

NotesPage.getLayout = getLayout;

const files = Array.from(Array(30).keys()).map((index) => ({
  id: `file-${index}`,
  title: faker.random.words(5),
}));

const FolderTree = () => {
  return (
    <StyledFolderTreeContainer>
      <ScrollArea className={clsx('max-h-[calc(100vh-80px)]')}>
        <Box tw="w-full h-fit flex items-center gap-4 mb-4">
          <TextField placeholder="Search..." />
          <Button color="light" size="icon">
            <HiPlus />
          </Button>
        </Box>
        <ScrollArea.Viewport className="p-0 flex flex-col gap-4">
          {files.map((file) => (
            <StyledFileContainer key={file.id}>
              <Text className="font-bold">{file.title}</Text>
            </StyledFileContainer>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </StyledFolderTreeContainer>
  );
};

const StyledFileContainer = styled(
  Box,
  `px-2 py-4 rounded-lg hover:bg-stone-200`
);

const StyledFolderTreeContainer = styled(
  'div',
  `flex flex-col border-r border-r-stone-400 w-72`
);

const Note = () => {
  return (
    <Box tw="p-2 flex-1">
      <textarea className="flex-1 w-full h-full" id="test" name="" />
    </Box>
  );
};
