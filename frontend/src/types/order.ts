// order.ts - 订单相关类型定义

export interface OrderInfo {
  orderId: string
  productName: string
  productImage: string
  price: number
  paymentAmount: number
  isDetailsVisible: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  isActive: boolean
}

export interface CountdownTimer {
  totalSeconds: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export interface OrderData {
  orderInfo: OrderInfo
  paymentMethods: PaymentMethod[]
  countdown: CountdownTimer
  selectedPaymentMethod: string
}
