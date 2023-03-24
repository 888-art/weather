import { useEffect } from "react";
import { notification } from "antd";

interface IUseNotificationProps {
  isShowNotification: boolean;
  description: string;
  title: string;
  duration?: number;
}

export const useNotification = ({
  isShowNotification,
  description,
  title,
  duration = 3000,
}: IUseNotificationProps) => {
  useEffect(() => {
    isShowNotification &&
      notification.open({
        message: title,
        description,
        duration,
        placement: "bottomLeft",
      });
  }, [description, duration, isShowNotification, title]);
};
