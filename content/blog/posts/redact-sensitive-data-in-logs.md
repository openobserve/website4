---
title: How to redact sensitive / PII data in your logs
seoTitle: How to redact sensitive / PII data in your logs
description: There are times when you would like to filter logs at source. This blog post shows how to do that when capturing logs using otel-collector.
img: /img/blog/redact/redact.webp
alt: OpenObserve
slug: redact-sensitive-data-in-logs
authors: 
  - prabhat
publishDate: 2024-12-17
tags:
  - logs
  - observability
  - opentelemetry
  - redaction
  - security
  - PII
---

### How to Redact Sensitive Data in Your Logs

As you collect and store increasingly large amounts of log data, the risk of sensitive information being exposed grows. Sensitive data, such as email addresses, credit card numbers, and API keys, can be inadvertently logged, posing a significant security risk. Redacting sensitive data from logs is crucial to protect user privacy and prevent data breaches.

In this blog, we'll explore the importance of redacting sensitive data from logs and provide examples of how to do so using Vector Remap Language (VRL). We'll cover redacting email addresses, credit card numbers, and AWS keys. You will be able to do it for other scenarios as well from what you learn here.

### Why Redact Sensitive Data?

Logging sensitive data can have severe consequences, including:

1. Data breaches: Exposed sensitive data can lead to identity theft, financial loss, and reputational damage.
2. Compliance issues: Failing to protect sensitive data can result in non-compliance with regulations, such as GDPR, HIPAA, and PCI-DSS.
3. Security risks: Logged sensitive data can be used by attackers to gain unauthorized access to systems and data.

### Redacting Sensitive Data with Vector VRL
Vector VRL is a powerful language for processing and transforming log data. Its redact function allows you to remove sensitive data from logs. 

### Ingest sample data

Let's take an example log record:

```json
{
    "message": "Log line for hello@example.com paid using card 2222405343248877 for aws key using aws access key ASIAY34FZKBOKMUTVV7A and secret accesss key Nw0XP0t2OdyUkaIk3B8TaAa2gEXAMPLEMvD2tW+g",
    "http_status": "200"
}
```

You can ingest this data in your environment using:

```shell
curl --request POST -u "root@example.com:Complexpass#123" \
  --url http://localhost:5080/api/default/default/_json \
  --header 'content-type: application/json' \
  --data '[
  {
    "message": "Log line for hello@example.com paid using card 2222405343248877 for aws key using aws access key ASIAY34FZKBOKMUTVV7A and secret accesss key Nw0XP0t2OdyUkaIk3B8TaAa2gEXAMPLEMvD2tW+g",
    "http_status": "200"
  }
]'
```

Make sure to replace the credentials

![base_data](/img/blog/redact/base_data.webp)

### Redacting Email Addresses

To redact email addresse, you can use the following VRL script:

```javascript
email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

.message = redact!(.message, filters: [
    email_pattern
], redactor: "full")

```

This script uses a regular expression to match email addresses in the message field and replaces them with [REDACTED].

You should see below.

![redacted_email](/img/blog/redact/redacted_email.webp)

### Redacting Credit Card Numbers

To redact credit card numbers,you must understand that there are various credit card number formats. We have collected various credit card number formats that you can use:

```javascript
email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

american_express_pattern = r'(3[47][0-9]{2}\s?(?:[0-9]{4}\s?){2}[0-9]{3})'
bc_global_pattern = r'((?:6541|6556)[0-9]{12})'
carte_blanche_pattern = r'(30[0-5][0-9]{11})'
diners_club_pattern = r'(3(?:0[0-5]|[68][0-9])[0-9]\s?(?:[0-9]{4}\s?){2}[0-9]{2})'
discover_pattern = r'((?:64[4-9][0-9]|65[0-9]{2}|6011)\s?(?:[0-9]{4}\s?){3}|622(?:1\s?2[6-9][0-9]{2}|1\s?[3-9][0-9]{3}|[2-8]\s?[0-9]{4}|9\s?[01][0-9]{3}|9\s?2[0-5][0-9]{2})\s?(?:[0-9]{4}\s?){2})'
mastercard_pattern = r'(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\s?(?:[0-9]{4}\s?){3}'
maestro_pattern = r'((?:5018|5020|5038|5612|5893|6304|6759|676[1-3]|0604|6390)\s?(?:[0-9]{4}\s?){3}\s?(?:[0-9]{3,7})?)'
visa_pattern = r'(4[0-9]{12}(?:[0-9]{3})?|4[0-9]{3}\s(?:[0-9]{2,4}\s?){3}(?:[0-9])?)'
insta_payment_pattern = r'(63[7-9][0-9]{13})'

.message = redact!(.message, filters: [
    email_pattern,
    american_express_pattern,
    bc_global_pattern,
    carte_blanche_pattern,
    diners_club_pattern,
    discover_pattern,
    mastercard_pattern,
    maestro_pattern,
    visa_pattern,
    insta_payment_pattern
], redactor: "full")

```

