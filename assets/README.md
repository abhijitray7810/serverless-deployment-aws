# ☁️ AWS Serverless Web Application

A production-ready **AWS Serverless Web Application** built using **Terraform**, **Docker**, and modern AWS services.

This project demonstrates how to build a **highly available**, **scalable**, **secure**, and **cost-optimized** web application without managing servers.

---

# 📖 Table of Contents

- What is Serverless Computing?
- Why Serverless?
- Traditional vs Serverless
- Project Architecture
- Request Flow
- AWS Services Used
- Advantages
- Disadvantages
- Security Best Practices
- Monitoring & Logging
- Cost Optimization
- Scaling
- Real World Use Cases
- Interview Questions
- Conclusion

---

# 🚀 What is Serverless Computing?
((( A Serverless architecture relies on managed serviced where you only pay for what you use without worrying about infrastructure )))
Serverless Computing is a cloud execution model where developers focus only on writing application code while the cloud provider (AWS) automatically manages:

- Infrastructure
- Servers
- Operating Systems
- Auto Scaling
- High Availability
- Security Patching
- Capacity Planning

Developers simply upload the application and AWS executes the code whenever a request arrives.

> **Important:** Serverless does NOT mean there are no servers.
>
> Servers still exist, but AWS manages them instead of you.

---

# ❓ Why Do We Need Serverless?

Traditional applications require developers to manage:

- EC2 instances
- Load Balancers
- Auto Scaling Groups
- Security patches
- Server monitoring
- Capacity planning

Even when nobody uses the application, you still pay for running servers.

Serverless solves these problems.

Benefits include:

- No server management
- Pay only when code runs
- Automatic scaling
- Faster deployment
- Reduced operational overhead
- Lower infrastructure cost

---

# 🏗 Traditional Architecture

```
User
   │
   ▼
Load Balancer
   │
   ▼
EC2 Servers
   │
   ▼
Application
   │
   ▼
Database
```

Problems

- Idle servers cost money
- Manual scaling
- Server maintenance
- OS updates
- Capacity planning

---

# ☁️ Serverless Architecture

```
User
   │
   ▼
CloudFront
   │
   ▼
S3 Static Website
   │
   ▼
API Gateway
   │
   ▼
Lambda Function
   │
   ▼
DynamoDB
```

AWS automatically handles:

- Infrastructure
- Scaling
- Availability
- Security updates

---

# 🏗 Project Architecture

![Architecture](assets/architecture.png)

This project consists of the following AWS services:

| Service | Purpose |
|----------|----------|
| Route53 | DNS Management |
| CloudFront | Global CDN |
| S3 | Static Website Hosting |
| API Gateway | REST API |
| Lambda | Backend Compute |
| ECR | Docker Image Storage |
| DynamoDB | NoSQL Database |
| IAM | Security & Permissions |
| CloudWatch | Monitoring & Logging |
| Terraform | Infrastructure as Code |

---

# 🔄 Application Request Flow

## Step 1

The user opens the web application.

```
Browser
```

↓

## Step 2

Route53 resolves the custom domain.

```
example.com
```

↓

## Step 3

CloudFront serves cached static files.

```
HTML
CSS
JavaScript
```

↓

## Step 4

If API data is needed,

CloudFront forwards the request to

```
API Gateway
```

↓

## Step 5

API Gateway invokes

```
AWS Lambda
```

↓

## Step 6

Lambda performs business logic.

↓

## Step 7

Lambda reads/writes data from

```
DynamoDB
```

↓

## Step 8

Response is returned

```
Lambda
↓

API Gateway

↓

CloudFront

↓

Browser
```

---

# 🛠 AWS Services Explained

## Amazon S3

Stores

- HTML
- CSS
- JavaScript
- Images

Acts as static website hosting.

---

## Amazon CloudFront

CloudFront is AWS CDN.

Benefits

- Faster website loading
- SSL/TLS
- Global caching
- Reduced latency

---

## Route53

Provides

- DNS
- Domain Management
- Routing

---

## API Gateway

Responsible for

- REST API
- Authentication
- Rate Limiting
- CORS
- Request Validation

---

## AWS Lambda

Runs backend code.

Features

- Event-driven
- Auto Scaling
- Pay-per-request
- No servers

In this project Lambda runs as a Docker container stored inside Amazon ECR.

---

## Amazon ECR

Stores Docker images for Lambda.

Benefits

- Secure
- Versioning
- Easy deployment

---

## DynamoDB

Fully managed NoSQL database.

Features

- Serverless
- High Performance
- Millisecond latency
- Auto Scaling

---

## IAM

Provides secure access using

- Roles
- Policies
- Least Privilege Principle

---

## CloudWatch

Provides

- Logs
- Metrics
- Dashboards
- Monitoring
- Alarms

---

# 📈 Auto Scaling

One of the biggest benefits of serverless.

