import chain from "src/models/chain";

function getRpcUri(chain: chain): string {
  return chain.publicRpcUri.value;
}

export default getRpcUri;
