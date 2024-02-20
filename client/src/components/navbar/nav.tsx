import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function nav() {
  return (
    <div className="">
      <Menubar className="h-16 bg-blue-300 border-none rounded-none rounded">
        <MenubarMenu>
          {/* <MenubarTrigger className=""></MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem></MenubarItem>
          </MenubarContent> */}
          <Tabs defaultValue="account" className="w-[350px]">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="bar">Bar Graph</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent> */}
          </Tabs>
        </MenubarMenu>


      </Menubar>
    </div>
  );
}