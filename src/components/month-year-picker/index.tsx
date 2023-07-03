import {View, Text, Pressable} from 'react-native'
import React from 'react'
import ScrollPicker from '../scroll-picker'
import {months} from '../date-slider/util'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

import {Ionicons} from '@expo/vector-icons'
import CustomBackdrop from './CustomBackdrop'

export default function MonthYearPicker({
  month,
  setMonth,
}: {
  month: number
  setMonth: React.Dispatch<React.SetStateAction<number>>
}) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)
  const snapPoints = React.useMemo(() => ['25%'], [])

  return (
    <>
      <Pressable
        onPress={() => bottomSheetRef.current.present()}
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {months[month - 1]}
        </Text>

        <Ionicons name="chevron-down" size={24} />
      </Pressable>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          enableOverDrag={false}
          backdropComponent={CustomBackdrop}
          containerStyle={{
            zIndex: 100,
          }}
        >
          <ScrollPicker
            scrollViewComponent={BottomSheetScrollView}
            dataSource={months}
            onValueChange={(val, i) => {
              setMonth(i + 1)
            }}
            selectedIndex={month - 1}
            itemHeight={50}
            wrapperColor={'#ffffff'}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}
