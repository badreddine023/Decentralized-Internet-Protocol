# Decentralized Internet Protocol

> A React-based technical framework for building a free, user-operated internet on top of peer-to-peer storage, open protocols, and transparent coordination.

**Status:** early architecture + frontend prototype  
**Language:** English  
**License:** MIT (planned)

## The thesis

The current web is usually assembled around a private origin: a company owns the server, the database, the identity layer, and the rules for access. This project explores the inverse model:

- users contribute resources instead of only renting them;
- data is identified by what it is, not where a company stores it;
- protocols provide interoperable behavior across implementations;
- smart contracts coordinate incentives and policy without becoming a new central operator;
- applications remain usable even when one provider disappears.

This repository is not claiming that decentralization makes infrastructure free by magic. Storage, bandwidth, computation, and moderation still have real costs. The goal is to make those costs visible, shareable, and governed by open rules rather than hidden behind a single vendor account.

## What exists in this first slice

The current release is intentionally browser-only and static. It contains:

1. A technical landing page that explains the architecture as a four-layer stack.
2. A local node console that models peer states, identity, and verification without pretending to connect to real peers.
3. Documentation for the first practical build path: content-addressed storage through IPFS and a pinning/Filecoin-backed provider.
4. A roadmap that moves from a static explanation to a real storage adapter and then to live peer discovery.

The frontend is built with React 19, TypeScript, Vite, Tailwind CSS, Wouter, Lucide icons, and the supplied shadcn/ui primitives.

## Architecture

```text
┌────────────────────────────────────────────────────────────┐
│  Layer 03 · Coordination                                   │
│  Smart contracts · DAOs · policy · incentives              │
├────────────────────────────────────────────────────────────┤
│  Layer 02 · Applications                                   │
│  Social · publishing · search · AI · user-owned identity  │
├────────────────────────────────────────────────────────────┤
│  Layer 01 · Protocols                                      │
│  IPFS/libp2p · WTTP-inspired semantics · peer discovery   │
├────────────────────────────────────────────────────────────┤
│  Layer 00 · Resources                                      │
│  User-contributed storage · compute · bandwidth           │
└────────────────────────────────────────────────────────────┘
```

### Layer 00 — resources

The network needs physical and virtual resources before it needs a token. The initial node should be able to contribute a small, measurable amount of disk space and bandwidth from a laptop, home server, or inexpensive community machine.

### Layer 01 — protocols

IPFS provides the key primitive for the first prototype: a content identifier (CID) derived from the content itself. libp2p provides the family of building blocks for peer identity, transports, discovery, and streams. WTTP is treated here as a protocol direction for web-like reads and writes over decentralized resources; the project should integrate a real implementation only after its wire format and security model are pinned down.

### Layer 02 — applications

Applications should be able to request a CID, resolve it through any compatible gateway or peer, and verify the resulting content locally. A future reference app can use the same data from a browser, a local node, or a community gateway.

### Layer 03 — coordination

Smart contracts are a coordination tool, not a replacement for every database. They are appropriate for rules that benefit from public auditability: membership, collateral, grants, contributor rewards, dispute windows, and upgrade permissions. Large content should stay off-chain and be referenced by CIDs.

## The first practical node: free-start storage

### Why start with storage?

Storage creates a simple, testable contribution loop:

1. a user creates or receives a file;
2. the file is added to an IPFS node;
3. IPFS returns a CID;
4. the user or a provider pins the CID so it remains available;
5. any peer can retrieve and verify the content by CID.

This is more concrete than starting with a token. It gives the project a real object to replicate, a measurable service to expose, and a clear adapter boundary for providers such as Web3.Storage, Filecoin-backed pinning services, or a self-hosted node.

### Important provider caveat

A hosted pinning provider is useful for the first experiment, but it is not the decentralized network itself. The architecture must keep the provider behind an adapter so that the same CID can later be pinned by a local node, a community-run cluster, or a Filecoin-backed service. The browser prototype therefore uses provider-neutral language and does not embed credentials.

A future storage adapter should expose a small interface like:

```ts
export interface ContentStore {
  put(input: Blob | Uint8Array, options?: { name?: string }): Promise<{
    cid: string;
    size: number;
    provider: string;
  }>;

  get(cid: string): Promise<Uint8Array>;
  pin(cid: string): Promise<void>;
  unpin(cid: string): Promise<void>;
}
```

The static frontend intentionally does **not** call a provider API directly. API keys and write operations belong in a server-side or local-node process, not in a public browser bundle.

## Repository structure

```text
client/
  src/
    pages/Home.tsx       # protocol console landing page
    App.tsx              # app shell and route
    index.css            # visual system and responsive layout
docs/
  architecture.md       # detailed technical design and milestones
server/                  # template compatibility placeholder only
shared/                  # shared constants placeholder
```

## Local development

```bash
pnpm install
pnpm dev
```

The project also supports the template checks:

```bash
pnpm check
pnpm build
pnpm format
```

## Near-term milestones

- [x] Document a layered architecture and the first storage primitive.
- [x] Ship a browser-only node console with explicit demo state.
- [ ] Add a local node package that can add, pin, and retrieve CIDs.
- [ ] Add an adapter for a pinning/Filecoin-backed provider without exposing credentials.
- [ ] Add libp2p peer identity and discovery for local development.
- [ ] Define a WTTP-compatible request/response boundary and test vectors.
- [ ] Add offline-first application behavior and local verification.
- [ ] Prototype a governance contract with a narrow, auditable scope.

## Principles for contributors

1. **Do not hide centralization.** If a hosted service is used, name it and isolate it behind an adapter.
2. **Verify locally where possible.** A user should be able to inspect a CID, signature, or policy without asking a company for permission.
3. **Keep the protocol smaller than the application.** A reliable primitive beats a large collection of speculative features.
4. **Prefer reversible decisions.** Early interfaces should be replaceable while keeping CIDs and user-owned keys portable.
5. **Measure the free path.** Track disk, bandwidth, latency, availability, and provider dependency rather than promising zero cost.

## Contribution

The best first contribution is a reproducible storage experiment: document the environment, add a small public file, record its CID, retrieve it from a second peer or gateway, and explain what remains centralized. Open an issue or pull request with the experiment before proposing a token or a new chain.
