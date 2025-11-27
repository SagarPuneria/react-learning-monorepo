import {
  Drawer,
  Button,
  List,
  FlexboxGrid,
  Tag,
  InputNumber,
  Divider,
  Stack,
  IconButton,
  Message,
  useToaster,
} from 'rsuite';
import { Close, Trash } from '@rsuite/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotal,
  selectCartSubtotal,
  selectCartSavings,
} from '../store/selectors';
import {
  closeCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '../store/slices/cartSlice';
import {
  formatPrice,
  calculateDiscountedPrice,
  calculateItemTotal,
} from '@react-learning-monorepo/utils';

export function ShoppingCart() {
  const toaster = useToaster();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const cartSubtotal = useAppSelector(selectCartSubtotal);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartSavings = useAppSelector(selectCartSavings);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    dispatch(removeFromCart(productId));
    if (item) {
      toaster.push(
        <Message showIcon type="info" closable>
          <strong>{item.product.title}</strong> removed from cart
        </Message>,
        { placement: 'topEnd', duration: 2500 }
      );
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItemQuantity({ productId, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toaster.push(
      <Message showIcon type="warning" closable>
        Cart cleared
      </Message>,
      { placement: 'topEnd', duration: 2000 }
    );
  };

  const isEmpty = cartItems.length === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      placement="right"
      size="sm"
      className="shopping-cart-drawer"
    >
      <Drawer.Header>
        <Drawer.Title>
          <div className="flex justify-between items-center">
            <span>Shopping Cart ({cartItems.length})</span>
            {!isEmpty && (
              <Button
                size="xs"
                appearance="ghost"
                color="red"
                onClick={handleClearCart}
              >
                Clear All
              </Button>
            )}
          </div>
        </Drawer.Title>
        <Drawer.Actions>
          <IconButton icon={<Close />} onClick={handleClose} />
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        {isEmpty ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some products to get started!
            </p>
            <Button appearance="primary" onClick={handleClose} className="px-6">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <List hover className="cart-items-list">
              {cartItems.map((item) => {
                const discountedPrice = calculateDiscountedPrice(
                  item.product.price,
                  item.product.discountPercentage
                );
                const itemTotal = calculateItemTotal(
                  item.product,
                  item.quantity
                );

                return (
                  <List.Item key={item.id} className="cart-item">
                    <FlexboxGrid align="middle" className="w-full">
                      {/* Product Image */}
                      <FlexboxGrid.Item colspan={6}>
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={
                              item.product.thumbnail || item.product.images?.[0]
                            }
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NEwyMCA0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjwvcG9iPg==';
                            }}
                          />
                        </div>
                      </FlexboxGrid.Item>

                      {/* Product Details */}
                      <FlexboxGrid.Item colspan={12}>
                        <div className="px-3">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                            {item.product.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-green-600">
                              {formatPrice(discountedPrice)}
                            </span>
                            {item.product.discountPercentage > 0 && (
                              <>
                                <span className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.product.price)}
                                </span>
                                <Tag size="sm" color="red">
                                  -{Math.round(item.product.discountPercentage)}
                                  %
                                </Tag>
                              </>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total: {formatPrice(itemTotal)}
                          </div>
                        </div>
                      </FlexboxGrid.Item>

                      {/* Quantity Controls */}
                      <FlexboxGrid.Item colspan={6}>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <InputNumber
                              value={item.quantity}
                              onChange={(value) =>
                                handleUpdateQuantity(
                                  item.id,
                                  Number(value) || 1
                                )
                              }
                              min={1}
                              max={99}
                              size="xs"
                              style={{ width: '60px' }}
                            />
                          </div>
                          <IconButton
                            icon={<Trash />}
                            size="xs"
                            color="red"
                            appearance="ghost"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove item"
                          />
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                );
              })}
            </List>

            <Divider />

            {/* Cart Summary */}
            <div className="cart-summary bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Order Summary
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {cartSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(cartSavings)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">
                    {formatPrice(cartTotal * 0.08)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal + cartTotal * 0.08)}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <Stack spacing={12} className="mt-6">
                <Button
                  appearance="primary"
                  size="lg"
                  block
                  className="font-medium"
                  onClick={() => {
                    // This would typically navigate to checkout
                    alert('Checkout functionality would be implemented here');
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  appearance="ghost"
                  size="lg"
                  block
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
              </Stack>
            </div>
          </div>
        )}
      </Drawer.Body>
    </Drawer>
  );
}
