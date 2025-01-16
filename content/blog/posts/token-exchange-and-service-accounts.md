---
title: "Token Exchange & OpenObserve Service accounts"
seoTitle: "Token Exchange & OpenObserve Service accounts"
description: Enhance your observability by using OpenObserve Service accounts.
img: /img/blog/token-exchange/o2_api.png
alt: openobserve-service-accounts
slug:  token-exchange-and-service-accounts
authors: 
  - ashish
publishDate: 2025-01-06
tags:
  - service-accounts
  - token-exchange 
  - openobserve
  - rfc8693
  - security
  - observability
  - enterprise
---

## Introduction

Note: Applicable to enterprise version (Free to download and use if daily ingestion volume is under 200 GB)

When using **OpenObserve** to monitor your infrastructure, you may encounter scenarios where applications need to consume data from OpenObserve by calling its APIs.

Currently, data ingestion in OpenObserve is secured through ingestion tokens. However, for non-ingestion APIs, users must rely on native user credentials, which poses a risk of exposing sensitive login information. To address this challenge, OpenObserve is introducing service accounts to ensure secure API access.


### Making APIs accessible 
With the upcoming release, OpenObserve introduces **service accounts** as a secure way to invoke APIs. OpenObserve supports two types of service accounts:
- **Native Service accounts**
- **SSO service accounts**
  
Service accounts are designed exclusively for p**rogrammatic access to OpenObserve APIs** and come with the following features:
  - Use tokens for secure programmatic access.
  -	Are governed by ReBAC (Relationship-Based Access Control) for fine-grained permissions.
  - Allow tokens to be rotated easily.
  - Cannot log in to the UI.

#### Role of ReBAC

