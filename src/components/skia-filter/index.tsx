import {
  Canvas,
  Image,
  makeImageFromView,
  SkImage,
} from '@shopify/react-native-skia'
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {StyleSheet, View} from 'react-native'

interface SkiaFilterProps {
  filter: ReactNode
  children: ReactNode | ReactNode[]
  width: number
  height: number
}

export const SkiaFilter = forwardRef<unknown, SkiaFilterProps>(
  ({filter, children, width, height}, ref) => {
    const viewRef = useRef(null)
    const [image, setImage] = useState<SkImage | null>(null)
    useImperativeHandle(
      ref,
      () => {
        return {
          toggle: async () => {
            if (image === null) {
              const snapshot = await makeImageFromView(viewRef)
              setImage(snapshot)
            } else {
              setImage(null)
            }
          },
        }
      },
      [image]
    )
    return (
      <View
        style={{
          width,
          height,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        ref={viewRef}
      >
        {children}
        {image && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            <Image image={image} x={0} y={0} width={width} height={height}>
              {filter}
            </Image>
          </Canvas>
        )}
      </View>
    )
  }
)
