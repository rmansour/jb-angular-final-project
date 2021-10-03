export class Category {
  id: number;
  category: string;

  constructor(id: number, category: string) {
    this.id = id;
    this.category = category;
  }
}

export class Product {
  id: number;
  product_name: string;
  price: number;
  type: string;
  filename: string;
  category_id: number;

  constructor(id: number, product_name: string, price: number, type: string, filename: string, category_id: number) {
    this.id = id;
    this.product_name = product_name;
    this.price = price;
    this.type = type;
    this.filename = filename;
    this.category_id = category_id;
  }
}

export class Order {
  id: number;
  userId: number;
  orderDate: string;
  shippingDate: string;
  totalPrice: number;
  shippingCity: string;
  shippingAddress: string;
  creditCardNumber: string;

  constructor(id: number, userId: number, orderDate: string, shippingDate: string, totalPrice: number, shippingCity: string, shippingAddress: string, creditCardNumber: string) {
    this.id = id;
    this.userId = userId;
    this.orderDate = orderDate;
    this.shippingDate = shippingDate;
    this.totalPrice = totalPrice;
    this.shippingCity = shippingCity;
    this.shippingAddress = shippingAddress;
    this.creditCardNumber = creditCardNumber;
  }
}

export class OrderItem {
  id: number;
  orderId: number;
  productId: number;
  price: number;
  qnt: number;
  product?: Product;

  constructor(id: number, orderId: number, productId: number, price: number, qnt: number, product: Product) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.price = price;
    this.qnt = qnt;
    this.product = product;
  }
}

export class ShoppingCartItem {
  id: number;
  userId: number;
  productId: number;
  qnt: number;
  product?: Product;

  constructor(id: number, userId: number, productId: number, qnt: number, product?: Product) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.qnt = qnt;
    this.product = product;
  }
}

export class User {
  id: number;
  IDnum: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  cartCreatedDate: string;
  isAdmin: number;

  constructor(id: number, IDnum: number, firstName: string, lastName: string, email: string, city: string, street: string, cartCreatedDate: string, isAdmin: number) {
    this.id = id;
    this.IDnum = IDnum;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.city = city;
    this.street = street;
    this.cartCreatedDate = cartCreatedDate;
    this.isAdmin = isAdmin;
  }
}
