import {log} from '@logtail/next'
import {PostHog} from 'posthog-node'

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!!,
  {
    host: 'https://app.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  }
)

export interface FeatureFlagStatus {
  sammy?: boolean;
}

export const getFeatureFlagStatus = async (): Promise<FeatureFlagStatus> => {
  try {
    return {
      sammy: await posthog.isFeatureEnabled('sammy_banner', 'ff'),
    }
  } catch (error) {
    // @ts-ignore
    log.error(error)
    return {
      sammy: false,
    }
  }
}
