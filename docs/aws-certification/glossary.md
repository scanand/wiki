---
sidebar_label: 'Glossary'
sidebar_position: 99
---


# AWS Terminology


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

Has larger cache-width than edge locations.
>| Related To | Technology | Works with only |
>| --- | ----------- | ---|
>| CloudFront, AWS Regions | CDN | Edge Location


### AWS Outposts
- Outpost Subnet
- Sits in corporate data centre to connect to AWS public cloud
- ITs a hardware which you can deploy in your infrastructure
- can deploy some aws services

### AWS Local Zone

### AWS Wavelength zone
- to utilise 5g communication
- connects back to region

---
## Compute
Amazon EC2 Auto Scaling
### Amazon Elastic Cloud Compute EC2
- provides resizable computing capacity on the server in Amazon's data centrpre1P



Amazon LightSail

### AWS Elastic Beanstalk
- Designed to get web applications up and running on AWS
- As a developer, you can upload your application code and Beanstalk uses services like EC2, ECS, for load balancing (ELB), auto-scaling (AWS Auto-scaling) and monitoring

### AWS Fargate
- it s launch type for ECS
- Serverless and PAYG compute engine 

### AWS Lambda
- Function - only code



AWS VPN

Elastic Load Balancing

Amazon EKS

### Amazon ECS
- Elastic container Sevice


### Amazon ECR
- Elastic container registry


---

# Storage

### Amazon S3
- stores objects in buckets
- objects are type of key-value pair
- __Object life cycle management__
- __Cross-region replication__
- __Transfer Acceleration__ uses the cloudfront to updload data faster

### AWS ElastiCache
- in memory database

### Storage Gateway

### 

### Dynamo DB
- Database in key-value pairs
---

# Networking & Content Delivery

### AWS Cloud front
- Regional Edge Cache (few)
    - These are closer to source location
- Edge Location ( lot of them)
    - caching content for CloudFront closer to the user
- Can be used as a public endpoint for API Gateway, to reduce the latency

### AWS API Gateway Endpoints
- Three types endpoints 
    - Edge-optimsed 
    - Regional Endpoint (to reduce latency within region)
    - Private Endpoint (to reduce latency within VPC, used for secured REST endpoints)

### VPC
- subnet
- Endpoints - way to connect public AWS services straight into your vpc 
- CIDR Block - Classless Inter Domain Routing
- Subnet
- spans mutiple availabilty zone in region
### Elastic Load Balancer

### Route 53
- Hosted Zone -highly available and scalable domain name service
- domain registration


### Shield
- Firewall

### AWS Direct Connect Gateway
- Creates direct private network connection between your private cloud and AWS - to avoid public internet
- gives more reliability - predicable performance
- increased predictable bandwidth

### API Gateway
- service to publish API for the users
- __Edge Optimised endpoint__
---

## Nuggets
1. In a nutshell, if the service is meant to be used (consumed) through an API it will be an Amazon Web Service (short: AWS), otherwise it will be an Amazon product. (1)



----

## Template
### Tech Name
What:
>| Related To | Technology | Works with only |
>| --- | ----------- | ---|
>| Paragraph1 | Text |
>| Paragraph 2| Text |
---

References:
1. https://stackoverflow.com/a/65221327
