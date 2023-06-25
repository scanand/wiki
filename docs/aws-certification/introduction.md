---
sidebar_position: 1
---

# Cloud Practitioner

## Define the benefits of the AWS cloud including:
- Security
- Reliability
- High Availability
- Elasticity
- Agility
- Pay-as-you go pricing
- Scalability
- Global Reach
- Economy of scale

[Exam Guide](
https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf)

## Create your first Doc

1. Cloud Concepts

2. Security and Compliance

3. Technology

4. Billing and Pricing


## Cloud Service Models

- Private Computing: (house) 
  - greater control, greater responsibility

- IAAS: (House - rent)
  - Amazon EC2

- PAAS: (hotel)
  - java Application and Data
  - AWS Elastic BEanstalk

- SAAS
  - you dont manage anything at all
  - you just use the app
  - very less responsibility and less control
  - Google Apps

---

# AWS Products 

---


## Analytics:
### Amazon Athena
### Amazon Kinesis
### Amazon QuickSight

## Application Integration:
- Amazon Simple Notification Service (Amazon SNS)
- Amazon Simple Queue Service (Amazon SQS)

## [Compute and Serverless](compute.md):
- AWS Batch
- Amazon EC2
  - Billing EC2 instance types (for example, Reserved, On-Demand, Spot)
  - Amazon Machine Images (AMIs)
- AWS Elastic Beanstalk
- Amazon Lightsail
- Amazon WorkSpaces

## Serverless:
- AWS Lambda

## Containers:
- Amazon Elastic Container Service (Amazon ECS)
- Amazon Elastic Kubernetes Service (Amazon EKS)
- AWS Fargate

## [Database](database.md#databases): 
- Amazon Aurora
- Amazon DynamoDB
- Amazon ElastiCache
- Amazon RDS
- Amazon Redshift

Developer Tools:
- AWS CodeBuild - AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.
- AWS CodeCommit - AWS CodeCommit is a fully-managed source control service that hosts secure Git-based repositories. It makes it easy for teams to collaborate on code in a secure and highly scalable ecosystem.
- AWS CodeDeploy is a deployment service that automates application deployments to Amazon EC2 instances, on-premises instances, serverless Lambda functions, or Amazon ECS services.
- AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure update
- AWS CodeStar - AWS CodeStar enables you to quickly develop, build, and deploy applications on AWS. AWS CodeStar provides a unified user interface, enabling you to easily manage your software development activities in one place
- Amazon CodeGuru helps you improve code quality and automate code reviews by scanning and profiling your Java and Python applications. CodeGuru Reviewer can detect potential defects and bugs in your code

Customer Engagement:
- Amazon Connect
- AWS Support Center
  - AWS Support might approve, deny, or partially approve your requests.

Management, Monitoring, and Governance:
- AWS Service Catalog
- AWS Marketplace
- AWS Auto Scaling
- AWS Budgets
- AWS CloudFormation
- AWS CloudTrail
- Amazon CloudWatch
- AWS Config
- Cost Explorer
- AWS Cost and Usage Report
- Amazon EventBridge (Amazon CloudWatch Events)
- AWS License Manager
- AWS Managed Services
- AWS Organizations
- AWS Secrets Manager 
  - enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.
- AWS Key Management Service (AWS KMS)
  - This service is also involved with creating and managing encryption keys but does not use dedicated hardware.  
- AWS Systems Manager
- AWS Systems Manager Parameter Store
- Service quotas
  - view and manage your quotas for AWS services from a central location


Networking and Content Delivery:
- Amazon API Gateway
- Amazon CloudFront
- AWS Direct Connect
- Amazon Route 53
- Amazon VPC 
  - A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. 
- AWS VPC Peering 
  - Used to establish a connection between two VPCs located in different AWS Regions while using their existing infrastructure
- Amazon Elastic Load Balancers (ELB)
- Virtual private networks (VPNs)
  - components 
    - virtual private gateway - vpn concentrator that connects AWS VPC to on-premise network
    - Customer Gateway - device on private-cloud side
    - Customer Gateway device - a physical device sits between Customer gateway and in private cloud
    - Transit Gateway - is a hub connects multiple Aws VPCs to private-cloud/on-premise network
  - Client VPN - Elastic, can scale up and down - between client and private-cloud or public cloud
  - site-to-site VPN - secure connection between data centre (private cloud) and AWS Cloud resources

