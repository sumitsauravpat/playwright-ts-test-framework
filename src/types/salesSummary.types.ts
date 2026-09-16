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

export interface SalesSummaryItem {
  ratePlanName?: APILocalizedName[];
  paymentPeriod?: string;
  deviceDetails?: DeviceDetail[];
  subscriptionTaxes?: SubscriptionTax[];
  ratePlanAndAddOnsNoTaxAmount: number;
  ratePlanAndAddOnsWithTaxAmount: number;
}

export interface SalesSummaryResponse {
  successInd: boolean;
  status: number;
  data: {
    quoteId: string;
    salesSummary: {
      salesSummaryItems: SalesSummaryItem[];
    };
  };
}
