import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import { router } from 'expo-router'
import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import { useSession } from '../ctx'

export default function TabTwoScreen() {
  const { signOut } = useSession()

  const handleLogout = () => {
    signOut()
    router.replace('../sign-in') // Redireciona para a tela de login
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg-phl.jpg')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.buttonlogout} onPress={handleLogout}>
          <Text style={styles.textlogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
})
