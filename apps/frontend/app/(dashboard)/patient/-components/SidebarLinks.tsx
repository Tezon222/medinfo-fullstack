import CommunityIcon from "@/components/icons/CommunityIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

type MenuItem = {
	href: string;
	title: string;
	icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

export const menuItems: MenuItem[] = [
	{
		href: "/patient",
		title: "Dashboard",
		icon: DashboardIcon,
	},
	{
		href: "/patient/messages",
		title: "Messages",
		icon: MessageIcon,
	},
	{
		href: "/patient/community",
		title: "Community",
		icon: CommunityIcon,
	},
	{
		href: "/patient/profile",
		title: "Profile",
		icon: ProfileIcon,
	},
	{
		href: "/patient/settings",
		title: "Settings",
		icon: SettingsIcon,
	},
];
