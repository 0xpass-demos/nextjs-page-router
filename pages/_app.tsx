import { PassProvider, connectorsForWallets, createClient } from "0xpass";
import "0xpass/styles.css";
import "../styles/globals.css"

import {
  coinbaseWallet,
  emailMagicWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "0xpass/wallets";
import { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const connectWalletProjectId = "1ccaf857ab73b97e10a5a333aab8edaf"  //obtained from https://cloud.walletconnect.com/sign-in
const OxpassApiKey = "" //enter your 0xpass key obtained from https://0xpass.io/register
const magicPublicKey = "pk_live_262C7B7D9D959DBA" //obtained from https://dashboard.magic.link/signup

const { chains, publicClient } = configureChains(
    [polygonMumbai, mainnet, polygon, optimism, arbitrum],
    [ publicProvider()]
);

const passClient = createClient({ apiKey: OxpassApiKey, chains });
const connectors = connectorsForWallets([
  // {
  //   groupName: "Email",
  //   wallets: [
  //     emailMagicWallet({ apiKey: magicPublicKey, chains, shimDisconnect: true }),
  //   ],
  // },
  {
    groupName: "Wallets",
    wallets: [
      metaMaskWallet({ projectId: connectWalletProjectId, chains }),
      coinbaseWallet({ appName: "0xPass", chains }),
      walletConnectWallet({ projectId: connectWalletProjectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="bg-bottom-image min-h-screen">
        <WagmiConfig config={wagmiConfig}>
          <PassProvider client={passClient}>
            <Component {...pageProps} />
          </PassProvider>
        </WagmiConfig>
      </div>
  );
}

export default MyApp;
