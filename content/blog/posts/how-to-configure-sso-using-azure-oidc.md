---
title: "Configuring Azure SSO with OpenObserve and Dex"
seoTitle: "How to configure azure app for OIDC"
description: Learn how to configure Azure SSO with OpenObserve Dex using OpenID Connect (OIDC) for seamless authentication. Discover why Dex simplifies identity management, why OIDC is recommended over SAML, and follow a step-by-step guide to set up Azure AD authentication with Dex. Enhance security, streamline user access, and optimize performance with this modern authentication approach.
img: /img/blog/azure-sso-dex/azure_dex_sso.gif
alt: how-to-configure-sso-using-azure-oidc
slug: how-to-configure-sso-using-azure-oidc
authors: 
  - chaitanya
publishDate: 2025-01-16
tags:
  - azure
  - dex
  - aythentication
  - sso
  - oidc
  - saml
  - openobserve
---

## Why Use Dex for Authentication?
Dex is an identity service that provides authentication for applications via OpenID Connect (OIDC) and other identity protocols. It acts as a bridge between identity providers like Azure Active Directory (Azure AD) and applications like OpenObserve, enabling seamless Single Sign-On (SSO) integration. Dex simplifies user authentication, supports multiple identity providers, and allows organizations to enforce centralized authentication policies.

## Why Choose Azure OIDC Over SAML?
While both OpenID Connect (OIDC) and Security Assertion Markup Language (SAML) are used for authentication, OIDC is often preferred over SAML for modern applications due to the following reasons:

- **Simplified Implementation:** OIDC is a lightweight authentication layer built on top of OAuth 2.0, making it easier to configure and integrate with web applications.
- **Better Mobile and API Support:** Unlike SAML, which relies on XML-based assertions, OIDC uses JSON-based tokens (JWT), making it more suitable for mobile and API-based authentication.
- **Improved Security:** OIDC supports more advanced security features like Proof Key for Code Exchange (PKCE), reducing risks associated with token interception.
- **Enhanced Performance:** Since OIDC operates over RESTful APIs, it is more performant compared to the XML-based structure of SAML, which can introduce additional overhead.

## Step-by-Step Guide to Configuring Azure SSO with OpenObserve Dex

Follow these steps to configure Azure AD as an identity provider for OpenObserve using Dex:

1. **Create an Azure AD Application**
Go to Azure portal and create an app by providing a name. 
![azure app](/img/blog/azure-sso-dex/azure_oidc_1.png)

Leave the default parameters as is since we want to configure this for single tenant.
![azure app](/img/blog/azure-sso-dex/azure_oidc_2.png)

Once created, you will be able to see the below details which will be of later use.
![azure app](/img/blog/azure-sso-dex/azure_oidc_3.png)

2. **Configure API Permissions in Azure AD**
Go to API permissions and click on *Add a permission*
![azure app](/img/blog/azure-sso-dex/azure_oidc_api_1.png)

Click on *Microsoft Graph*
![azure app](/img/blog/azure-sso-dex/azure_oidc_api_2.png)

Click on *Delegated permissions* and select email, offline_access, openid and profile
![azure app](/img/blog/azure-sso-dex/azure_oidc_api_3.png)

Search and select Group.Read.All permissions.
![azure app](/img/blog/azure-sso-dex/azure_oidc_api_4.png)

Finally, save everything
![azure app](/img/blog/azure-sso-dex/azure_oidc_api_5.png)

3. **Generate Client ID and Client Secret**
![azure app](/img/blog/azure-sso-dex/azure_oidc_4.png)

The app has been removed so added the secret value here for more detailed explanation.
![azure app](/img/blog/azure-sso-dex/azure_oidc_5.png)

4. **Set Up Redirect URIs**  

Click on *Add a platform* and select *Web*
![azure app](/img/blog/azure-sso-dex/azure_oidc_6.png)

Enter the URI that will be configured in step-5 for **redirectURI** parameter.
![azure app](/img/blog/azure-sso-dex/azure_oidc_7.png)

Finally, save it.
![azure app](/img/blog/azure-sso-dex/azure_oidc_8.png)

5. **Configure Dex in O2 values.yaml**

Copy the below snippet and make needed changes that are mentioned in the comments to be able to integrate Azure App into the connector. 

```
  dex:
    enabled: true
    parameters:
      O2_CALLBACK_URL: https://domain.example.com/web/cb
      O2_DEX_SCOPES: openid profile email groups offline_access
      O2_DEX_GROUP_ATTRIBUTE: ou
      O2_DEX_DEFAULT_ORG: default
      O2_DEX_DEFAULT_ROLE: user
      O2_DEX_ROLE_ATTRIBUTE: role
      O2_DEX_NATIVE_LOGIN_ENABLED: "true"
      O2_DEX_GROUP_CLAIM: "groups"
      O2_DEX_LDAP_GROUP_ATTRIBUTE: "ou"
      O2_DEX_LDAP_ROLE_ATTRIBUTE: "cn"
    config:
      issuer: https://domain-auth.example.com/dex
      storage:
        type: kubernetes
        config:
          inCluster: true
      web:
        http: 0.0.0.0:5556
      expiry:
        idTokens: 10m
        refreshTokens:
          validIfNotUsedFor: 60m
      staticClients:
        - id: o2-client
          redirectURIs:
            - https://domain.example.com/config/redirect
          name: o2-client
          secret: <> # This should be base64 encoded value of client secret.Gets mapped to O2_DEX_CLIENT_SECRET
      oauth2:
        responseTypes:
          - code
        skipApprovalScreen: true
      connectors:
        - type: microsoft
          # Required field for connector id.
          id: microsoft # if you want to add multiple connectors of same tenant or multi-tenant then change the id by keeping the prefix as microsoft-
          # Required field for connector name.
          name: Microsoft
          config:
            # Credentials can be string literals or pulled from the environment.
            clientID: b9087229-dummy # add this from step3
            clientSecret: 4qH8Q-dummy # add this from step5
            redirectURI: https://domain-auth.example.com/dex/callback
            tenant: eehuh-dummy # add this from step3
```

6. **Verify SSO Login and Debug Any Issues**

Finally upgrade/ install o2 via helm and then you will see Login with SSO that will allow yours users to login who belongs to your tenant. 
![azure app](/img/blog/azure-sso-dex/sso.png)

## Conclusion
Integrating Azure AD with OpenObserve using Dex provides a secure, scalable, and modern authentication solution. By leveraging OpenID Connect, organizations can ensure seamless user authentication, improve security, and enhance performance compared to legacy authentication protocols like SAML. This setup not only simplifies user access management but also aligns with best practices for cloud-native applications. With Dex handling authentication, OpenObserve benefits from centralized identity management, reducing administrative overhead and ensuring a streamlined user experience.

> #### Get Started with OpenObserve Today!
> Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
>Check out our [GitHub repository](https://github.com/openobserve) for self-hosting and contribution opportunities.