import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

type CreateOrderInput = {
  userId: string;
  items: OrderItem[];
};

export type OrderRecord = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

@Injectable()
export class AppService {
  private readonly orders: OrderRecord[] = [];

  getHealth() {
    return { status: 'ok', service: 'order-service' };
  }

  listOrders(userId?: string) {
    if (!userId) {
      return this.orders;
    }

    return this.orders.filter((order) => order.userId === userId);
  }

  getOrderById(id: string) {
    const order = this.orders.find((item) => item.id === id);

    if (!order) {
      throw new NotFoundException(`Order ${id} was not found`);
    }

    return order;
  }

  createOrder(payload: CreateOrderInput) {
    if (!payload?.userId?.trim()) {
      throw new BadRequestException('userId is required');
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      throw new BadRequestException('items must contain at least one order line');
    }

    payload.items.forEach((item, index) => {
      if (!item.productId?.trim()) {
        throw new BadRequestException(`items[${index}].productId is required`);
      }

      if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
        throw new BadRequestException(`items[${index}].quantity must be > 0`);
      }

      if (!Number.isFinite(item.price) || item.price < 0) {
        throw new BadRequestException(`items[${index}].price must be >= 0`);
      }
    });

    const totalAmount = payload.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order: OrderRecord = {
      id: this.generateOrderId(),
      userId: payload.userId.trim(),
      items: payload.items,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.orders.unshift(order);

    return order;
  }

  cancelOrder(id: string) {
    const order = this.getOrderById(id);

    if (order.status === 'cancelled') {
      return order;
    }

    order.status = 'cancelled';
    return order;
  }

  private generateOrderId() {
    return `ord_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  }
}
