
# Muon-AI-Safe

**Muon-AI-Safe** is an NPM package that serves as a client for interacting with MUON AI-Safe wallets. Developers can use it to perform actions securely through a Muon Safe Wallet in conjunction with a MUON app for verification and signature generation.

## Installation

To install the `Muon-AI-Safe` package in your Node.js project, run the following command:

```bash
npm install muon-ai-safe
```

## Setup

1. **Create a MUON Safe Wallet:**
   - Start by creating a MUON Safe wallet through the official MUON platform.
   
2. **Implement a MUON App:**
   - You'll need to create and configure a MUON app for your actions. This app will verify agent signatures and execute on-chain transactions.
   - Verify the address and signature of the agent in the MUON app to ensure the agent has access to the wallet.

3. **Obtain the Agent's Private Key:**
   - For signing actions, you'll need the agent's private key. This key is used to sign the action and parameters before executing it on-chain.

## Usage

### Initialize the Muon Safe Client

To interact with the MUON Safe wallet, initialize the `MuonSafeClient` in your project as follows:

```javascript
const muonClient = new MuonSafeClient(
  process.env.AGENT_ADDRESS,   // The agent's address
  process.env.MUON_APP_NAME    // The name of the MUON app
);
```

Make sure to replace `process.env.AGENT_ADDRESS` and `process.env.MUON_APP_NAME` with your actual environment variables or string literals.

### Perform an Action

Once the client is initialized, you can call `performAction` to execute actions on the wallet:

```javascript
await muonClient.performAction(
  "action",  // The action to be performed
  {
    param1: value1,   // Action parameters
    param2: value2,
    // Add additional parameters here
  },
  agentSign // The agent's signature for validation
);
```

### Generate the Agent's Signature

To generate the signature, you'll need to sign the action and parameters using the agent's private key:

```javascript
const { signature: agentSign } = web3.eth.accounts.sign(
  web3.utils.soliditySha3(action, ...params),
  privateKey   // The private key of the agent
);
```

Ensure that you have access to the agent's private key in a secure manner.

## Example

```javascript
import Web3 from 'web3';
import { MuonSafeClient } from 'muon-ai-safe';

const web3 = new Web3('<WEB3_PROVIDER_URL>');

const muonClient = new MuonSafeClient(
  process.env.AGENT_ADDRESS!,
  process.env.MUON_APP_NAME!
);

const action = "someAction";
const params = {
  param1: "value1",
  param2: "value2",
  // other params
};

const { signature: agentSign } = web3.eth.accounts.sign(
  web3.utils.soliditySha3(action, params.param1, ...),
  process.env.AGENT_PRIVATE_KEY // Agent's private key
);

await muonClient.performAction(action, params, agentSign);
```

## API Reference

### `MuonSafeClient`

#### `new MuonSafeClient(agentAddress, muonAppName)`

Creates an instance of the MuonSafeClient. 

- **`agentAddress`** (string): The address of the agent.
- **`muonAppName`** (string): The name of the MUON app.

#### `muonClient.performAction(action, params, agentSign)`

Executes a specified action on the wallet.

- **`action`** (string): The name of the action to be performed.
- **`params`** (object): The parameters to pass with the action.
- **`agentSign`** (string): The agent's signature for validating the action and params.

## Security Considerations

- Ensure the agent's private key is stored securely and never exposed in the client-side code.
- Always verify the signature and address of the agent before performing any actions.

## License

This project is licensed under the MIT License.
