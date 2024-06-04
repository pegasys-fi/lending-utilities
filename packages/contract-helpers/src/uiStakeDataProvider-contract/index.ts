import { providers } from 'ethers';
import { StakeUiDataProviderValidator } from '../commons/validators/methodValidators';
import { isEthAddress } from '../commons/validators/paramValidators';
import { StakedTokenDataProvider } from './typechain/StakedTokenDataProvider';
import { StakedTokenDataProvider__factory } from './typechain/StakedTokenDataProviderFactory';
import {
  GeneralStakeUIData,
  GeneralStakeUIDataHumanized,
  GetUserStakeUIData,
  GetUserStakeUIDataHumanized,
} from './types';

export interface UiStakeDataProviderInterface {
  getUserStakeUIData: (params: { user: string }) => Promise<GetUserStakeUIData>;
  getGeneralStakeUIData: () => Promise<GeneralStakeUIData>;
  getUserStakeUIDataHumanized: (params: {
    user: string;
  }) => Promise<GetUserStakeUIDataHumanized>;
  getGeneralStakeUIDataHumanized: () => Promise<GeneralStakeUIDataHumanized>;
}

export type UiStakeDataProviderContext = {
  uiStakeDataProvider: string;
  provider: providers.Provider;
};

export class UiStakeDataProvider implements UiStakeDataProviderInterface {
  private readonly _contract: StakedTokenDataProvider;

  public constructor(context: UiStakeDataProviderContext) {
    this._contract = StakedTokenDataProvider__factory.connect(
      context.uiStakeDataProvider,
      context.provider,
    );
  }

  @StakeUiDataProviderValidator
  public async getUserStakeUIData(
    @isEthAddress('user') { user }: { user: string },
  ): Promise<GetUserStakeUIData> {
    const {
      stkPegasysData,
      stkPegasysUserData,
      stkBptData,
      stkBptUserData,
      ethPrice,
    } = await this._contract.getAllStakedTokenUserData(user);

    return {
      stkPegasysData: {
        ...stkPegasysData,
        stakedTokenUserBalance: stkPegasysUserData.stakedTokenUserBalance,
        underlyingTokenUserBalance: stkPegasysUserData.underlyingTokenUserBalance,
        stakedTokenRedeemableAmount:
          stkPegasysUserData.stakedTokenRedeemableAmount,
        userCooldownAmount: stkPegasysUserData.userCooldownAmount,
        userCooldownTimestamp: stkPegasysUserData.userCooldownTimestamp,
        rewardsToClaim: stkPegasysUserData.rewardsToClaim,
      },
      stkBptData: {
        ...stkBptData,
        stakedTokenUserBalance: stkBptUserData.stakedTokenUserBalance,
        underlyingTokenUserBalance: stkBptUserData.underlyingTokenUserBalance,
        stakedTokenRedeemableAmount: stkBptUserData.stakedTokenRedeemableAmount,
        userCooldownAmount: stkBptUserData.userCooldownAmount,
        userCooldownTimestamp: stkBptUserData.userCooldownTimestamp,
        rewardsToClaim: stkBptUserData.rewardsToClaim,
      },
      ethPrice,
    };
  }

  @StakeUiDataProviderValidator
  public async getUserStakeUIDataHumanized(
    @isEthAddress('user') { user }: { user: string },
  ): Promise<GetUserStakeUIDataHumanized> {
    const contractResult = await this.getUserStakeUIData({ user });

    return {
      pegasys: {
        stakeTokenUserBalance:
          contractResult.stkPegasysData.stakedTokenUserBalance.toString(),
        underlyingTokenUserBalance:
          contractResult.stkPegasysData.underlyingTokenUserBalance.toString(),
        stakeTokenRedeemableAmount:
          contractResult.stkPegasysData.stakedTokenRedeemableAmount.toString(),
        userCooldownAmount:
          contractResult.stkPegasysData.userCooldownAmount.toString(),
        userCooldownTimestamp: contractResult.stkPegasysData.userCooldownTimestamp,
        userIncentivesToClaim:
          contractResult.stkPegasysData.rewardsToClaim.toString(),
      },
      bpt: {
        stakeTokenUserBalance:
          contractResult.stkBptData.stakedTokenUserBalance.toString(),
        underlyingTokenUserBalance:
          contractResult.stkBptData.underlyingTokenUserBalance.toString(),
        stakeTokenRedeemableAmount:
          contractResult.stkBptData.stakedTokenRedeemableAmount.toString(),
        userCooldownAmount:
          contractResult.stkBptData.userCooldownAmount.toString(),
        userCooldownTimestamp: contractResult.stkBptData.userCooldownTimestamp,
        userIncentivesToClaim:
          contractResult.stkBptData.rewardsToClaim.toString(),
      },
      ethPriceUsd: contractResult.ethPrice.toString(),
    };
  }

  public async getGeneralStakeUIData(): Promise<GeneralStakeUIData> {
    const { stkPegasysData, stkBptData, ethPrice } =
      await this._contract.getAllStakedTokenData();

    return {
      stkPegasysData,
      stkBptData,
      ethPrice,
    };
  }

  public async getGeneralStakeUIDataHumanized(): Promise<GeneralStakeUIDataHumanized> {
    const contractResult = await this.getGeneralStakeUIData();

    return {
      pegasys: {
        stakeTokenTotalSupply:
          contractResult.stkPegasysData.stakedTokenTotalSupply.toString(),
        stakeTokenTotalRedeemableAmount:
          contractResult.stkPegasysData.stakedTokenTotalRedeemableAmount.toString(),
        stakeCooldownSeconds:
          contractResult.stkPegasysData.stakeCooldownSeconds.toNumber(),
        stakeUnstakeWindow:
          contractResult.stkPegasysData.stakeUnstakeWindow.toNumber(),
        stakeTokenPriceEth:
          contractResult.stkPegasysData.stakedTokenPriceEth.toString(),
        rewardTokenPriceEth:
          contractResult.stkPegasysData.rewardTokenPriceEth.toString(),
        stakeApy: contractResult.stkPegasysData.stakeApy.toString(),
        distributionPerSecond:
          contractResult.stkPegasysData.distributionPerSecond.toString(),
        distributionEnd: contractResult.stkPegasysData.distributionEnd.toString(),
      },
      bpt: {
        stakeTokenTotalSupply:
          contractResult.stkBptData.stakedTokenTotalSupply.toString(),
        stakeTokenTotalRedeemableAmount:
          contractResult.stkPegasysData.stakedTokenTotalRedeemableAmount.toString(),
        stakeCooldownSeconds:
          contractResult.stkBptData.stakeCooldownSeconds.toNumber(),
        stakeUnstakeWindow:
          contractResult.stkBptData.stakeUnstakeWindow.toNumber(),
        stakeTokenPriceEth:
          contractResult.stkBptData.stakedTokenPriceEth.toString(),
        rewardTokenPriceEth:
          contractResult.stkBptData.rewardTokenPriceEth.toString(),
        stakeApy: contractResult.stkBptData.stakeApy.toString(),
        distributionPerSecond:
          contractResult.stkBptData.distributionPerSecond.toString(),
        distributionEnd: contractResult.stkBptData.distributionEnd.toString(),
      },
      ethPriceUsd: contractResult.ethPrice.toString(),
    };
  }
}
