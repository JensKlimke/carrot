import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import path from "node:path";
import {createStaticWebsite} from "./StaticWebsite";

export class AuthStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Cognito User Pool
    const userPool = new cognito.UserPool(this, 'CarrotUserPool', {
      userPoolName: 'CarrotUserPool',
      selfSignUpEnabled: true,        // Allow users to sign up themselves
      signInAliases: { email: true }, // Users can sign in using their email
      autoVerify: { email: true },    // Automatically verify emails

      // Configure email verification using a link (instead of a code)
      userVerification: {
        emailSubject: 'Complete your registration!',
        emailBody: 'Click the following link: {####}',
      },

      // Define required user attributes
      standardAttributes: {
        email: { required: true, mutable: false },          // Email is required and cannot be changed later
        fullname: { required: true, mutable: true },        // Full name is required but can be changed
        profilePicture: { required: false, mutable: true }  // Profile picture is optional and can be updated later
      }
    });

    // Create a User Pool Client (for frontend authentication)
    const userPoolClient = new cognito.UserPoolClient(this, 'CarrotAppUPC', {
      userPoolClientName: 'CarrotUserPool',   // The name of the client
      userPool,                               // Attach the client to the user pool
      generateSecret: false,                  // No secret is needed for public clients (e.g., frontend apps)
      authFlows: {
        userPassword: true,                   // Allow login via email and password
        userSrp: true                         // Allow Secure Remote Password (SRP) authentication
      }
    });

    // Create static website (WhoisFrontend)
    const { distribution : whoIsAppContribution } = createStaticWebsite({
      key: 'AuthApp',
      distPath: path.resolve(`../auth-app/build`),
      stack: this
    });

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'The id of the user pool',
    });
    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'The id of the user pool client',
    });
    new cdk.CfnOutput(this, 'WhoIsAppURL', {
      value: `https://${whoIsAppContribution.domainName}`,
      description: 'The domain to reach the auth app'
    });

  }

}