When

```
10 users
```

Only few Lambda instances run.

When

```
10,000 users
```

AWS automatically creates more Lambda instances.

No manual scaling required.

---

# 💰 Cost Optimization

Traditional EC2

```
Running 24/7
```

↓

You pay continuously.

Serverless

```
No requests

↓

No compute cost
```

Pay only when Lambda executes.

---

# 🔐 Security Best Practices

✔ IAM Least Privilege

✔ HTTPS using CloudFront

✔ S3 Bucket Block Public Access

✔ API Gateway Rate Limiting

✔ CloudWatch Monitoring

✔ Encryption at Rest

✔ Encryption in Transit

✔ Secure IAM Roles

---

# 📊 Monitoring

CloudWatch provides

- Logs
- Metrics
- Errors
- Invocation Count
- Duration
- Throttling
- Alarms

Useful for debugging production issues.

---

# 🌍 Real World Use Cases

Serverless is widely used for

- E-commerce websites
- Banking APIs
- Authentication systems
- IoT applications
- Chat applications
- Image processing
- Video transcoding
- Notification systems
- Mobile backends
- Event processing
- REST APIs
- Webhooks

---

# ✅ Advantages

- No server management
- Automatic scaling
- High availability
- Pay only for usage
- Faster deployment
- Built-in monitoring
- Global performance
- Managed infrastructure
- Lower operational cost

---

# ❌ Disadvantages

- Cold starts
- Execution timeout
- Vendor lock-in
- Limited runtime
- Debugging can be harder
- Stateless execution
- Service limits

---

# 🎯 When Should You Use Serverless?

Choose Serverless when:

- REST APIs
- Microservices
- Event-driven applications
- Static websites
- Mobile backends
- Automation scripts
- Scheduled jobs
- Image processing
- Notification systems

Avoid Serverless when:

- Long-running applications
- Heavy GPU workloads
- Large stateful applications
- Applications needing persistent connections

---

# 🎓 AWS Serverless Interview Questions

## 1. What is Serverless Computing?

Serverless is a cloud execution model where AWS manages infrastructure while developers focus only on application code.

---

## 2. Does Serverless mean there are no servers?

No.

Servers still exist.

AWS manages them.

---

## 3. What is AWS Lambda?

AWS Lambda is an event-driven compute service that runs code without provisioning servers.

---

## 4. What triggers Lambda?

Examples:

- API Gateway
- S3 Upload
- EventBridge
- DynamoDB Streams
- SNS
- SQS
- CloudWatch Events

---

## 5. Why use API Gateway?

To expose secure REST APIs with:

- Authentication
- CORS
- Rate limiting
- Validation

---

## 6. Why use CloudFront?

To cache content globally and reduce latency.

---

## 7. Why use S3?

To host static files like:

- HTML
- CSS
- JavaScript

---

## 8. Why use DynamoDB?

Because it is:

- Serverless
- Highly scalable
- Low latency
- Fully managed

---

## 9. What is a Cold Start?

A Cold Start occurs when Lambda initializes a new execution environment before running your code, causing slightly higher latency for the first request.

---

## 10. What is IAM?

IAM controls authentication and authorization using users, roles, and policies.

---

## 11. Why use ECR?

To store Docker container images for Lambda container deployments.

---

## 12. What is Infrastructure as Code (IaC)?

Infrastructure as Code is the practice of provisioning cloud resources using code instead of manual configuration.

Terraform is an example of an IaC tool.

---

## 13. Why Terraform?

Terraform enables:

- Version control
- Reproducible infrastructure
- Automation
- Multi-cloud deployments

---

## 14. What is CloudWatch used for?

CloudWatch provides:

- Logs
- Metrics
- Dashboards
- Alarms
- Monitoring

---

## 15. How does Lambda scale?

AWS automatically creates multiple Lambda execution environments based on incoming traffic without manual intervention.

---

# 🎯 Key Learning Outcomes

After completing this project you will understand:

- Serverless Architecture
- AWS Lambda
- API Gateway
- CloudFront
- Route53
- DynamoDB
- Dockerized Lambda
- Amazon ECR
- IAM Security
- CloudWatch Monitoring
- Terraform Infrastructure as Code
- Production Deployment
- Cost Optimization
- Auto Scaling
- Best Practices

---

# 📚 Conclusion

This project demonstrates how modern cloud-native applications can be built using **AWS Serverless technologies**. By combining **Amazon S3**, **CloudFront**, **API Gateway**, **AWS Lambda**, **DynamoDB**, **ECR**, **IAM**, and **CloudWatch**, the application achieves high availability, automatic scaling, enhanced security, and cost efficiency. Infrastructure is fully automated using **Terraform**, making deployments repeatable and production-ready. This architecture is well-suited for scalable web applications, REST APIs, and event-driven systems while minimizing operational overhead.
