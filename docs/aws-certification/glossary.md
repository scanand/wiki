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
Regions have multiple AZ s, up to 3


### Availability Zone
What: Each AZ consists of one or more data centres, each with redundant power, networking and connectivity and housed in separate facilities. (Physical)

### Edge Locations
What: Edge Locations are CDN Endpoints for Cloud Front
They are more than AWS regions, total 200.  CDN end consumers are directed to the nearest Edge Location

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



### Amazon LightSail
- lighter / cheaper version of EC2

### AWS Elastic Beanstalk
- Designed to get __web applications__ up and running on AWS
- As a developer, you can upload your application code and Beanstalk uses services like EC2, ECS, for load balancing (ELB), auto-scaling (AWS Auto-scaling) and monitoring
- You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring
- At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

### AWS Fargate
- it s launch type for ECS
- Serverless and PAYG compute engine 

### AWS Lambda
- Function - only code



### AWS VPN

### Elastic Load Balancing

### Amazon EKS

### Amazon ECS
- Elastic container Service


### Amazon ECR
- Elastic container registry




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


### AWS Shield
- Firewall
- provides protection from Distribute  Denial of Service (DDoS) attack

### AWS Firewall Manager
- Manages various security services like firewall Shield
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
- *Comprised of*
    - Amazon
    - AWS


----------------------------------------------------------------------------------------------------------
>   ## Management and Governance

----------------------------------------------------------------------------------------------------------

Infrastructure 
- Underlying hardware
- 

### AWS Cloud Formation
- infrastructure automation using templates
- provision broad range of AWS resources
- infra-as-a-code
- **Automation**
- *Related To*
    - Amazon
    - AWS
- *Comprised of*
    - Amazon
    - AWS

### AWS OpsWorks
- used for config management that provide managed services of Puppet and Chef
- Updates include patching, updating, backup, configuration, and compliance management
- *Related To*
    - Amazon
    - AWS
- *Comprised of*
    - Amazon
    - AWS

### Amazon Quicksight
- Biz intellignece sevice

### AWS Batch
- batch computing jobs on EC2

### AWS organizations
- Provide api to do a quick and automated way to create and manage the AWS accounts
- consolidate the billing and administration of _multiple AWS accounts_
- helps restrict the AWS service, resources, and individual API actions, the users and roles in each member account can access.
- Offers following policy types
    - Service Control policy SCPs offer central control over the maximum available permissions for all the accounts in your organization
        - set a limit of the maximum amount of permissions within Organizational Units (OUs) within AWS Organizations.
    - Tag Policies - standardises tags across resources in your org accounts and OU.

### AWS Quick Starts Reference Deployments
- helps rapidly deploy a popular IT solution and start using it immediately
- pre-packaged configuration easy to use and quick to deploy

### AWS Trusted Advisor
- identifies insecure, inefficient or wasteful configurations on your account
- only available with Accounts with either Business- or Enterprise-level support subscriptions
- a tool provides real-time guidance following Aws best practices in areas of 
    - cost optimisation, 
    - provisioning resources,
    - performace, 
    - security and 
    - fault tolerance


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


### AWS CloudTrail
- AWS service to use to closely monitor account activity
- Audit Logging - track API activity

### AWS CloudWatch Metrics
- matrics performance monitoring
- Matrics - default, custom
- Monitor Application Performance and operational Health
- Doesn't monitor hardware/infrastructure or data centre

### AWS CloudWatch Logs
- put log files in to cloudwatch and troubleshoot

### What's diff between CloudTrail Vs Config Vs CloudWatch
- 

### CloudHSM
- Hardware S? M?
- USed managing encryption key

### AWS Systems Manager
- Allows an organisation to view __operational data__ from multiple AWS services - through a unified user interface and automate operational tasks

### AWS Config
- database releated config details
- not patch managment
- AWS service that enables you to accesse, audit, and evaluate the configurations of AWS Resources
- Analysis and continuous monitoring
    - Security and reource adinistration
    - configuration changes
    - change management
    - enterprise-wide compliance 


----------------------------------------------------------------------------------------------------------

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
- *Comprised of*
    - Amazon
    - AWS
```    
---

References:
1. https://stackoverflow.com/a/65221327
