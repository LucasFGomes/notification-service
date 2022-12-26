import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { GetRecipientNotificationsUseCase } from './GetRecipientNotificationsUseCase';

describe('Get recipients notifications', () => {
  it('should to be able to get recipients notifications', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const getRecipientNotifications = new GetRecipientNotificationsUseCase(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient_1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient_1' }),
        expect.objectContaining({ recipientId: 'recipient_1' }),
      ]),
    );
  });
});
