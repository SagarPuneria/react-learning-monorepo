import { useEffect } from 'react';
import { Message, useToaster } from 'rsuite';
import { useAppSelector } from '../store/hooks';
import { selectCartLastAddedItem } from '../store/selectors';

export function NotificationContainer() {
  const toaster = useToaster();
  const lastAddedItem = useAppSelector(selectCartLastAddedItem);

  useEffect(() => {
    if (lastAddedItem) {
      toaster.push(
        <Message showIcon type="success" closable>
          <strong>{lastAddedItem.product.title}</strong> added to cart
        </Message>,
        { placement: 'topEnd', duration: 3000 }
      );
    }
  }, [lastAddedItem, toaster]);

  return null;
}
