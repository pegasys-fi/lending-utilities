import { constants, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import { IncentivesValidator } from '../commons/validators/methodValidators';
import {
  isEthAddress,
  isEthAddressArray,
} from '../commons/validators/paramValidators';
import { IPegasysIncentivesControllerV2 } from './typechain/IPegasysIncentivesControllerV2';
import { IPegasysIncentivesControllerV2__factory } from './typechain/IPegasysIncentivesControllerV2__factory';

export type ClaimRewardsV2MethodType = {
  user: string;
  assets: string[];
  reward: string;
  to?: string;
  incentivesControllerAddress: string;
};

export type ClaimAllRewardsV2MethodType = {
  user: string;
  assets: string[];
  to?: string;
  incentivesControllerAddress: string;
};

export interface IncentivesControllerV2Interface {
  claimRewards: (
    args: ClaimRewardsV2MethodType,
  ) => EthereumTransactionTypeExtended[];
  claimAllRewards: (
    args: ClaimAllRewardsV2MethodType,
  ) => EthereumTransactionTypeExtended[];
}

export class IncentivesControllerV2
  extends BaseService<IPegasysIncentivesControllerV2>
  implements IncentivesControllerV2Interface
{
  constructor(provider: providers.Provider) {
    super(provider, IPegasysIncentivesControllerV2__factory);
  }

  @IncentivesValidator
  public claimRewards(
    @isEthAddress('user')
    @isEthAddress('incentivesControllerAddress')
    @isEthAddress('to')
    @isEthAddress('reward')
    @isEthAddressArray('assets')
    {
      user,
      assets,
      to,
      incentivesControllerAddress,
      reward,
    }: ClaimRewardsV2MethodType,
  ): EthereumTransactionTypeExtended[] {
    const incentivesContract: IPegasysIncentivesControllerV2 =
      this.getContractInstance(incentivesControllerAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        incentivesContract.populateTransaction.claimRewards(
          assets,
          constants.MaxUint256.toString(),
          to ?? user,
          reward,
        ),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.REWARD_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  @IncentivesValidator
  public claimAllRewards(
    @isEthAddress('user')
    @isEthAddress('incentivesControllerAddress')
    @isEthAddress('to')
    @isEthAddressArray('assets')
    {
      user,
      assets,
      to,
      incentivesControllerAddress,
    }: ClaimAllRewardsV2MethodType,
  ): EthereumTransactionTypeExtended[] {
    const incentivesContract: IPegasysIncentivesControllerV2 =
      this.getContractInstance(incentivesControllerAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        incentivesContract.populateTransaction.claimAllRewards(
          assets,
          to ?? user,
        ),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.REWARD_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }
}
