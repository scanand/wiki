---
sidebar_label: 'Glossary'
sidebar_position: 99
---


# AWS Terminology


## Template
### Tech Name
What:
>| Related To | Technology | Works with only |
>| --- | ----------- | ---|
>| Paragraph1 | Text |
>| Paragraph 2| Text |
---

## AWS Global Infrastructure

AWS infrastructure is built around Regions and availability zones AZs

### Regions
What: Regions are physical locations around the world (logical)

Regions have multiple AZs, upto 3

### Availability Zone
What: Each AZ consists of one or more data centres, each with redundant power, networking and connectivity and housed in separate facilities. (Physical)

### Edge Locations
What: Edge Locations are CDN Endpoints for Cloud Front

They are more than AWS regions, total 200.  CDN end consumers are directed to nearest Edge Location

>| Related To | Technology | Works with only |
>| --- | ----------- | ---|
>| CloudFront, AWS Regions | CDN |


#### Regional Edge Cache Locations

What: Regional Edge Cache Locations sit between Cloud Front Origin servers and Edge Locations

Has lasrger cache-width than edge locations.
>| Related To | Technology | Works with only |
>| --- | ----------- | ---|
>| CloudFront, AWS Regions | CDN | Edge Location



## Compute

## Storage

## Networking
