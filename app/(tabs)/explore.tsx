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

  const fetchData = async (id: string) => {
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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg-phl.jpg')}
          style={styles.reactLogo}
        />
      }
    >
      {customer && (
        <>
          <ThemedView style={styles.titleContainer}>
            <Image
              source={require('@/assets/images/user2.png')}
              style={styles.reactLogo1}
            />
            <ThemedText type="title">{customer.full_name}</ThemedText>
            <Text style={styles.email}>{customer.email}</Text>
          </ThemedView>

          <View style={styles.userInfoContainer}>
            {/*  <Text style={styles.label}>Username:</Text> */}
            {/* <Text style={styles.value}>{customer.email}</Text> */}
            <Text style={styles.label}>Conta criada:</Text>
            <Text style={styles.value}>
              {new Date(customer.created_at).toLocaleDateString()}
            </Text>
            {/*  <Text style={styles.label}>Last Login:</Text> */}
            {/* <Text style={styles.value}> */}
            {/* {new Date(user.lastLogin).toLocaleDateString()} */}
            {/* </Text> */}
            <Text style={styles.label}>Contato:</Text>
            <Text style={styles.value}>{customer.cell_phone_number_1}</Text>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>
              {`${customer.street}, ${customer.number}, ${customer.neighborhood}, ${customer.city}, ${customer.state}, ${customer.zip_code}`}
            </Text>
          </View>

          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={30} color="#fff" />
          </TouchableOpacity> */}
        </>
      )}
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  reactLogo1: {
    height: 100, // Certifique-se de que a altura e a largura são iguais
    width: 100,
    bottom: 0,
    left: 0,
    borderRadius: 50,
    overflow: 'hidden', // Adicionado para garantir que a imagem se encaixe dentro do contêiner circular
    objectFit: 'contain' // Adicionado para garantir que a imagem se ajuste bem ao contêiner circular
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 50
  },
  email: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  value: {
    fontSize: 16,
    marginBottom: 10
  }
})
