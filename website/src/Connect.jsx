import { Web3Modal, Web3Button } from '@web3modal/react';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: '4d86f1dfe2c4572572d03964edb301aa' }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function Connect() {
  return (
    <>
      <div className='connect-button'>
        <Web3Button icon='hide' label='Connect' />
      </div>
      <Web3Modal
        projectId='4d86f1dfe2c4572572d03964edb301aa'
        ethereumClient={ethereumClient}
        themeMode={'light'}
        themeColor={'blackWhite'}
        themeBackground={'themeColor'}
      />
    </>
  )
}