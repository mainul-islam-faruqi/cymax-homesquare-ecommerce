# Elastic Path Promotions

There are 2 distict promotion types which need to be handled differently in the code.

1. Cart level promotions, which exist on the cart level as a cart 'item' (an element of the 'items' array). These are uniquely identified with 'sku'. The way to tell if an 'item' is a cart-level promotion is if the 'value' property is less than 0.

2. Item level promotions, which exist on the item level as a property called 'discounts'. These are uniquely idetified with the 'identifier' or 'code' property.

See https://useast.cm.elasticpath.com/promotions for all Elastic Path promotions.
