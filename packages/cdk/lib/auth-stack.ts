import * as cdk from 'aws-cdk-lib';                 // Import AWS CDK core library
import * as cognito from 'aws-cdk-lib/aws-cognito'; // Import AWS Cognito module
import { Construct } from 'constructs';             // Import Construct class to define CDK constructs

export class AuthStack extends cdk.Stack {

  public readonly userPoolId: string;
  public readonly userPoolClientId: string;

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

    this.userPoolId = userPool.userPoolId;
    this.userPoolClientId = userPoolClient.userPoolClientId;

    new cdk.CfnOutput(this, 'UserPoolId', { value: this.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: this.userPoolClientId });

  }
}
