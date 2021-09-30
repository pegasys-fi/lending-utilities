import BigNumber from 'bignumber.js';
import { rayDiv } from '../../ray.math';
import { calculateAccruedIncentives } from './calculate-accrued-incentives';
import {
  ReserveIncentiveData,
  UserReserveData,
  UserReserveIncentiveData,
} from './calculate-total-user-incentives';

export interface CalculateUserReserveIncentivesRequest {
  reserveIncentives: ReserveIncentiveData; // token incentive data, from UiIncentiveDataProvider
  userReserveIncentives: UserReserveIncentiveData; // user incentive data, from UiIncentiveDataProvider
  currentTimestamp: number;
  userReserveData: UserReserveData;
}

export interface CalculateUserReserveIncentivesResponse {
  aIncentives: BigNumber; // deposit incentives
  vIncentives: BigNumber; // variable debt incentives
  sIncentives: BigNumber; // stable debt incentives
}

// Calculate user deposit and borrow incentives for an individual reserve asset
export function calculateUserReserveIncentives({
  reserveIncentives,
  userReserveIncentives,
  currentTimestamp,
  userReserveData,
}: CalculateUserReserveIncentivesRequest): CalculateUserReserveIncentivesResponse {
  const totalDeposits = rayDiv(
    new BigNumber(userReserveData.totalLiquidity),
    new BigNumber(userReserveData.liquidityIndex),
  );
  const aIncentivesRequest = {
    principalUserBalance: new BigNumber(userReserveData.scaledATokenBalance),
    reserveIndex: new BigNumber(
      reserveIncentives.aIncentiveData.tokenIncentivesIndex,
    ),
    userIndex: new BigNumber(
      userReserveIncentives.aTokenIncentivesUserData.tokenIncentivesUserIndex,
    ),
    precision: reserveIncentives.aIncentiveData.precision,
    rewardTokenDecimals: reserveIncentives.aIncentiveData.rewardTokenDecimals,
    reserveIndexTimestamp:
      reserveIncentives.aIncentiveData.incentivesLastUpdateTimestamp,
    emissionPerSecond: new BigNumber(
      reserveIncentives.aIncentiveData.emissionPerSecond,
    ),
    totalSupply: totalDeposits,
    currentTimestamp: currentTimestamp,
    emissionEndTimestamp: reserveIncentives.aIncentiveData.emissionEndTimestamp,
  };

  const vIncentivesRequest = {
    principalUserBalance: new BigNumber(userReserveData.scaledVariableDebt),
    reserveIndex: new BigNumber(
      reserveIncentives.vIncentiveData.tokenIncentivesIndex,
    ),
    userIndex: new BigNumber(
      userReserveIncentives.vTokenIncentivesUserData.tokenIncentivesUserIndex,
    ),
    precision: reserveIncentives.vIncentiveData.precision,
    rewardTokenDecimals: reserveIncentives.vIncentiveData.rewardTokenDecimals,
    reserveIndexTimestamp:
      reserveIncentives.vIncentiveData.incentivesLastUpdateTimestamp,
    emissionPerSecond: new BigNumber(
      reserveIncentives.vIncentiveData.emissionPerSecond,
    ),
    totalSupply: new BigNumber(userReserveData.totalScaledVariableDebt),
    currentTimestamp: currentTimestamp,
    emissionEndTimestamp: reserveIncentives.vIncentiveData.emissionEndTimestamp,
  };

  const sIncentivesRequest = {
    principalUserBalance: new BigNumber(userReserveData.principalStableDebt),
    reserveIndex: new BigNumber(
      reserveIncentives.sIncentiveData.tokenIncentivesIndex,
    ),
    userIndex: new BigNumber(
      userReserveIncentives.sTokenIncentivesUserData.tokenIncentivesUserIndex,
    ),
    precision: reserveIncentives.sIncentiveData.precision,
    rewardTokenDecimals: reserveIncentives.sIncentiveData.rewardTokenDecimals,
    reserveIndexTimestamp:
      reserveIncentives.sIncentiveData.incentivesLastUpdateTimestamp,
    emissionPerSecond: new BigNumber(
      reserveIncentives.sIncentiveData.emissionPerSecond,
    ),
    totalSupply: new BigNumber(userReserveData.totalPrincipalStableDebt),
    currentTimestamp: currentTimestamp,
    emissionEndTimestamp: reserveIncentives.sIncentiveData.emissionEndTimestamp,
  };

  const aIncentives = calculateAccruedIncentives(aIncentivesRequest);
  const vIncentives = calculateAccruedIncentives(vIncentivesRequest);
  const sIncentives = calculateAccruedIncentives(sIncentivesRequest);

  return { aIncentives, vIncentives, sIncentives };
}