import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('studentData')


def lambda_handler(event, context):

    body = json.loads(event['body'])

    student_id = body['studentid']
    name = body['name']
    student_class = body['class']
    age = body['age']
    email = body.get('email', '')

    table.put_item(
        Item={
            'studentid': student_id,
            'name': name,
            'class': student_class,
            'age': age,
            'email': email
        }
    )

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST"
        },
        "body": json.dumps({
            "message": "Student added successfully"
        })
    }