Security, Identity, and Compliance:
- Security groups
- AWS Artifact
- AWS Certificate Manager (ACM)
- AWS CloudHSM 
  - The AWS CloudHSM service helps you meet corporate, contractual, and regulatory compliance requirements for data security by using dedicated Hardware Security Module (HSM) instances within the AWS cloud. 
  - AWS CloudHSM enables you to easily generate and use your own encryption keys on the AWS Cloud.
- Amazon Cognito
- Amazon Detective
- Amazon GuardDuty
  - is an intelligent threat detection service 
- AWS Identity and Access Management (IAM)
- Amazon Inspector 
  - Amazon Inspector is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. 
  - Amazon Inspector automatically assesses applications for exposure, vulnerabilities, and deviations from best practices.
  - After performing an assessment, Amazon Inspector produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API.
- AWS License Manager
- Amazon Macie
  -  is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect sensitive data in AWS.
- AWS Shield
- AWS WAF

[Storage](database.md#storage): 

- AWS Backup
- Amazon Elastic Block Store (Amazon EBS)
- Amazon Elastic File System (Amazon EFS)
- Amazon S3
- Amazon S3 Glacier
- AWS Snowball Edge
- AWS Storage Gateway 

Global Infrastructure:
- AWS global infrastructure (for example, AWS Regions, Availability Zones)

AWS Interface:
- APIs
- AWS Management Console
- AWS Command Line Interface (CLI)
  - can be accessed by IAM user or root user by use of Access Key
  - Access Key comprised of Access Key Id + Secret Access Key

AWS Support Utilities:
- AWS Service Health Dashboard
-  displays the general status of AWS services
- AWS Personal Health Dashboard
  -  Personal Health Dashboard gives you a personalized view into the performance and availability of the AWS services underlying your AWS resources.
  -  provides alerts and remediation guidance when AWS is experiencing events that may impact you. 



Infrastructure as Code (IaC)
- AWS CloudFormation
- AWS Cloud Development Kit (AWS CDK)
- AWS Cloud Development Kit for Kubernetes
- AWS Cloud Development Kit for Terraform
- AWS Cloud Control API

AWS Contact Centre 
- AWS Professional Services
- AWS Trust & Safety team
  - If you suspect that AWS resources are used for abusive purposes, contact the AWS Trust & Safety team using the Report Amazon AWS abuse form, or by contacting abuse@amazonaws.com.

AWS Support plans [aws](https://aws.amazon.com/premiumsupport/faqs/?nc=sn&loc=6)
- Support Plan types

- AWS Trusted Advisor

AWS Developer Tools
- AWS software development kits 

## Other
### AWS Data Pipeline
  - A data pipeline is a series of processing steps to prepare enterprise data for analysis.

**AWS Artifact** is your go-to, central resource for compliance-related information that matters to you. You can access the AWS Artifact console to use AWS Artifact to review, accept, and track the status of AWS agreements

AWS Security Hub is not a compliance service. **AWS Security Hub** is a cloud security posture management service that automates best practice checks, aggregates alerts, and supports automated remediation.


## Business intelligence

 Amazon QuickSight is a cloud-native, serverless, business intelligence service.

### AWS Glue
AWS Glue is an Extract, Transform, and Load (ETL) service. You can use AWS Glue with data sources on Amazon S3, RedShift and other databases. With AWS Glue you transform and move the data to various destinations. It is used to prepare and load data for analytics.

AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development. AWS Glue provides all of the capabilities needed for data integration so that you can start analyzing your data and putting it to use in minutes instead of months.

AWS Glue provides both visual and code-based interfaces to make data integration easier. Users can easily find and access data using the AWS Glue Data Catalog. Data engineers and ETL (extract, transform, and load) developers can visually create, run, and monitor ETL workflows with a few clicks in AWS Glue Studio.