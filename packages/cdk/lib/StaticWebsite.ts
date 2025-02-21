import * as cdk from "aws-cdk-lib";
import fs from "node:fs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import {Construct} from "constructs";

export type StaticWebsiteConfigType = {
  key: string;
  distPath: string;
  indexDocument?: string;
  errorDocument?: string;
  stack: Construct;
}

export function createStaticWebsite(config : StaticWebsiteConfigType) {
  // Create an S3 bucket to host the static website
  const bucket = new s3.Bucket(config.stack, `${config.key}Bucket`, {
    websiteIndexDocument: config.indexDocument || 'index.html',  // Entry point for the static website
    websiteErrorDocument: config.errorDocument || 'index.html',  // Single-page app fallback
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,          // Block all access control list
    publicReadAccess: true,                                      // Public access for the website
    removalPolicy: cdk.RemovalPolicy.DESTROY,                    // Cleanup on stack deletion
    autoDeleteObjects: true,                                     // Delete files in the bucket when destroyed
  });
  // Create a CloudFront distribution for HTTPS
  const distribution = new cloudfront.Distribution(config.stack, `${config.key}Distribution`, {
    defaultBehavior: {
      origin: new cloudfrontOrigins.S3StaticWebsiteOrigin(bucket),              // Serve content from S3
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,  // Force HTTPS
    },
  });
  // Add a lifecycle rule to the S3 bucket
  bucket.addLifecycleRule({
    id: 'LogLifecycleRule',
    enabled: true,
    expiration: cdk.Duration.days(90),
  });
  // Check if the folder exists
  if (fs.existsSync(config.distPath)) {
    // Deploy frontend files to the S3 bucket
    new s3Deploy.BucketDeployment(config.stack, `${config.key}Deployment`, {
      sources: [s3Deploy.Source.asset(config.distPath)],    // Path to your local frontend build folder
      destinationBucket: bucket,                            // Deploy to the S3 bucket
      distribution: distribution,                           // Invalidate CloudFront cache
      distributionPaths: ['/*'],                            // Refresh all files
    });
  } else {
    // Skip deployment if the folder doesn't exist
    console.warn(`Frontend folder not found. Skipping deployment: ${config.distPath}`);
  }
  // Return the bucket and distribution
  return {bucket, distribution}
}