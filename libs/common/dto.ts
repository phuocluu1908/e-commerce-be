export class CreateUserDto {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
}

export class LoginDto {
  email!: string;
  password!: string;
}

export class AuthTokenDto {
  accessToken!: string;
  refreshToken!: string;
  expiresIn!: number;
}

export class CreateProductDto {
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  category!: string;
  images!: string[];
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  images?: string[];
}

export class CreateOrderDto {
  userId!: string;
  items!: OrderItemDto[];
  shippingAddress!: AddressDto;
  billingAddress!: AddressDto;
}

export class OrderItemDto {
  productId!: string;
  quantity!: number;
  price!: number;
}

export class AddressDto {
  street!: string;
  city!: string;
  state!: string;
  zipCode!: string;
  country!: string;
}

export class CreatePaymentDto {
  orderId!: string;
  amount!: number;
  currency!: string;
  paymentMethod!: string;
  stripeTokenId!: string;
}

export class UpdateInventoryDto {
  productId!: string;
  quantity!: number;
  operation!: 'add' | 'subtract';
}
