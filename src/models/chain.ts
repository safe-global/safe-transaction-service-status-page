type chain = {
  chainName: string;
  chainLogoUri: string;
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
  publicRpcUri: {
    authentication: string;
    value: string;
  };
};

export default chain;
