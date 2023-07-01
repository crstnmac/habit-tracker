import {Tabs} from 'expo-router'
import {Feather} from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
          href: '/(tabs)/home',
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="bar-chart-2" size={24} color="black" />
          ),
          href: '/(tabs)/challenges',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
          href: '/(tabs)/settings',
        }}
      />
    </Tabs>
  )
}
