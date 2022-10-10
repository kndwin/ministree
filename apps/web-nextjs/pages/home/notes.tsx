import { styled, Box, Text, Button, TextField } from '@minis/ui/react';
import { HiPlus } from 'react-icons/hi';
import { Layout } from 'apps/web-nextjs/features/layout';

const t = {
  welcome: 'Notes',
};

export default function NotesPage() {
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
          <FolderTree />
          <Note />
        </Layout.Main>
      </Box>
    </Layout>
  );
}

const FolderTree = () => {
  return (
    <StyledFolderTreeContainer>
      <TextField tw="mb-4" placeholder="Search..." />

      <Button tw="w-fit" color="light" size="icon">
        <HiPlus />
      </Button>
    </StyledFolderTreeContainer>
  );
};

const StyledFolderTreeContainer = styled(
  'div',
  `flex flex-col p-4 border-r border-r-stone-400 w-72`
);

const Note = () => {
  return (
    <Box tw="p-2 flex-1">
      <textarea className="flex-1 w-full h-full" id="test" name="" />
    </Box>
  );
};
