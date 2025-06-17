import { ChatbotHeader } from "@/components/layout/chatbot-header";
import { RootFooter } from "@/components/layout/root-footer";

const NoteBooksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col bg-background min-h-svh">
      <ChatbotHeader />
      <main className="flex flex-col flex-1 py-6 container">{children}</main>
      <RootFooter />
    </div>
  );
};

export default NoteBooksLayout;
