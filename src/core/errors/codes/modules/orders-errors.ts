export const ORDERS_ERRORS = {
  ORDER_NOT_FOUND: 'order_not_found',
  ORDER_ITEM_NOT_FOUND: 'order_item_not_found',
  DUPLICATE_ORDER_ITEM: 'order_duplicate_item',
  INVALID_ORDER_STATUS: 'order_invalid_status_transition',
  INSUFFICIENT_ITEMS: 'order_must_have_at_least_one_item',
} as const;
