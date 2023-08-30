# Federated GraphQL API Gateway Reference Implementation

A reference implementation of a federated GraphQL API and IAM delegation to individual data providers.

## Overview

**TLDR**:
- Data are resident on infrastructure maintained by data owners, and data owners have complete control over what data they expose and to whom they expose those data.
- This project shows one way to implement a **Federated Data Mesh**.
- Federated Data Mesh is not the same thing as **Federated Analytics**, specifically:
  - In **Federated Data Mesh**, individual data product owners maintain their own data and control access to those data. However, ultimately, data consumers make API calls against some kind of API Gateway, which composes results from individual providers and returns to the caller.
  - In **Federated Analytics**, some kind of executable code is literally sent to run on providers' infrastructure, and only the results of these computations are sent back to the caller.

![overview diagram](docs/architecture.svg)

In the example above, two health data products are shown: one produced by the Province of Quebec and one from the Province of Ontario.
Each of these entities entirely manages the infrastructure for their data products.
Importantly, data are resident on each entity's infrastructure, and identity and access management (IAM) is handled entirely by each entity.

Each entity registers their API with an API Gateway and identity provider (IDP) aggregator maintained by PHAC.
This registration process ensures that certain API compatibility requirements are met.

The envisioned flow of a request from a data consumer looks as followed (illustrated for Province of Quebec, but the same process is true for any delegated API).

1. Data consumer authenticates against an IDP aggregator, which delegates authentication (Authn) and authorization (Authz) to the necessary provider-specific IAM tenants.
2. Province of Quebec's IAM tenant authenticates the sign on request. Based on Province of Quebec's IAM policies, certain capabilities associated with that user are included in JWT claims returned with the token for the request. For example, the user may belong to a given Azure Active Directory (AAD) security group, which may be attached to a series of role assignments granting a certain level of access for the data product in question.
3. Data consumer makes a request to the GraphQL API gateway containing a GraphQL query requesting a subset of the global data model. The API gateway figures out which individual providers need to be queried for each field of the user's query. In this example, Province of Quebec is one of the data providers that is needed to satisfy the Data Consumer's query.
4. The API gateway forwards the appropriate request to the Province of Quebec's Data Product API server, containing the necessary GraphQL query and the Data Consumer's JWT.
5. The Data Product API internally calls its database(s) to retrieve the data required by the GraphQL query.
6. The data owner implements a differential privacy engine that uses the claims in the JWT attached to the request to determine which fields/instances the Data Consumer has access to. The details of this differential privacy engine are entirely managed by the Province of Quebec.
7. A data payload with the appropriate censoring applied is returned to the API gateway. The API gateway combines the data returned by Province of Quebec with data returned by any other federated data owners, and returns the result to the Data Consumer.



### Attribution
- GraphQL icon borrowed from [graphql.org](https://graphql.org/brand/).
- Ory icon borrowed from thier [github organization](https://github.com/ory).