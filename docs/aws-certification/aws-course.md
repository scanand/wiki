---
sidebar_label: 'AWS Course Notes'
sidebar_position: 30
---

Exam Prep: AWS Certified Cloud Practitioner (CLF-C01)

https://explore.skillbuilder.aws/learn/course/9449/play/32015/resources-for-security-support

Use cases and differences of these topics

## Module 2 Security and Compliance
- Network Security
- Network ACLs  ??- are subnet level firewalls
- Security Groups ??  - are instance level firewalls
- IAM Policy - attached to AWS entities, what those entites can and cannot do
- AWS WAF -  Web Application Firewall - prevents sql injection award

- AWS Trusted Advisor
- AWS Inspector
- THird Party tools - AWS Marketplace

Check notes "22 June 2023"

Audit and Identify Security related events
- Amazon CloudWatch
- AWS CloudTrail
- AWS Condif
- Amazon Inspector

## Module 3 Technology
### Core Services - Compute, Database, Network

How various services fit in category
Why would you choose one category over other
What sub-category exists within each type

### Compute
- instance families - why, how they excel
- Outside EC2 whats available? - how diffe
- elasticity and decoupling - which services used for this
- Lambda, or beanstalk, or ECS or ec2 - what are other Compute options

### Storage
- Operate, limitations, usage - Storage limitations
- difference between
- data transfer
- communicate with each other

### Networking
- controlling and accessing resources
- feature/controls
- connections to and from VPC - local and aws connections
- rotue53 fits into the picture - features and utilisation

### database
- RDS vs dyanmo Vs redshift
- managing own db on EC2
- use of mananged service vs rds
- style of db 
- no one size fits solution

In general managed services - varying levels of management and control they provide
availability, failover and data consistency come to play


#### Pricing Model
- on-demand, reserved, spot instances
- Best fit use case for each pricing model
- Sharing instances with other accounts
- instance size
- instance flexibility increases,  Pricing increases
- workload long, short, consistent, flexible and fault tolerance

### Billing
- By AWS 
    - AWS Support
    - Enterprise Support
- by Yourself/Self exploratory
    - AWS Cost Explorer - visualise - Month-by-month, by service, by tag
    - AWS Cost and Usage Report - Most comprehensive set of report account or organisation level
    - AWS Quick Sight - Data visualisation tool for billing 
    - AWS Simple Monthly Calculator - bills based on usage projections
    - Alarms
        - AWS Budgets