ReBAC, powered by [OpenFGA](https://openfga.dev/), plays a key role in managing fine-grained access control for service accounts. This enables precise control over what resources and APIs a service account can access.


### Local Authentication Mode
In Local Auth Mode, you can create **Native Service Accounts** by navigating to **IAM → Service Accounts → Add Service Account** in OpenObserve. After creating a service account, assign appropriate permissions via **IAM Roles or User Groups**. You can then use the generated service account token to securely invoke OpenObserve APIs.

### SSO Mode with Token Exchange
If you want to use identities from your **organization’s IdP (Identity Provider)** as service accounts, OpenObserve supports **token exchange**, enabling seamless integration. Let’s dive deeper into how token exchange works.

## What is token exchange?

[OAuth 2.0 Token Exchange (RFC8693)](https://datatracker.ietf.org/doc/html/rfc8693) allows client obtaining a token in exchange of token acquired from same IdP or different IdP to access resources with newly acquired token.

Token exchange is particularly useful in scenarios where token adaptation is required to meet specific access needs, such as:
-	Delegation & Impersonation: Allowing a client or service to act on behalf of a user or another service.
-	Scope Adjustment:
    - Downgrade scopes when a token is too powerful and poses security risks.
    - Upgrade scopes when the existing token lacks sufficient permissions for a specific operation.
- Cross-Domain Access: Accessing resources in a different trust domain or security environment.

## How Token Exchange Works

A client initiates a token exchange by sending a request to the authorization server’s token endpoint using the grant type `urn:ietf:params:oauth:grant-type:token-exchange`. In response, the server issues a newly generated token along with its type. The token being exchanged in this process is referred to as the `subject token`, which can be an access token, refresh token, or ID token.

Here’s a step-by-step breakdown of the token exchange flow:
1.	Client initiates token exchange:
The client sends a request to the token endpoint, providing the token to be exchanged, the desired token type, and its credentials.
2.	Token endpoint validates the request:
The token endpoint verifies the client’s credentials and checks the validity of the token being exchanged.
3.	Token endpoint generates & returns new token:
If the request passes validation, the token endpoint generates & returns a new token of the requested type.


The token exchange protocol categorizes security tokens into three types:

- Subject Token:
	-	Represents the identity of the party on whose behalf the request is being made.
	-	The subject of this token will typically match the subject of the newly issued token.
-	Actor Token:
	-	Represents the identity of the acting party (e.g., a service or client).
	-	This is the party authorized to use the new token and act on behalf of the subject.
-	Requested Token:
	-	The new security token issued by the authorization server as a result of the token exchange request.
	-	This token can be of any type, such as an access token or JWT assertion grant, tailored to the requested scopes, resources, and audience.


## How to use token exchange with OpenObserve

One of the most common questions we receive is how to securely use the **OpenObserve APIs**. The **OpenObserve token exchange flow** is designed to address this exact need by enabling seamless integration with external IdPs.

Consider a scenario where your application holds an access token issued by your organization’s IdP. This token is valid within your organization’s trust domain. However, your application needs to access OpenObserve APIs, which are secured by **dexIdP—a federated OpenID Connect provider used by OpenObserve**.

To bridge this trust gap, the application must exchange its current access token for a new security token issued by **dexIdP**, enabling it to access the OpenObserve APIs securely. This new token allows the application to securely access OpenObserve APIs while maintaining proper scoping and trust alignment across domains.

![Please refer flow below :](/img/blog/token-exchange/token-exchange-flow.png)


The flow ensures:
- A seamless trust relationship between your organization’s IdP and OpenObserve’s dexIdP.
- Tokens scoped specifically for OpenObserve, ensuring security and isolation.


## Establishing Trust Between Your IdP and OpenObserve

To configure trust between your IdP and OpenObserve, you’ll need to set up dexIdP as a federated OpenID Connect provider. Below is an example configuration for dex::

```yaml

- type: oidc
  id: api-google
  name: APIGoogle
  config:
    issuer: https://accounts.google.com
    scopes:
        - groups
        - federated:id
        - email
      # mapping of fields from the submitted token
    userIDKey: email
    groupsKey: groups
    getUserInfo: true   

```

Additionally, set the environment variable `O2_DEX_TOKEN_EXCHANGE_CONNECTOR_ID` to match the id of the connector in the OpenObserve configuration:
```
O2_DEX_TOKEN_EXCHANGE_CONNECTOR_ID = "api-google"
```

This configuration establishes the trust relationship between your IdP and dexIdP, enabling token exchange.

## Token Exchange & Service accounts

You can now use OpenObserve’s /config/token API to exchange an existing token for a new one. The request to this API should be follows:

```json
{
	"token": "ya29.a0ARW5m75VtoH4fF4cAYmjkac3SAMZ8MVoEUDFcuQwohObvHcb9g8D7BvdGVZeoCVK8LjamX9XckcoNli8g7iO6_8QbyFShHB_OCk7L42ucPIMbvgF-rfCJficqDd1xc9DfmEoYaCgYKAeQSARISFQHGX2MiTjup_6LuKHyX9qIfEWWaUw0170",
	"token_type": "AccessToken"
}
```

`token_type` parameter can either be **AccessToken** or **IdToken**, depending on the type of token being exchanged.

The API response will look like this:
```json
{
	"access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwZWI3Njc5NGViOTFjMjAxZmZiZWMwZWE1ZTBiNzcwMjk2NzdiNGUifQ.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU1NTYvZGV4Iiwic3ViIjoiQ2hWaGMyaHBjMmhBYjNCbGJtOWljMlZ5ZG1VdVlXa1NDbUZ3YVMxbmIyOW5iR1UiLCJhdWQiOiJleGFtcGxlLWFwcCIsImV4cCI6MTczNTU0OTEyNywiaWF0IjoxNzM1NTQ3MzI3LCJhdF9oYXNoIjoicEc4WGZyR1pURWVkUk1hcE5hWnFnZyIsImZlZGVyYXRlZF9jbGFpbXMiOnsiY29ubmVjdG9yX2lkIjoiYXBpLWdvb2dsZSIsInVzZXJfaWQiOiJhc2hpc2hAb3Blbm9ic2VydmUuYWkifX0.J2wzp0YeXySIdjHX1z6qik_g4G4hY_pWsigyjdKOKKiSKbBixfc-i295y4Ci37QYoFgRZcM-OACas0F-24DPVuYnZoAWcgjVRLhv-_-KxD1kyDfvP_8zypHqQm5e9fTd5Bi55WXMH-GNQLm3zNbbMbK9s-VIcX4xaWGSdUkXtsuL368JDOL4E0vQ6Q3SiOo_SK9neKtsSkKZSf9al6BNDH1Bo71xOMHOxs6Rh_XXDIv8znuNz0csemvGVkVbGU-lO0Dt9_EsQJRmZUfWVq2OcKEy3z95ROBQtRhreSl-IB41tpW2NkO8BlJ3sPPNAKVk6Ypc_knppNLQ",
	"token_type": "bearer",
	"expires_in": 1799,
	"issued_token_type": "urn:ietf:params:oauth:token-type:access_token"

}
```
The **subject** of the exchanged token is stored as a **service account** in OpenObserve. To manage and control the APIs this service account can access, navigate to the **IAM menu** in OpenObserve and assign the appropriate permissions. This ensures precise control over resource access and enhances security.  


## Conclusion

Service accounts offer a robust solution for securely integrating diverse identity systems and resource domains. Within OpenObserve, they allow applications from different trust domains to access OpenObserve APIs seamlessly and securely. By utilizing dexIdP, token exchange, and comprehensive permission management, you can enforce strict security and access control for API interactions.

The token exchange flow in OpenObserve not only connects identity systems but also provides organizations with dynamic access control, ensuring effective observability in complex environments.Take advantage of this feature to enhance your observability efforts while maintaining complete control and security over your data.
