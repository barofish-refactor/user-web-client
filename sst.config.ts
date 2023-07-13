import { type SSTConfig } from 'sst';
import { NextjsSite, type NextjsSiteProps } from 'sst/constructs';

const isMaster = process.env.NEXT_PUBLIC_PRODUCTION_ENV === 'master';
const isMasterDev = process.env.NEXT_PUBLIC_PRODUCTION_ENV === 'master-dev';
const domain = 'barofish.com';

export default {
  config: () => {
    return {
      name: 'barofish-user-web',
      region: 'ap-northeast-2',
      stage: isMaster ? 'master' : isMasterDev ? 'master-dev' : 'dev',
    };
  },
  stacks: app => {
    app.stack(({ stack }) => {
      const props: NextjsSiteProps = {};

      if (isMaster) {
        props.customDomain = {
          domainName: domain,
          domainAlias: `www.${domain}`,
          hostedZone: domain,
        };
      }
      if (isMasterDev) {
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
