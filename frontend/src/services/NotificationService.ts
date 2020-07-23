import NotificationStore from "../stores/NotificationStore";
import {NotificationType} from "../enum/NotificationType";
import {UINotification, UINotificationOptions} from "../interfaces/UINotification";


class NotificationService {
    static createUINotification(message: string, type: NotificationType, options: Partial<UINotificationOptions> = {}): UINotification{
        return {
            message,
            type,
            created: new Date(),
            options: Object.assign({}, {timeout: 5000, title: "BitLink"}, options),
            timer: null
        }
    }

    static add(notification: UINotification, systemNotification = false) {
        notification.timer = setTimeout(() => {
            NotificationStore.store.remove(notification);
        }, (notification.created.getTime() + notification.options.timeout) - Date.now());
        NotificationStore.store.push(notification);
        if (systemNotification) {
            this.systemNotify(notification);
        }
    }

    static systemNotify(notification: UINotification) {
        if (!("Notification" in window)) {
            return;
        }
        if (Notification.permission !== "granted" || document.hasFocus()) {
            return;
        }
        new Notification(notification.options.title, {
            body: notification.message
        });
    }

    static reset() {
        NotificationStore.store.clear();
    }

    static requestPermission() {
        if (!("Notification" in window)) {
            return;
        }
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }
}
export default NotificationService;
