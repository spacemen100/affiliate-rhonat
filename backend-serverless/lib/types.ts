// Types pour les commandes ClickBank
export interface ClickBankOrder {
    receipt: string;
    transactionType: string;
    vendor: string;
    affiliate: string;
    role: string;
    totalAccountAmount: number;
    paymentMethod: string;
    totalOrderAmount: number;
    totalTaxAmount: number;
    totalShippingAmount: number;
    currency: string;
    orderLanguage: string;
    lineItems: LineItem[];
    customer: Customer;
}

export interface LineItem {
    itemNo: string;
    productTitle: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Customer {
    billing: Address;
    shipping: Address;
}

export interface Address {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address1?: string;
    address2?: string;
    city?: string;
    county?: string;
    state?: string;
    postalCode?: string;
    country: string;
}

// Types pour les produits ClickBank
export interface ClickBankProduct {
    site: string;
    title: string;
    description: string;
    category: string;
    language: string;
    currency: string;
    price: number;
    commissionRate: number;
    gravity: number;
    rebillAmount?: number;
    rebillFrequency?: number;
}

// Types pour les analytics
export interface ClickBankAnalytics {
    totalSales: number;
    totalCommissions: number;
    totalOrders: number;
    period: {
        startDate: string;
        endDate: string;
    };
}

// Type pour la réponse d'erreur
export interface ClickBankError {
    error: string;
    message: string;
    statusCode: number;
}
