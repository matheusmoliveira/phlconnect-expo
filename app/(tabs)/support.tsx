import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'

import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import axios from 'axios'

import { useSession } from '../ctx'

export default function TabTwoScreen() {
  const [message, setMessage] = useState('')
  const [customer, setCustomer] = useState([])
  const { session } = useSession()

  const capitalizeFirstLetter = name => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const toLowerCaseString = str => {
    return str.toLowerCase()
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

  const handlePost = async () => {
    try {
      const response = await axios.post(
        'https://api.mikweb.com.br/v1/admin/calledies',
        {
          subject: 'APP - PHL Connection',
          message: message,
          customer_id: 1888348
        },
        {
          headers: {
            Authorization: 'Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU'
          }
        }
      )
      console.log('Post successful:', response.data)
      // Aqui você pode tratar a resposta da API conforme necessário
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg-phl.jpg')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Suporte</ThemedText>
      </ThemedView>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {customer && (
          <View style={styles.customerTop}>
            <View style={[styles.customerInfo, styles.disabled]}>
              <Text style={styles.customerDetail}>
                Nome: {customer.full_name}
              </Text>
            </View>
            <View style={[styles.customerInfo, styles.disabled]}>
              <Text style={styles.customerDetail}>
                E-mail: {customer.email}
              </Text>
            </View>
          </View>
        )}

        <TextInput
          style={styles.messageclient}
          placeholder="Digite sua mensagem aqui"
          multiline
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <TouchableOpacity onPress={handlePost} style={styles.buttonPost}>
          <Text>Abrir Chamado</Text>
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
  customerTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  customerInfo: {
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    marginBottom: 20,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 10
      }
    })
  },
  messageclient: {
    justifyContent: 'flex-start',
    height: 150,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    marginBottom: 50,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 10
      }
    })
  },
  buttonPost: {
    backgroundColor: '#FFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 10
      }
    })
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  codetextPayment2: {
    color: '#000',
    fontSize: 30
  },
  disabled: {
    opacity: 0.5 // Opacidade reduzida para indicar desativado
  },
  disabledText: {
    color: '#aaa' // Cor de texto mais clara para indicar desativado
  }
})
