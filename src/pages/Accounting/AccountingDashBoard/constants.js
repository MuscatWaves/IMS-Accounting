import { MdOutlineAssignmentInd } from "react-icons/md";
// import { RiContactsBookLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

export const cards = (user) => [
  {
    id: 1,
    icon: BsPersonBadge,
    title: "Client Credentials",
    path: "/accounting/clients",
    description: "Manage client login data",
    disabled: !user.isHead,
  },
  {
    id: 2,
    icon: MdOutlineAssignmentInd,
    title: "Client Information",
    path: "/accounting/clientInformation",
    description: "Manage client information",
    disabled: !user.isHead,
  },
  {
    id: 3,
    icon: ImAttachment,
    title: "Client Attachments",
    path: "/accounting/clientAttachments",
    description: "Manage attachments for the client information",
    disabled: !user.isHead,
  },
  {
    id: 4,
    icon: ImAttachment,
    title: "Manage Client Access",
    path: "/accounting/manageClientAccess",
    description:
      "Manage client access according to the service or manufacturing sector",
    disabled: !user.isHead,
  },
  {
    id: 5,
    icon: BsPersonBadge,
    title: "Manage Accountant",
    path: "/accounting/manageAccountant",
    description: "Manage accountant accounts",
    disabled: !user.isHead,
  },
  {
    id: 5,
    icon: BsPersonBadge,
    title: "Manage Accountant Access",
    path: "/accounting/accaccess",
    description: "Manage accountant accounts access",
    disabled: !user.isHead,
  },
  {
    id: 6,
    icon: BsPersonBadge,
    title: "Accounting Data",
    path: "/accounting/preselectiondata",
    description: "Manage accounting data of users",
  },
];

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
    y: "100px",
  },
  show: {
    opacity: 1,
    y: "0px",
    delay: 1,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};
