### API Endpoints

**Product Routes** (`/api/v1/products`)

- `GET "/"` : get all products
- `GET "/id/:id"` : get a particular product by id
- `POST "/"` : add product/products

**Category Routes** (`/api/v1/category`)

- `GET "/featured"` : get all featured categories
- `GET "/list"` : get all categories
- `GET "/id/:id"` : get category by id
- `POST "/"` : add category/categories

**Cart Routes** (`/api/v1/cart`)

- `GET "/"` : get all items in cart
- `POST "/"` : add an item to cart
- `DELETE "/"` : delete an item from cart

**Wishlist Routes** (`/api/v1/wishlist`)

- `GET "/"` : get all wishlisted items
- `POST "/"` : add an item to wishlist
- `DELETE "/"` : remove an item from wishlist

**Address Routes** (`/api/v1/address`)

- `GET "/"` : get all address
- `GET "/id/:id"` : get an adress detail
- `POST "/"` : add an adress

**Order Routes** (`/api/v1/orders`)

- `GET "/"` : get all orders placed
- `GET "/id/:id"` : get order details
- `POST "/"` : add order placed
- `DELETE "/"` : delete an order
