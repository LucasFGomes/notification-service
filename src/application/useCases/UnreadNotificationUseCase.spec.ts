import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { UnreadNotificationUseCase } from './UnreadNotificationUseCase';

describe('Unread Notification', () => {
  it('should to be able to unread notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should to be able to unread notification a non existing notification', () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
