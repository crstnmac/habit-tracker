import {View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'

import {format, startOfToday} from 'date-fns'
import PagerView from 'react-native-pager-view'
import {getDatesOfMonthByWeeks} from './util'

/**
 * DateSlider
 *
 * @export
 * @param {*} {
 *
 *   month = startOfToday().getMonth() + 1,
 *   year = startOfToday().getFullYear(),
 * }
 * @return {*}
 */
export default function DateSlider({
  month = startOfToday().getMonth() + 1,
  year = startOfToday().getFullYear(),
}) {
  const dates = getDatesOfMonthByWeeks(year, month)

  return (
    <PagerView
      style={{
        height: 100,
      }}
      initialPage={0}
    >
      {dates.map((week, i) => (
        <View key={i}>
          <View
            style={[
              styles.container,
              {
                justifyContent:
                  week.length === 7 ? 'space-between' : 'flex-start',
              },
            ]}
          >
            {week.map((day, i) => {
              const text = format(day, 'EEEEEE')
              const date = format(day, 'dd')
              return (
                <View
                  key={i}
                  style={{
                    alignItems: 'center',
                    paddingRight: week.length < 7 ? 8 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      paddingBottom: 5,
                    }}
                  >
                    {text}
                  </Text>
                  <Pressable
                    key={i}
                    style={({pressed}) => [
                      styles.date,
                      {
                        backgroundColor: pressed ? '#E5E5E5' : 'transparent',
                        borderColor: pressed ? '#E5E5E5' : '#000',
                      },
                    ]}
                    onPress={() => console.log(date)}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Inter-Bold',
                      }}
                    >
                      {date}
                    </Text>
                  </Pressable>
                </View>
              )
            })}
          </View>
        </View>
      ))}
    </PagerView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  date: {
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 100,
  },
})
