// bin/my-eks-blueprints.ts
import * as cdk from 'aws-cdk-lib';
import ClusterConstruct  from '../lib/my-eks-blueprints-stack';
//import ClusterConstructv2  from '../lib/my-eks-blueprints-stack-v2';

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT!;
const region = process.env.CDK_DEFAULT_REGION;
const env = { account, region }

new ClusterConstruct(app, 'clusterv2', { env });
//new ClusterConstructv2(app, 'cluster-v2', { env });
