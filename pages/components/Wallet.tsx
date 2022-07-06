import { Button } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const Wallet: React.FC<{}> = () => {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <Button variant="contained" onClick={() => disconnect()}>
        Disconnect
      </Button>
    );
  }
  return (
    <Button variant="contained" onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
};

export default Wallet;