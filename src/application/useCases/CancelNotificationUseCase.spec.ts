import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Cancel Notification', () => {
  it('should to be able to cancel notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should to be able to cancel notification a non existing notification', () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
