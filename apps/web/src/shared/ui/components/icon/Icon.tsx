import { type ComponentType, type SVGProps } from "react";

import add from "../../icons/add.svg?react";
import arrowRightBlue from "../../icons/arrowRightBlue.svg?react";
import calendar from "../../icons/calendar.svg?react";
import calendarBold from "../../icons/calendarBold.svg?react";
import customers from "../../icons/customers.svg?react";
import customersBold from "../../icons/customersBold.svg?react";
import dashboard from "../../icons/dashboard.svg?react";
import dashboardBold from "../../icons/dashboardBold.svg?react";
import deals from "../../icons/deals.svg?react";
import dealsBold from "../../icons/dealsBold.svg?react";
import logo from "../../icons/logo.svg?react";
import modalClose from "../../icons/modalClose.svg?react";
import notifications from "../../icons/notifications.svg?react";
import notificationsBold from "../../icons/notificationsBold.svg?react";
import search from "../../icons/search.svg?react";
import settings from "../../icons/settings.svg?react";
import settingsBold from "../../icons/settingsBold.svg?react";
import tasks from "../../icons/tasks.svg?react";
import tasksBold from "../../icons/tasksBold.svg?react";
import toastClose from "../../icons/toastClose.svg?react";
import toastFire from "../../icons/toastFire.svg?react";
import toastFirework from "../../icons/toastFirework.svg?react";
import warning from "../../icons/warning.svg?react";

export type NavIconName =
  | "dashboard"
  | "deals"
  | "customers"
  | "tasks"
  | "calendar"
  | "notifications"
  | "settings";

type NavIconNameBold = `${NavIconName}Bold`;
type StaticIcons =
  | "add"
  | "logo"
  | "search"
  | "modalClose"
  | "arrowRightBlue"
  | "warning";
export type ToastIcons = "fire" | "firework" | "toastClose";

export type IconName = ToastIcons | StaticIcons | NavIconName | NavIconNameBold;

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  add,
  logo,
  search,
  dashboard,
  dashboardBold,
  deals,
  dealsBold,
  tasks,
  tasksBold,
  customers,
  customersBold,
  calendar,
  calendarBold,
  notifications,
  notificationsBold,
  settings,
  settingsBold,
  firework: toastFirework,
  fire: toastFire,
  toastClose,
  modalClose,
  arrowRightBlue,
  warning,
};

interface IconProps {
  name: IconName;
}

export const Icon = ({ name }: IconProps) => {
  const IconComponent = icons[name];
  return <IconComponent />;
};
