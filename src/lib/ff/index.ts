import {log} from '@logtail/next'
import {PostHog} from 'posthog-node'

import { isPostHogEnabled, POSTHOG_KEY } from '~/config'

let posthog : PostHog | null = null
if (isPostHogEnabled) {
  posthog = new PostHog(POSTHOG_KEY!!,
    {
      host: 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    }
  )
}

export interface FeatureFlagStatus {
  sammy?: boolean;
}

export const getFeatureFlagStatus = async (): Promise<FeatureFlagStatus> => {
  const defaultFeatureFlag = {
    sammy: false,
  }
  if (!isPostHogEnabled) {
    return defaultFeatureFlag
  }
  try {
    return {
      sammy: await posthog?.isFeatureEnabled('sammy_banner', 'ff'),
    }
  } catch (error) {
    // @ts-ignore
    log.error(error)
    return defaultFeatureFlag
  }
}
