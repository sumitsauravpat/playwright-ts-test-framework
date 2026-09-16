export interface APILocalizedName {
  name: string;
  locale: string;
}

export interface DeviceDetail {
  deviceName: APILocalizedName[];
}

export interface SubscriptionTax {
  taxAmount: number;
  taxCode: string;
  taxRate: number;
}

export interface PromotionDetail {
  promotionBenefitDetails: {
    promotionBenefitNoTaxAmount: number;
  }[];
}

export interface SalesSummaryItem {
  ratePlanName?: APILocalizedName[];
  paymentPeriod?: string;
  deviceDetails?: DeviceDetail[];
  subscriptionTaxes?: SubscriptionTax[];
  ratePlanAndAddOnsNoTaxAmount: number;
  ratePlanAndAddOnsNoTaxBaseAmount: number;
  ratePlanAndAddOnsWithTaxAmount: number;
  promotionDetails?: PromotionDetail[];
}

export interface SalesSummaryResponse {
  successInd: boolean;
  status: number;
  data: {
    quoteId: string;
    salesSummary: {
      salesSummaryItems: SalesSummaryItem[];
      dueMonthlyNoTaxTotalAmount: number;
    };
  };
}
