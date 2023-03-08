import { BsPersonBadge } from "react-icons/bs";

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
    disabled:
      !access?.financialStatements.filter((entry) => entry.value).length > 0,
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
