import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';

describe('Count Notifications', () => {
  it('should to be able to count notifications', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const countRecipientNotifications = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient_1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient_2' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient_1' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient_1',
    });

    expect(count).toEqual(2);
  });
});
