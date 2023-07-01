import {useRouter, useRootNavigationState, useSegments} from 'expo-router'
import React from 'react'
import {Text} from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'

export default function Index() {
  const segments = useSegments()
  const router = useRouter()
  const navigationState = useRootNavigationState()

  React.useEffect(() => {
    if (!navigationState?.key) return

    // go to tabs root.
    router.replace('/(tabs)/home')
  }, [segments, navigationState?.key])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style="auto" />
      {!navigationState?.key ? <Text>LOADING...</Text> : <></>}
    </SafeAreaProvider>
  )
}
