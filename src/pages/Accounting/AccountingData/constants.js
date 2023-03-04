import { MdOutlineAssignmentInd } from "react-icons/md";
// import { RiContactsBookLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

export const cards = (user, params) => [
  {
    id: 1,
    icon: BsPersonBadge,
    title: "Entries",
    path: `/accounting/entries/${params.id}/${params.name}`,
    description: "Manage client daily entries data",
    // disabled: !user.isHead,
  },
  {
    id: 2,
    icon: MdOutlineAssignmentInd,
    title: "Financial Statements",
    path: `/accounting/fs/${params.id}/${params.name}`,
    description: "Manage financial statements for clients",
    // disabled: !user.isHead,
  },
  {
    id: 3,
    icon: MdOutlineAssignmentInd,
    title: "Manage Invoices",
    path: `/accounting/invoice/${params.id}/${params.name}`,
    description: "Manage invoice details for client",
    // disabled: !user.isHead,
  },
  {
    id: 4,
    icon: MdOutlineAssignmentInd,
    title: "Manage PR Invoices",
    path: `/accounting/prinvoice/${params.id}/${params.name}`,
    description: "Manage PR Invoices for client",
    // disabled: !user.isHead,
  },
  {
    id: 5,
    icon: ImAttachment,
    title: "Report",
    path: "/accounting/clientAttachments",
    description: "Manage attachments for the client data",
    // disabled: !user.isHead,
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
