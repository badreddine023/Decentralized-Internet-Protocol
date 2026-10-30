# Architecture Notes

## 1. Design goal

Build a network where a person can publish, retrieve, and verify content without depending on one permanent origin server. The system should degrade gracefully: if a provider disappears, a CID remains a portable reference and another peer can serve the same bytes.

The first implementation target is intentionally modest: a node that can store content, return a CID, expose health information, and participate in peer discovery. The smart-contract layer comes later, after the resource loop is observable.

## 2. Trust boundaries

| Boundary | What is trusted | What is verified |
| --- | --- | --- |
| Content | User input and declared metadata | Content hash / CID |
| Transport | A peer can send bytes | Stream integrity, timeout, peer identity |
| Storage provider | A provider can pin content | Retrieval test, CID match, provider health |
| Identity | A public key identifies a peer | Signature over a message or capability |
| Governance | A contract executes published rules | Contract bytecode, event log, quorum / timelock |

The primary security assumption is not that every peer is honest. It is that peers can be untrusted while the client still verifies the content it receives.

## 3. Node responsibilities

A minimal node should have five modules:

```text
node/
  identity        key pair, peer ID, signatures
  content         add, hash, read, pin, garbage-collect
  transport       libp2p streams and request framing
  discovery       bootstrap, DHT, rendezvous, or delegated discovery
  policy          quotas, allowlists, rate limits, and future contracts
```

The node should expose a local administrative API, but that API is not the network protocol. A local API is for the operator; a peer protocol is for other nodes.

## 4. Storage path

### 4.1 Local-first flow

```text
file → chunking / hashing → CID → local blockstore → pinset → peer exchange
```

The blockstore should be the source of truth for the local node. A remote pinning provider is an optional durability adapter, not the canonical database.

### 4.2 Provider adapter

The provider interface should be deliberately small:

```ts
interface PinningAdapter {
  name: string;
  pin(cid: string, metadata?: Record<string, string>): Promise<void>;
  unpin(cid: string): Promise<void>;
  status(cid: string): Promise<"queued" | "pinned" | "failed" | "unknown">>;
}
```

The first adapter can target a Web3.Storage-style service or another IPFS/Filecoin-backed pinning API. Credentials must remain in a local node or a server-side process. They must never be compiled into `client/`.

### 4.3 What “free” means

The project should use “free access” carefully. A user can access the first layer without paying when other participants donate capacity, but someone still pays for electricity, storage hardware, transit, maintenance, or provider fees. The protocol should make contribution measurable and incentives optional until the usage model is understood.

Useful metrics:

- bytes stored and retained;
- bytes served to other peers;
- availability over a time window;
- egress and ingress bandwidth;
- retrieval success rate;
- provider concentration;
- cost per retained GB-month.

## 5. WTTP direction

WTTP is treated as a design direction for web-like semantics over decentralized resources. Before implementing it, the project needs a written compatibility target:

- request method and resource naming;
- CID and version negotiation;
- headers or metadata for content type, cache hints, and signatures;
- authorization capabilities;
- mutable naming layer, if any;
- error semantics and retry behavior;
- replay, downgrade, and denial-of-service protections.

A useful first experiment is a read-only request path: resolve a human-readable name to a CID, fetch the block from any available peer, verify the CID, and render the result. Writes and mutable names should be separate milestones.

## 6. Governance boundary

Governance should not be allowed to mutate arbitrary content. A narrow first contract might only handle:

- registry of approved protocol versions;
- public grant proposals for community nodes;
- time-delayed upgrades to an adapter registry;
- transparent contributor accounting.

Keep content, peer traffic, and high-frequency operational events off-chain. Emit hashes, commitments, and compact decisions on-chain only where public ordering is valuable.

## 7. Development sequence

### Phase A — reproducible storage

- create a local node with a blockstore;
- add a file and print its CID;
- retrieve it locally and from a second node;
- add an optional remote pinning adapter;
- publish the exact commands and failure cases.

### Phase B — peer transport

- create peer identities;
- connect two nodes over libp2p;
- implement a framed `GET /cid` request;
- verify returned bytes locally;
- add timeouts, quotas, and backpressure.

### Phase C — browser and gateway

- define a browser-safe read API;
- use a gateway only as an access path, not as the source of identity;
- add local verification in the client;
- support cached and offline reads.

### Phase D — governance experiments

- write a minimal contract and threat model;
- add events and an off-chain indexer;
- introduce a timelock and emergency pause only if justified;
- test how the system behaves when the contract, provider, or indexer is unavailable.

## 8. Non-goals for the first release

- launching a token before the resource loop works;
- claiming that one hosted provider is decentralized;
- replacing every web standard at once;
- putting large files or social activity directly on a blockchain;
- promising censorship resistance without addressing gateways, metadata, abuse, and legal risk;
- embedding secret API keys in the React application.
