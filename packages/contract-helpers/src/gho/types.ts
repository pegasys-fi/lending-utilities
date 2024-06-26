export interface GhoReserveData {
  ghoBaseVariableBorrowRate: string;
  ghoDiscountedPerToken: string;
  ghoDiscountRate: string;
  ghoMinDebtTokenBalanceForDiscount: string;
  ghoMinDiscountTokenBalanceForDiscount: string;
  ghoReserveLastUpdateTimestamp: string;
  ghoCurrentBorrowIndex: string;
  pegasysFacilitatorBucketLevel: string;
  pegasysFacilitatorBucketMaxCapacity: string;
}

export interface GhoUserData {
  userGhoDiscountPercent: string;
  userDiscountTokenBalance: string;
  userPreviousGhoBorrowIndex: string;
  userGhoScaledBorrowBalance: string;
}
