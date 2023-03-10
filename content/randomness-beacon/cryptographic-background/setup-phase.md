---
pcx_content_type: concept
title: Setup Phase
weight: 1
---

# Setup Phase

In the drand setup phase, you create a collective private and public key pair shared among _๐_ participants. This is done through a `๐ก-of-๐` Distributed Key Generation (DKG) process and results in each participant receiving a copy of the collective public key plus a private key share of the collective private key โ no individual node knows the collective **private** key. Each private key share can then be used to perform cryptographic threshold computations, such as generating threshold signatures, where at least `๐ก` contributions produced using the individual private key shares are required to successfully finish the collective operation.

A DKG is performed in a fully distributed manner, avoiding any single points of failure. This is an overview of the different sub-components of the drand DKG implementation.

## Secret Sharing

Secret sharing is an important technique many advanced threshold cryptography mechanisms rely on.

Secret sharing allows you to split a secret value `๐ ` into `๐` shares `๐ 1,โฆ,๐ ๐` so that `๐ ` can only be reconstructed if a threshold of `๐ก` shares is available.

## Shamirโs Secret Sharing (SSS)

The SSS scheme is one of the most well-known and widely used secret sharing approaches, and a core component of drand. SSS works over an arbitrary finite field, but a simplistic approach uses the integers modulo `๐`, denoted by `โค๐`. Let `๐ โโค๐` denote the secret to share.

### Share Distribution

To share `๐ `, a dealer first creates a polynomial, `๐(๐ฅ)=๐0+๐1๐ฅ+โฏ+๐๐กโ1๐ฅ๐กโ1` with `๐0=๐ ` and (random) `๐๐โโค๐` for `๐=1,โฆ,๐กโ1` and then creates one share ๐ ๐ for each participant ๐ by evaluating ๐(๐ฅ) at the integer ๐ and setting ๐ ๐=(๐,๐(๐)).

### Secret Reconstruction

To recover the secret `๐ `, collect at least `๐ก` shares, then uniquely reconstruct `๐(๐ฅ)` using Lagrange interpolation and obtain `๐ ` as `๐ =๐0=๐(0)`.

Note that you can use any subset of `๐ก-of-๐` shares to perform Lagrange interpolation and uniquely determine `๐ `; however, having a subset of less than `๐ก` shares does not allow to learn anything about `๐ `.

## Verifiable Secret Sharing

SSS scheme assumes that the dealer is honest, but this may not always hold in practice. A Verifiable Secret Sharing (VSS) scheme protects against malicious dealers by enabling participants to verify that their shares are consistent with those dealt to other nodes, ensuring that the shared secret can be correctly reconstructed later.

Drand uses Feldmanโs VSS scheme, an extension of SSS. Let `๐พ` denote a cyclic group of prime order `๐` in which computing discrete logarithms is intractable. A _cyclic group_ means there exists a generator, `๐`, so that any element `๐ฅโ๐พ` can be written as `๐ฅ=๐๐` for some `๐โ{0,โฆ,๐โ1}`.

### Share Distribution

In addition to distributing shares of the secret to participants, the dealer also broadcasts commitments to the coefficients of the polynomial `๐(๐ฅ)` of the form `(๐ด0,๐ด1,โฆ,๐ด๐กโ1)=(๐๐ ,๐๐1,โฆ,๐๐๐กโ1)`. These commitments enable individual participants, `๐`, to verify that their share `๐ ๐=(๐,๐(๐))` is consistent with respect to the polynomial `๐(๐ฅ)` by checking that `๐๐(๐)=โ๐กโ1๐=0(๐ด๐)๐๐` holds.

### Secret Reconstruction

The recovery of secret `๐ ` works the same as regular SSS, except that verified to be valid shares are used.

## Distributed Key Generation (DKG)

Although VSS schemes protect against a malicious dealer, the dealer still knows the secret. To create a collectively shared secret `๐ ` so no individual node gets any information about it, participants can use a DKG protocol. Drand uses Pedersenโs DKG scheme, which runs `๐` instances of Feldmanโs VSS in parallel and on top of additional verification steps.

### Share Distribution

Individual participants, `๐`, create a (random) secret, `๐ ๐โโค๐`, and share it all participants using VSS, sending a share, `๐ ๐,๐` to each `๐` and broadcasts the list of commitments `(๐ด๐,0,๐ด๐,1,โฆ,๐ด๐,๐กโ1)` to everyone.

### Share Verification

`๐` verifies the shares received as prescribed by Feldmanโs VSS scheme. If `๐` receives an invalid share, `๐ ๐,๐`, from `๐`, then `๐` broadcasts a complaint. `๐` must reveal the correct share `๐ ๐,๐` or they are considered an invalid dealer.

### Share Finalization

At the end of the protocol, the final share of `๐` is `๐ ๐=โ๐๐ ๐,๐` for all valid participants `๐` , that is, for all `๐`s not excluded during the verification phase.

The collective public key associated with the valid shares can be computed as `๐=โ๐๐ด๐,0` for all valid `๐`s.

**Note:** Even though the secret created using Pedersenโs DKG can be biased, it is safe to use for threshold signing as shown by Rabin et al.
