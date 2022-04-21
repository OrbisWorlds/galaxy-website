import { ChainInfo } from "@keplr-wallet/types";
const GALAXY_PREFIX = "galaxy"

const galaxiasChainConfig: ChainInfo = {
    rpc: process.env.REACT_APP_RPC_BASE_URL as string,
    rest: process.env.REACT_APP_API_BASE_URL as string,
    chainId: "galaxias-1",
    chainName: "Galaxias",
    stakeCurrency: {
        coinDenom: "GLX",
        coinMinimalDenom: "uglx",
        coinDecimals: 6,
        coinGeckoId: 'glx'
    },
    walletUrlForStaking: "https://wallet.keplr.app/#/galaxias/stake",
    bip44: {
        coinType: 118
    },
    bech32Config: {
        bech32PrefixAccAddr: GALAXY_PREFIX,
        bech32PrefixAccPub: `${GALAXY_PREFIX}pub`,
        bech32PrefixValAddr: `${GALAXY_PREFIX}valoper`,
        bech32PrefixValPub: `${GALAXY_PREFIX}valoperpub`,
        bech32PrefixConsAddr:
            `${GALAXY_PREFIX}valcons`,
        bech32PrefixConsPub:
            `${GALAXY_PREFIX}valconspub`,
    },
    currencies: [
        { coinDenom: "GLX", coinMinimalDenom: "uglx", coinDecimals: 6, coinGeckoId: "glx" }
    ],
    feeCurrencies: [
        {
            coinDenom: "GLX", coinMinimalDenom: "uglx", coinDecimals: 6, coinGeckoId: "glx"
        }
    ],
    gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
    },
}
const galaxyChainConfig: ChainInfo = {
    rpc: process.env.REACT_APP_RPC_BASE_URL as string,
    rest: process.env.REACT_APP_API_BASE_URL as string,
    chainId: "galaxy-1",
    chainName: "Galaxy",
    stakeCurrency: {
        coinDenom: "GLX",
        coinMinimalDenom: "uglx",
        coinDecimals: 6,
        coinGeckoId: 'glx'
    },
    walletUrlForStaking: "https://wallet.keplr.app/#/galaxy/stake",
    bip44: {
        coinType: 118
    },
    bech32Config: {
        bech32PrefixAccAddr: GALAXY_PREFIX,
        bech32PrefixAccPub: `${GALAXY_PREFIX}pub`,
        bech32PrefixValAddr: `${GALAXY_PREFIX}valoper`,
        bech32PrefixValPub: `${GALAXY_PREFIX}valoperpub`,
        bech32PrefixConsAddr:
            `${GALAXY_PREFIX}valcons`,
        bech32PrefixConsPub:
            `${GALAXY_PREFIX}valconspub`,
    },
    currencies: [
        { coinDenom: "GLX", coinMinimalDenom: "uglx", coinDecimals: 6, coinGeckoId: "glx" }
    ],
    feeCurrencies: [
        {
            coinDenom: "GLX", coinMinimalDenom: "uglx", coinDecimals: 6, coinGeckoId: "glx"
        }
    ],
    gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
    },
}

export const chainConfig: ChainInfo = process.env.REACT_APP_CHAIN_NETWORK === 'mainnet' ? galaxyChainConfig : galaxiasChainConfig