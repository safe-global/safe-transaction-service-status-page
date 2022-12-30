import chain from "src/models/chain";

const { REACT_APP_INFURA_TOKEN } = process.env;

function getRpcUri(rpcUri: chain["rpcUri"]): string {
  const isAuthenticatedUri = rpcUri.authentication === "API_KEY_PATH";

  if (isAuthenticatedUri) {
    return `${rpcUri.value}${REACT_APP_INFURA_TOKEN}`;
  }

  return rpcUri.value;
}

export default getRpcUri;