This script uses regular expressions to match credit card numbers in the message field and replaces them with [REDACTED].

Now you have both email and credit card redacted.

![creditcard_redacted](/img/blog/redact/creditcard_redacted.webp)

### Redacting AWS Keys

To redact AWS keys, you can use the following VRL script:

```javascript
aws_access_key_pattern = r'(?:^|[^A-Z0-9])[A-Z0-9]{20}(?:[^A-Z0-9]|$)'
aws_secret_key_pattern = r'(?:^|[^A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?:[^A-Za-z0-9/+=]|$)'

email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

american_express_pattern = r'(3[47][0-9]{2}\s?(?:[0-9]{4}\s?){2}[0-9]{3})'
bc_global_pattern = r'((?:6541|6556)[0-9]{12})'
carte_blanche_pattern = r'(30[0-5][0-9]{11})'
diners_club_pattern = r'(3(?:0[0-5]|[68][0-9])[0-9]\s?(?:[0-9]{4}\s?){2}[0-9]{2})'
discover_pattern = r'((?:64[4-9][0-9]|65[0-9]{2}|6011)\s?(?:[0-9]{4}\s?){3}|622(?:1\s?2[6-9][0-9]{2}|1\s?[3-9][0-9]{3}|[2-8]\s?[0-9]{4}|9\s?[01][0-9]{3}|9\s?2[0-5][0-9]{2})\s?(?:[0-9]{4}\s?){2})'
mastercard_pattern = r'(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\s?(?:[0-9]{4}\s?){3}'
maestro_pattern = r'((?:5018|5020|5038|5612|5893|6304|6759|676[1-3]|0604|6390)\s?(?:[0-9]{4}\s?){3}\s?(?:[0-9]{3,7})?)'
visa_pattern = r'(4[0-9]{12}(?:[0-9]{3})?|4[0-9]{3}\s(?:[0-9]{2,4}\s?){3}(?:[0-9])?)'
insta_payment_pattern = r'(63[7-9][0-9]{13})'

.message = redact!(.message, filters: [
    aws_access_key_pattern,
    aws_secret_key_pattern,
    email_pattern,
    american_express_pattern,
    bc_global_pattern,
    carte_blanche_pattern,
    diners_club_pattern,
    discover_pattern,
    mastercard_pattern,
    maestro_pattern,
    visa_pattern,
    insta_payment_pattern
], redactor: "full")

```

This script uses a regular expression to match AWS keys in the message field and replaces them with [REDACTED].

![aws_keys_redacted](/img/blog/redact/aws_keys_redacted.webp)

### Save function and create the pipeline

Now that you have been able to test the function that works well, let's build a pipeline.

![redact_pii_pipeline](/img/blog/redact/redact_pii_pipeline.webp)

This will now redact any sensitive or PII data before your log data is ingested and stored.


### Best Practices for Redacting Sensitive Data

When redacting sensitive data, keep the following best practices in mind:

1. Use specific regular expressions: Avoid using broad regular expressions that may match non-sensitive data.
1. Test your scripts: Verify that your redaction scripts are working correctly to avoid false positives or negatives.
1. Monitor and update: Continuously monitor your logs and update your redaction scripts as needed to ensure sensitive data is protected.

### How do I build or find regular expressions for other sensitive data

Check the open source pyWhat project at https://github.com/bee-san/pyWhat/tree/main/pywhat/Data

### Conclusion

Redacting sensitive data from logs is essential to protect user privacy and prevent data breaches. By using Vector VRL and following best practices, you can effectively remove sensitive data from your logs and ensure compliance with regulations. Remember to regularly review and update your redaction scripts to stay ahead of evolving security threats.

