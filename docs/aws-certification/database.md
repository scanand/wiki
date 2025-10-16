title: Storage and Databases
sidebar_label: 'Storage and Databases'
sidebar_position: 3
---

## Storage

- Relational (R)
    - scaling vertically (changin instance size)
- Non-releational (NR)
    - scaling horizontally ( changing number of instances)
### AWS Backup
- 

## Amazon S3 (SSS Simple Storage Service)
- stores objects in buckets
- objects are type of key-value pair
- __Object life cycle management__
- *Related To*
    - Amazon
    - AWS
    - __Cross-region replication__
    - __Transfer Acceleration__ uses the cloudfront to updload data faster
    - S3 can archive data on AWS Glacier
- *Comprised of*
    - Amazon
    - AWS
- Uses versioning to maintain copies of database
- Storage classes
    - S3 Standard
    - S3 Intelligent tiering
    - S3 Standard-IA - Infrequent Access
    - S3 One Zone-IA
    - S3 Glacier Instant retrieval
    - S3 Glacier Flexible retrieval
    - S3 Galcier Deep Archive
    - S3 Outposts
- Lifecyle management
    - optimize your S3 storage costs and performance by automating the transfer of data between storage classes

## Amazon S3 Glacier

## AWS Snowball Edge

## AWS Storage Gateway

## Amazon Elastic File System (Amazon EFS)
- EFS is a cloud storage service provided by Amazon Web Services
- designed to provide scalable, elastic, concurrent with some restrictions, and encrypted file storage for use with both AWS cloud services and on-premises resources
- based on NFS protocol

## Amazon Elastic Block Store (Amazon EBS)
- Amazon Elastic Block Store provides raw block-level storage that can be attached to Amazon EC2 instances and is used by Amazon Relational Database Service. 
- It is one of the two block-storage options offered by AWS,
- *Related To*
    - Amazon EC2 instances using EBS volumes can be backed up by creating snapshot of the EBS volume
    - AWS
- *Comprised of*
    - Amazon
    - AWS
- Amazon EBS automatically replicates data within an Availability Zone. Amazon EBS does not support Cross-Region Replication.
## Databases

## Aurora R
- Amazon's proprietary Relational database

## DynamoDB NR

- Database in key-value pairs
- *Related To*
    - AWS
- *Comprised of*
    - Amazon DynamoDB Accelerator DAX - reduces latency, its a cache placed infront of DynamoDB
    - AWS
- point-in-time backup
- DynamoDB only scales horizontally.

## AWS ElastiCache
- *Related To*
    - Amazon
    - AWS
- *Comprised of*
    - Amazon
    - AWS
- in memory database

## ElastiCache Redis NR

## Amazon RDS R
- Relational Database Service - Managed Service - choose the DB engine
- Automated backups as a default configuration 
    - granularity - Point-in-time recovery 
    - Automated backups
    - Database snapsots - user initiated
- *Related To*
    - Amazon EC2 instances using EBS volumes can be backed up by creating snapshot of the EBS volume
    - AWS
- *Comprised of*
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



### Amazon RedShift R
- fast and scalable datawarehousing service

### Amazon Athena
- running SQL queries on database

### Amazon Neptune NR
- Graph DB

Amazon EMR is a managed Hadoop framework running on EC2 and S3. It is used for analyzing data, not for ETL.
