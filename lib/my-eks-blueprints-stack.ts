// lib/my-eks-blueprints-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { InstanceType } from 'aws-cdk-lib/aws-ec2';

export default class ClusterConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const account = props?.env?.account!;
    const region = props?.env?.region!;


    const clusterProvider = new blueprints.GenericClusterProvider({
      managedNodeGroups: [
        {
            id: "managed-2",
            instanceTypes: [new InstanceType('m5.xlarge')],
            minSize: 1,
            maxSize: 10,
            desiredSize: 4,
            tags: {
              "Name": "blueprints-example-cluster",
              "Type": "generic-cluster"
          },            
          }    
    ]
});


    const blueprint = blueprints.EksBlueprint.builder()
    .version('auto')
    .account(account)
    .resourceProvider(blueprints.GlobalResources.Vpc, new blueprints.VpcProvider("vpc-07a825bb3508c2fd5"))
    .clusterProvider(clusterProvider)
    .region(region)
    .addOns()
    .teams()
    .build(scope, id+'-stack');
  }
}
