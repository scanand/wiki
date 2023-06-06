---
sidebar_label: 'Kubernetes'
sidebar_position: 2
---

# Introduction  

Documents are **groups of pages** connected through:
- a **sidebar**
- **previous/next navigation**
- **versioning**

## Create your first Doc
1. Docker Cli
2. Docker Engine/Daemon
3. Docker Registry

### Container
Create a image - you use a docker

While creating image your base os image.

container only has a base OS, and if container needs kernel operations, containers call virtual machine's host.

Complete OS - Kernel + base OS
Container - Base OS

### What is a container
Containers run images

### What is a Container image
- A container image bundles microservices application with its runtime, dependencies, libraries.
- A container image represents a source of container deployed - to offer an isolated executable environment for the application


### What is Container Orchestration?
Container Orchestation 
  - When group of systems work together to form
  - _clusters_ where 
  - _container's deployment and management_
  - *is automated at scale*


### Why Container Orchestration is necessary?
Container Orchestration is ncesssary such that, when we deploy to code to integration test or production environment - we want our Microserveces must need following requirements. 
1. **F**ault-tolerance
2. **O**n-demand scaling
3. **O**ptical usage of resources
4. **A**uto-discovery to discover and communicate with each other
5. **A**ccessibility from the outside world
6. **S**eamless updates/rollback without any downtime.

### What are Container Orchestrators?
Container Orchestrators are tools grouped together to orchestrate containers
- these can be deployed on any machine with or without isolation layer like hypervisor
- VMs on cloud and on Infrastructures-As-A-Service 
- Kubernetes offered as-a-Service from various provider, AWS, GKE. 
- Kubernetes is not a traditional PAAS because unlinke traditional PAAS, its not monolithic and various services of k8s are pluggable
