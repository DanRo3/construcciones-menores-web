import { notification } from "antd";
import { ReactNode } from "react";

export const openNotification = (
  type: "success" | "info" | "warning" | "error",
  message: string,
  description: string,
  icon?: ReactNode,
  duration: number = 2.5,
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "topRight"
) => {
  notification[type]({
    message,
    description,
    icon,
    duration,
    placement,
  });
};
