import {
  Calendar,
  Home,
  Cpu,
  Settings,
  ChartColumnDecreasingIcon,
  BotMessageSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/components/ui/sidebar";
import { NavUser } from "./nav-user";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartColumnDecreasingIcon,
  },
  {
    title: "Devices",
    url: "/devices",
    icon: Cpu,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: BotMessageSquare,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="">
        <NavUser
          user={{
            name: "Lichen Works",
            email: "vikalpsh1234@gmail.com",
            avatar: "lol",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>LichenWorks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "Vikalp",
            email: "vikalpsh1234@gmail.com",
            avatar: "lol",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
