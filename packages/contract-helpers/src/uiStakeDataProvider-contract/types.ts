import { BigNumber } from 'ethers';

export type GeneralStakeUIData = {
  stkPegasysData: {
    stakedTokenTotalSupply: BigNumber;
    stakedTokenTotalRedeemableAmount: BigNumber;
    stakeCooldownSeconds: BigNumber;
    stakeUnstakeWindow: BigNumber;
    rewardTokenPriceEth: BigNumber;
    distributionEnd: BigNumber;
    distributionPerSecond: BigNumber;
    stakedTokenPriceEth: BigNumber;
    stakeApy: BigNumber;
  };
  stkBptData: {
    stakedTokenTotalSupply: BigNumber;
    stakedTokenTotalRedeemableAmount: BigNumber;
    stakeCooldownSeconds: BigNumber;
    stakeUnstakeWindow: BigNumber;
    rewardTokenPriceEth: BigNumber;
    distributionEnd: BigNumber;
    distributionPerSecond: BigNumber;
    stakedTokenPriceEth: BigNumber;
    stakeApy: BigNumber;
  };
  ethPrice: BigNumber;
};

export type GetUserStakeUIData = {
  stkPegasysData: {
    stakedTokenUserBalance: BigNumber;
    underlyingTokenUserBalance: BigNumber;
    stakedTokenRedeemableAmount: BigNumber;
    userCooldownAmount: BigNumber;
    userCooldownTimestamp: number;
    rewardsToClaim: BigNumber;
  };
  stkBptData: {
    stakedTokenUserBalance: BigNumber;
    underlyingTokenUserBalance: BigNumber;
    stakedTokenRedeemableAmount: BigNumber;
    userCooldownAmount: BigNumber;
    userCooldownTimestamp: number;
    rewardsToClaim: BigNumber;
  };
  ethPrice: BigNumber;
};

export type GeneralStakeUIDataHumanized = {
  pegasys: {
    stakeTokenTotalSupply: string;
    stakeTokenTotalRedeemableAmount: string;
    stakeCooldownSeconds: number;
    stakeUnstakeWindow: number;
    stakeTokenPriceEth: string;
    rewardTokenPriceEth: string;
    stakeApy: string;
    distributionPerSecond: string;
    distributionEnd: string;
  };
  bpt: {
    stakeTokenTotalSupply: string;
    stakeTokenTotalRedeemableAmount: string;
    stakeCooldownSeconds: number;
    stakeUnstakeWindow: number;
    stakeTokenPriceEth: string;
    rewardTokenPriceEth: string;
    stakeApy: string;
    distributionPerSecond: string;
    distributionEnd: string;
  };

  ethPriceUsd: string;
};

export type GetUserStakeUIDataHumanized = {
  pegasys: {
    stakeTokenUserBalance: string;
    underlyingTokenUserBalance: string;
    stakeTokenRedeemableAmount: string;
    userCooldownAmount: string;
    userCooldownTimestamp: number;
    userIncentivesToClaim: string;
  };
  bpt: {
    stakeTokenUserBalance: string;
    underlyingTokenUserBalance: string;
    stakeTokenRedeemableAmount: string;
    userCooldownAmount: string;
    userCooldownTimestamp: number;
    userIncentivesToClaim: string;
  };
  ethPriceUsd: string;
};
