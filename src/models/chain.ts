type chain = {
  chainName: string;
  chainId: string;
  theme: {
    backgroundColor: string;
    textColor: string;
  };
  nativeCurrency: {
    decimals: number;
    logoUri: string;
    name: string;
    symbol: string;
  };
  transactionService: string;
  blockExplorerUriTemplate: {
    address: string;
    api: string;
    txHash: string;
  };
  rpcUri: {
    authentication: string;
    value: string;
  };
};

export default chain;
