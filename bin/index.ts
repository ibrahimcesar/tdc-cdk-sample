#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TDCStack } from '../lib/TDCstack';

const app = new cdk.App();
new TDCStack(app, 'Future', {});