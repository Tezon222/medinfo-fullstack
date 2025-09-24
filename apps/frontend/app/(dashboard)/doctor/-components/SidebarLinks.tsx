import CommunityIcon from "@/components/icons/CommunityIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

type MenuItem = {
	href: string;
	title: string;
	icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
};

export const menuItems: MenuItem[] = [
	{
		href: "/doctor",
		title: "Dashboard",
		icon: DashboardIcon,
	},
	{
		href: "/doctor/messages",
		title: "Messages",
		icon: MessageIcon,
	},
	{
		href: "/doctor/community",
		title: "Community",
		icon: CommunityIcon,
	},
	{
		href: "/doctor/profile",
		title: "Profile",
		icon: ProfileIcon,
	},
	{
		href: "/doctor/settings",
		title: "Settings",
		icon: SettingsIcon,
	},
];
