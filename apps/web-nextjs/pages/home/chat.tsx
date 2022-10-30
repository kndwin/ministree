import { Layout, getLayout } from 'apps/web-nextjs/common/ui/layout';
import { ChatMessages, ChatsSelections } from 'apps/web-nextjs/features/chat';

export default function ChatPage() {
  return (
    <Layout.Main>
      <ChatsSelections />
      <ChatMessages />
    </Layout.Main>
  );
}

ChatPage.getLayout = getLayout;
