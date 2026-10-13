# 🚀 serverless-deployment-aws

A complete AWS Serverless Student Management Application using **API Gateway, Lambda, DynamoDB, and S3**. This project demonstrates how to build, deploy, and host a full-stack serverless application on AWS.

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-28%20123911.png)
## 📌 Project Description

This project is a serverless web application that allows users to:

* Add new students
* View student records
* Store data in DynamoDB
* Access APIs via API Gateway 
* Host frontend on Amazon S3

The backend is powered by AWS Lambda and DynamoDB, while the frontend is hosted using Amazon S3 static website hosting.

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150807.png)
## 🏗️ Architecture

```
Frontend (S3 Static Website)
        ↓
API Gateway (REST API)
        ↓
AWS Lambda (Backend Logic)
        ↓
DynamoDB (Database)
```

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150821.png)
## 🛠️ Technologies Used

* AWS Lambda
* Amazon API Gateway
* Amazon DynamoDB
* Amazon S3
* IAM
* HTML, CSS, JavaScript
* Python (Lambda)
* Git & GitHub

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150843.png)
## 📂 Project Structure

```
serverless-deployment-aws/
│
├── backend/
│   └── lambda_function.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── screenshots/
├── README.md
└── .gitignore
```

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150853.png)
## ✅ Prerequisites

Before starting, make sure you have:

* AWS Account
* IAM User with AdministratorAccess
* AWS CLI installed
* Git installed
* Basic knowledge of AWS

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150915.png)
## ⚙️ Step-by-Step Setup Guide

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/e2cbfa749c92dbfdc8782e2264c7425c1704ea59/assets/Screenshot%202026-01-30%20150931.png)
### Step 1: Create DynamoDB Table

1. Go to AWS Console → DynamoDB → Tables → Create table
2. Table name: `students`
3. Partition key: `studentid` (String)
4. Click Create

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20150948.png)
### Step 2: Create IAM Role for Lambda

1. Go to IAM → Roles → Create role
2. Select Lambda
3. Attach policies:

   * AmazonDynamoDBFullAccess
   * CloudWatchLogsFullAccess
4. Name: `lambda-student-role`

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151001.png)
### Step 3: Create Lambda Function

1. Go to AWS Lambda → Create function

2. Author from scratch

3. Name: `studentLambda`

4. Runtime: Python 3.12

5. Role: Use existing role (`lambda-student-role`)

6. Upload your backend code

Example:

```python
import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('students')

def lambda_handler(event, context):
    body = json.loads(event['body'])

    student_id = str(uuid.uuid4())

    item = {
        'studentid': student_id,
        'name': body['name'],
        'class': body['class'],
        'age': body['age']
    }

    table.put_item(Item=item)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'message': 'Student saved'})
    }
```

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151047.png)
### Step 4: Create API Gateway

1. Open API Gateway → Create API

2. Choose REST API

3. Create new API → Name: `student-api`

4. Create Resource: `/students`

5. Create Methods: GET, POST

6. Integrate both with Lambda

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151047.png)
### Step 5: Enable CORS

1. Select `/students`
2. Click Enable CORS
3. Allow origin: `*`
4. Save
5. Deploy API

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151106.png)
### Step 6: Deploy API

1. Click Actions → Deploy API
2. Create stage: `prod`
3. Copy Invoke URL

Example:

```
https://xxxx.execute-api.us-east-1.amazonaws.com/prod
```

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151115.png)
### Step 7: Create S3 Bucket (Frontend Hosting)

1. Go to S3 → Create bucket
2. Name: `student-frontend-abhijit`
3. Region: us-east-1
4. Disable Block Public Access

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151129.png)
### Step 8: Enable Static Website Hosting

1. Open bucket → Properties
2. Enable Static website hosting
3. Index document: `index.html`
4. Error document: `error.html`

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151153.png)
### Step 9: Upload Frontend Files

Upload:

* index.html
* script.js
* style.css

To S3 bucket.

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151206.png)
### Step 10: Add Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::student-frontend-abhijit/*"
    }
  ]
}
```

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151301.png)
### Step 11: Connect Frontend with Backend

Update `script.js`:

```js
const API_URL = "https://xxxx.execute-api.us-east-1.amazonaws.com/prod/students";
```

Replace with your real API URL.

---
![image](https://github.com/abhijitray7810/serverless-deployment-aws/blob/6c99256e40d3dbf4d2b91c4dda5cbd775eff15b0/assets/Screenshot%202026-01-30%20151310.png)
### Step 12: Test Using CLI

```bash
curl -X POST http://student-frontend-abhijit.s3-website-us-east-1.amazonaws.com
-H "Content-Type: application/json" \
-d '{"name":"Anita","class":"CS102","age":21}'
```

---

### Step 13: Test Using Browser

Open:

```
http://student-frontend-abhijit.s3-website-us-east-1.amazonaws.com
```

Add students using UI.

---

## 📸 Screenshots

Add screenshots in `screenshots/` folder.

---

## ⚠️ Common Issues

### 1. Data Overwrites

Cause: Same `studentid`

Solution: Use UUID in Lambda

---

### 2. 403 Access Denied (S3)

Cause: Block Public Access

Solution: Disable block + add bucket policy

---

### 3. CORS Error

Cause: CORS not enabled

Solution: Enable CORS in API Gateway

---

## 📈 Future Improvements

* Authentication (Cognito)
* Admin panel
* Search feature
* Pagination
* Terraform deployment

---

## 🤝 Contributing

Pull requests are welcome.

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open PR

---

## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author

**Abhijit Ray**
DevOps | Cloud | Serverless Enthusiast

---
