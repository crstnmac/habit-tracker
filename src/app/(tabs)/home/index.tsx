import React, {useState} from 'react'

import DateSlider from '@/components/date-slider'
import ScreenWrapper from '@/components/screen-wrapper'

import {startOfToday} from 'date-fns'
import MonthYearPicker from '@/components/month-year-picker'
import {SectionList, Text, View, Pressable} from 'react-native'
import {useRoutineStore} from '@/store/routineStore'
import {Ionicons} from '@expo/vector-icons'

export default function HomeScreen() {
  const [month, setMonth] = useState(() => startOfToday().getMonth() + 1)
  const [year, setYear] = useState(() => startOfToday().getFullYear())

  const {routines, addHabit, removeHabit, resetRoutine} = useRoutineStore(
    (state) => state
  )

  const morningRoutine = routines.find((routine) => routine.title === 'Morning')

  console.log(morningRoutine)

  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <MonthYearPicker month={month} setMonth={setMonth} />

        <Pressable
          style={{
            backgroundColor: 'red',
            borderRadius: 999,
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
          }}
          onPress={() => resetRoutine()}
        >
          <Ionicons name="trash-bin" size={25} color="white" />
        </Pressable>
      </View>

      <DateSlider month={month} year={year} />

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <SectionList
          sections={routines}
          renderItem={({item, section: {title}}) => (
            <Pressable
              onPress={() =>
                removeHabit(
                  {
                    id: item.id,
                    title: item.title,
                  },
                  title
                )
              }
              style={{
                backgroundColor: '#fafafa',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text>{item.title}</Text>
            </Pressable>
          )}
          renderSectionHeader={({section: {title: habit}}) => (
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text>{habit}</Text>

              <Pressable
                style={{
                  backgroundColor: 'black',
                  borderRadius: 999,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  marginRight: 10,
                }}
                onPress={() =>
                  addHabit(
                    {
                      id: Math.random().toString(),
                      title: 'test',
                    },
                    habit
                  )
                }
              >
                <Ionicons name="add" size={25} color="white" />
              </Pressable>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </View>
    </ScreenWrapper>
  )
}
