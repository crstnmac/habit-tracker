import {SplashScreen, Slot} from 'expo-router'

import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
  Inter_100Thin,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import {useEffect} from 'react'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  // Load the font `Inter_500Medium`
  const [fontsLoaded] = useFonts({
    'Inter-Medium': Inter_500Medium,
    'Inter-Regular': Inter_400Regular,
    'Inter-Thin': Inter_100Thin,
    'Inter-Bold': Inter_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) {
    return null
  }

  return <Slot />
}
