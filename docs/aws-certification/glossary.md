---
sidebar_label: 'Glossary'
sidebar_position: 99
---


# AWS Terminology


------------------------------------------------------------------------------------------------------------------------


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

AWS shield use Edge locations to 
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

------------------------------------------------------------------------------------------------------------------------
## Compute
### Amazon EC2 Auto Scaling
### Amazon Elastic Cloud Compute EC2
- provides resizable computing capacity on the server in Amazon's data centrpre1P
- *Related To*
    - Amazon EC2 instace store - one of the block storage option, EC2 instance types come with data volumes that are physically connected to the instance’s physical host. What are these volumes called?
    - AWS
- *Comprosed of*
    - Amazon
    - AWS


### Amazon LightSail
- cheaper version of EC2
### AWS Elastic Beanstalk
- Designed to get web applications up and running on AWS
- As a developer, you can upload your application code and Beanstalk uses services like EC2, ECS, for load balancing (ELB), auto-scaling (AWS Auto-scaling) and monitoring

### AWS Fargate
- it s launch type for ECS
- Serverless and PAYG compute engine 

### AWS Lambda
- Function - only code



### AWS VPN

### Elastic Load Balancing

### Amazon EKS

### Amazon ECS
- Elastic container Sevice


### Amazon ECR
- Elastic container registry


------------------------------------------------------------------------------------------------------------------------

## Storage / Databases
___

- Relational (R)
    - scaling vertically (changin instance size)
- Non-releational (NR)
    - scaling horizontally ( changing number of instances)

### Amazon S3 (SSS Simple Storage Service)
- stores objects in buckets
- objects are type of key-value pair
- __Object life cycle management__
- *Related To*
    - Amazon
    - AWS
    - __Cross-region replication__
    - __Transfer Acceleration__ uses the cloudfront to updload data faster
    - S3 can archive data on AWS Glacier
- *Comprosed of*
    - Amazon
    - AWS
- Uses versioning to maintain copies of database
- Storage classes
    - S3 Stanadard
    - S3 Intelligent tiering
    - S3 Standard-IA - Infrequent Access
    - S3 One Zone-IA
    - S3 Glacier Instant retrieval
    - S3 Glacier Flexible retrieval
    - S3 Galcier Deep Archive
    - S3 Outposts
- Lifecyle management
    - optimize your S3 storage costs and performance by automating the transfer of data between storage classes

### AWS ElastiCache
- *Related To*
    - Amazon
    - AWS
- *Comprosed of*
    - Amazon
    - AWS
- in memory database
- 

### Storage Gateway

### Amazon Elastic File System
- EFS is a cloud storage service provided by Amazon Web Services
- designed to provide scalable, elastic, concurrent with some restrictions, and encrypted file storage for use with both AWS cloud services and on-premises resources
- based on NFS protocol

### DynamoDB NR
- Database in key-value pairs
- *Related To*
    - AWS
- *Comprosed of*
    - Amazon DynamoDB Accelerator DAX - reduces latency, its a cache placed infront of DynamoDB
    - AWS
- point-in-time backup

### Amazon RDS R
- Relational Database Service - Managed Service - choose the DB engine
- Automated backups as a default configuration 
    - granularity - Point-in-time recovery 
    - Automated backups
    - Database snapsots - user initiated
- *Related To*
    - Amazon EC2 instances using EBS volumes can be backed up by creating snapshot of the EBS volume
    - AWS
- *Comprosed of*
    - Amazon
    - AWS
- High availability or Data Durability
    - Deployment types 
    - multiple AZs to enable fault tolerance, creates standby instance (replicas) in other AZ and syncs, automatic failover to standby
- scalability 
    - can be vertically scaled, move to lare instance size  (actual operation causes downtime)  
    - increasing storage capacity ( for write replicas)
    - using read replicas - different AZ
- writes goes to master instance and standby gets read
- measured in IOPS - Input/output Operations Per Second
- Instance Class
    - burstable performance - cost-effective for nonproduction testing requirements where you don’t need consistent high performance
    - 

### Aurora R
- Amazon's proprietary Relational database
### ElastiCache Redis NR

### Amazon Neptune NR
- Graph DB

### AWS Config
- database releated config details
- not patch managment
- AWS service that enables you to accesse, audit, and evaluate the configurations of AWS Resources
- Analysis and continuous monitoring
    - Security and reource adinistration
    - configuration changes
    - change management
    - enterprise-wide compliance 

