import React, {useState} from 'react'

import DateSlider from '@/components/date-slider'
import ScreenWrapper from '@/components/screen-wrapper'
import {Link, Redirect, Stack} from 'expo-router'
import {Text, View} from 'react-native'
import {startOfDay, startOfToday} from 'date-fns'

export default function HomeScreen() {
  const [month, setMonth] = useState(() => startOfToday().getMonth() + 1)
  const [year, setYear] = useState(() => startOfToday().getFullYear())

  console.log(month, year)

  return (
    <ScreenWrapper>
      <DateSlider month={month} year={year} />
    </ScreenWrapper>
  )
}
