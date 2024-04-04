import { IoWalletOutline, IoTicketOutline, IoWalletSharp, IoTicket } from "react-icons/io5"
import { MdOutlineNotifications } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaUserCircle  } from "react-icons/fa";
import { BiCalendarEvent, BiSolidCalendarEvent  } from "react-icons/bi";


export const LINKS_HEADER = [ {
    href: "/Wallet",
    name: "Wallet",
    icon: IoWalletOutline,
    iconSelect: IoWalletSharp
},
{
    href: "/myTickets",
    name: "My Tickets",
    icon: IoTicketOutline,
    iconSelect: IoTicket

},
{
    href: "/",
    name: "Event",
    icon: BiCalendarEvent,
    iconSelect: BiSolidCalendarEvent
},
{
    href: "/notifications",
    name: "Notices",
    icon: MdOutlineNotifications,
    iconSelect: IoIosNotifications
},
{
    href: "/Configurations",
    name: "Profile",
    icon: FaRegUserCircle,
    iconSelect: FaUserCircle 
},
]