import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';

export default function Notifications() {
  const staticFunction = App.useApp();

  const message: MessageInstance = staticFunction.message;
  const notification: NotificationInstance = staticFunction.notification;

  return { message, notification };
}
