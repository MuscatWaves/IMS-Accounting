import { BsPersonBadge } from "react-icons/bs";
import { MdOutlineAssignmentInd } from "react-icons/md";

export const cards = (user, access) => [
  {
    id: 1,
    icon: BsPersonBadge,
    title: "Daily Entries",
    path: `/accounting/client/dailyentries/${user.clientAccountId}/${user.name
      .replace("/", "-")
      .replace(/\s+/g, "_")
      .replace(/\./g, "")}`,
    description: "View/Manage Daily Entries",
    disabled: !(
      access?.purchase.filter((entry) => entry.value).length > 0 ||
      access?.sales.filter((entry) => entry.value).length > 0 ||
      access?.entries.filter((entry) => entry.value).length > 0
    ),
  },
  {
    id: 2,
    icon: BsPersonBadge,
    title: "Financial Statements",
    path: `/accounting/client/fs/${user.clientAccountId}/${user.name
      .replace("/", "-")
      .replace(/\s+/g, "_")
      .replace(/\./g, "")}`,
    description: "View Financial Statements",
    disabled: !(
      access?.financialStatements.filter((entry) => entry.value).length > 0 &&
      user.isHead
    ),
  },
  {
    id: 3,
    icon: MdOutlineAssignmentInd,
    title: "Invoices",
    path: `/accounting/client/invoice/${user.clientAccountId}/${user.name
      .replace("/", "-")
      .replace(/\s+/g, "_")
      .replace(/\./g, "")}`,
    description: "View Invoice Details",
    disabled: !(access.invoice && user.isHead),
  },
  {
    id: 4,
    icon: MdOutlineAssignmentInd,
    title: "PR Invoices",
    path: `/accounting/client/prinvoice/${user.clientAccountId}/${user.name
      .replace("/", "-")
      .replace(/\s+/g, "_")
      .replace(/\./g, "")}`,
    description: "View PR Invoice Details",
    disabled: !(access.prInvoice && user.isHead),
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
