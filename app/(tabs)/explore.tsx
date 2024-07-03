import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
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
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useSession } from '../ctx'

export default function TabTwoScreen() {
  const [customer, setCustomer] = useState([])
  const { signOut } = useSession()
  const { session } = useSession()

  const handleLogout = () => {
    signOut()
    router.replace('../sign-in') // Redireciona para a tela de login
  }

  const fetchData = async id => {
    try {
      const response = await axios.get(
        `https://api.mikweb.com.br/v1/admin/customers/${id}`,
        {
          headers: {
            Authorization: 'Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU'
          }
        }
      )
      const fetchedCustomer = response.data.customer
      if (fetchedCustomer) {
        setCustomer(fetchedCustomer)
      }
      console.log('Dados do cliente:', fetchedCustomer)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    if (session && session.id) {
      fetchData(session.id)
    }
  }, [session])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D8D8D8', dark: '#D8D8D8' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo-red.png')}
          style={styles.reactLogo}
        />
      }
    >
      <LinearGradient colors={['#8D1F1F', '#B73737']} style={styles.gradient1}>
        {customer && (
          <>
            <View style={styles.titleContainer}>
              <ThemedText Text type="title">
                Usuário
              </ThemedText>
            </View>

            <ThemedText style={styles.titleName} type="title">
              {customer.full_name}
            </ThemedText>
            <Text style={styles.email}>{customer.email}</Text>

            <View style={styles.userInfoContainer}>
              <Text style={styles.label}>Conta criada:</Text>
              <Text style={styles.value}>
                {new Date(customer.created_at).toLocaleDateString()}
              </Text>
              <Text style={styles.label}>Contato:</Text>
              <Text style={styles.value}>{customer.cell_phone_number_1}</Text>
              <Text style={styles.label}>Endereço:</Text>
              <Text style={styles.value}>
                {`${customer.street}, ${customer.number}, ${customer.neighborhood}, ${customer.city}, ${customer.state}, ${customer.zip_code}`}
              </Text>
            </View>
          </>
        )}
      </LinearGradient>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  gradient1: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: '60%'
  },
  reactLogo: {
    height: '50%',
    width: '100%',
    bottom: 0,
    left: 0,
    resizeMode: 'contain'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: '5%',
    marginBottom: '5%'
  },
  titleName: {
    marginTop: 8,
    fontSize: 18,
    color: '#FFF'
  },
  email: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFF'
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFF'
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
    color: '#FFF'
  }
})
