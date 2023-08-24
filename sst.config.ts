import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { type SSTConfig } from 'sst';
import { NextjsSite, type NextjsSiteProps } from 'sst/constructs';

const isMaster = process.env.NEXT_PUBLIC_PRODUCTION_ENV === 'master';
const domain = 'barofish.com';

export default {
  config: () => {
    return {
      name: 'barofish-user-web',
      region: 'ap-northeast-2',
      stage: isMaster ? 'master' : 'dev',
    };
  },
  stacks: app => {
    app.stack(({ stack }) => {
      const props: NextjsSiteProps = {
        cdk: {
          server: {
            logRetention: RetentionDays.ONE_DAY,
          },
        },
      };

      if (isMaster) {
        props.customDomain = {
          domainName: domain,
          domainAlias: `www.${domain}`,
          hostedZone: domain,
        };
      } else {
        props.customDomain = {
          domainName: `dev.${domain}`,
          hostedZone: domain,
        };
      }

      const site = new NextjsSite(stack, 'site', props);

      stack.addOutputs({
        SiteUrl: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
