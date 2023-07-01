import {View, Text, StyleSheet} from 'react-native'
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
    <PagerView style={{flex: 1}} initialPage={0}>
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
                  <View key={i} style={styles.date}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Inter-Bold',
                      }}
                    >
                      {format(day, 'dd')}
                    </Text>
                  </View>
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
