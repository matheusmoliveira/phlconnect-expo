import Ionicons from '@expo/vector-icons/Ionicons'
import type { PropsWithChildren, ReactElement } from 'react'
import {
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Text
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated'

import { router } from 'expo-router'

import { ThemedView } from '@/components/ThemedView'

import { useSession } from '../app/ctx'

const HEADER_HEIGHT = 250

type Props = PropsWithChildren<{
  headerImage: ReactElement
  headerBackgroundColor: { dark: string; light: string }
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor
}: Props) {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const { signOut } = useSession()

  const handleLogout = () => {
    signOut()
    router.replace('../sign-in') // Redireciona para a tela de login
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          )
        }
      ]
    }
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="exit-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 250,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden'
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 50
  }
})
