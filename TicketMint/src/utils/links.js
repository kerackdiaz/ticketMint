import { IoWalletOutline, IoTicketOutline } from "react-icons/io5"
import { TbCalendarSearch } from "react-icons/tb";
import { MdOutlineNotifications, MdOutlineNotificationsActive } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa6";


export const LINKS_HEADER = [ {
    href: "/Wallet",
    name: "Wallet",
    icon: IoWalletOutline
},
{
    href: "/myTickets",
    name: "My Tickets",
    icon: IoTicketOutline
},
{
    href: "/",
    name: "Event",
    icon: TbCalendarSearch
},
{
    href: "/notifications",
    name: "Notis",
    icon: MdOutlineNotifications
},
{
    href: "/Configurations",
    name: "Perfil",
    icon: FaUserAstronaut
},
]