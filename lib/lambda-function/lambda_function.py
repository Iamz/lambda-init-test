import os

import boto3

secrets_manager = boto3.client('secretsmanager')
secret_string = secrets_manager.get_secret_value(SecretId=os.getenv('SECRET_ARN'))['SecretString']


def handler(event, context):
    return secret_string