### Amazon EBS
- Amazon Elastic Block Store provides raw block-level storage that can be attached to Amazon EC2 instances and is used by Amazon Relational Database Service. 
- It is one of the two block-storage options offered by AWS,
- *Related To*
    - Amazon EC2 instances using EBS volumes can be backed up by creating snapshot of the EBS volume
    - AWS
- *Comprosed of*
    - Amazon
    - AWS

### Amazon RedShift R
- fast and scalable datawarehousing service

### Amazon Athena
- running SQL queries on database

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
- subnet - public & private
- Endpoints - way to connect public AWS services straight into your vpc 
- CIDR Block - Classless Inter Domain Routing
    - can have multiple CIDR blocks
- Subnet
    - has ip block - a subset of CIDR block
- spans mutiple availabilty zone in region
- Has *Internet Gateway* which allows public subnets to connect internet, and inbound connections into vpc
### Elastic Load Balancer

### Route 53
- Hosted Zone -highly available and scalable domain name service
- domain registration


### Shield
- Firewall
- provides protection from DDOS Attack

## AWS Connect
- AWS customer contact centre
### AWS Direct Connect
- Creates direct private network connection between your private cloud and AWS - to avoid public internet
- gives more reliability - predicable performance
- increased predictable bandwidth

### AWS Direct Connect Gateway
- This allows private data cetre can connect to muliple VPCs 
- gives more reliability - predicable performance
- increased predictable bandwidth

### API Gateway
- service to publish API for the users
- __Edge Optimised endpoint__
- *Related To*
    - Amazon
    - AWS
- *Comprosed of*
    - Amazon
    - AWS

### AWS CloudTrail
- AWS service to use to closely monitor account activity

What's diff between CloudTrail Config
------------------------------------------------------------------------------------------------------------------------
## Management and Governance
---
Infrastructure 
- Underlying hardware
- 
### AWS Cloud Formation
- infrastructure automation using templates
- provision broad range of aws resources
- infra-as-a-code
- *Related To*
    - Amazon
    - AWS
- *Comprosed of*
    - Amazon
    - AWS

### AWS OpsWorks
- used for config management that provide managed services of Puppet and Chef
- Updates include patching, updating, backup, configuration, and compliance management
- *Related To*
    - Amazon
    - AWS
- *Comprosed of*
    - Amazon
    - AWS

### Amazon Quicksight
- Biz intellignece sevice

## AWS Batch
- batch computing jobs on EC2

## AWS Organizations
- provides api to do a quick and automated way to create and manage the AWS accounts
- consolidate the billing and administration of _multiple AWS accounts_

### AWS Quick Starts Reference Deployments
- helps rapidly deploy a popular IT solution and start using it immediately
- pre-packaged configuration easy to use and quick to deploy

### AWS Trusted Advisor
- identifies insecure, inefficient or wastefule configurations on your account
- only available with Accounts with either Business- or Enterprise-level support subscriptions

### IAM
-- Support Identity Federation integration of third-party authentication services 

## Security Group
- a firewall like device can be configured at instance level to control network access
### AWS White papers
- AWS Documentation resource gives in-depth architectural and design guidance

### AWS Cost Explorer
- AWS Service lets you organise, visualise, and manager your account costs

### Amazon Cognito
- A tool for directly managing user sign-up and sign-in for your website or mobile app

### Amazon Simple Notification Service (SNS)
- SNS can be used to manage both programmatic and human-reable communications between AWS service resources and humans

### AWS Cost and Usage Reports
- 

### Amazon Kinesis
- Streaming data
- Capturing and analyzing very large volumes of data streaming generated by multiple log, transaction, and social media sources


### AWS CodeBuild
- building and testing source code
------------------------------------------------------------------------------------------------------------------------


## Nuggets
1. In a nutshell, if the service is meant to be used (consumed) through an API it will be an Amazon Web Service (short: AWS), otherwise it will be an Amazon product. (1)



----

## Template
### Tech Name
What:
>| Related To | 'Has'  | Works with only |
>| --- | ----------- | ---|
>| Paragraph1 | Text |
>| Paragraph 2| Text |

```
- *Related To*
    - Amazon
    - AWS
- *Comprosed of*
    - Amazon
    - AWS
```    
---

References:
1. https://stackoverflow.com/a/65221327
