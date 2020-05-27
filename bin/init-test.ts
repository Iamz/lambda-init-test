#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InitTestStack } from '../lib/init-test-stack';

const app = new cdk.App();
new InitTestStack(app, 'InitTestStack');
