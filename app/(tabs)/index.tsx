import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
  Clipboard,
  Linking,
  format
} from 'react-native'
import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { API_TOKEN } from '@env'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import { LinearGradient } from 'expo-linear-gradient'

import { useSession } from '../ctx'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HomeScreen() {
  const [pixCopyPasteList, setPixCopyPasteList] = useState([])
  const [billings, setBillings] = useState([])
  const [billings2, setBillings2] = useState([])
  const { session } = useSession()

  const monthNames = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ'
  ]

  const getMonthName = dateStr => {
    const date = new Date(dateStr)
    const monthNumber = date.getMonth()
    return monthNames[monthNumber]
  }

  const fetchData = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.mikweb.com.br/v1/admin/billings?customer_id=${id}&situation_id=1`,
        {
          headers: {
            Authorization: 'Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU'
          }
        }
      )
      const fetchedBillings = response.data.billings
      if (fetchedBillings && fetchedBillings.length > 0) {
        setBillings(fetchedBillings)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (session && session.id) {
      fetchData(session.id)
    }
  }, [session])

  const capitalizeFirstLetter = name => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const fetchData2 = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.mikweb.com.br/v1/admin/billings?customer_id=${id}&situation_id=3`,
        {
          headers: {
            Authorization: 'Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU'
          }
        }
      )
      const fetchedBillings2 = response.data.billings
      if (fetchedBillings2 && fetchedBillings2.length > 0) {
        // Obtendo os últimos 10 dados
        const lastTenBillings = fetchedBillings2.slice(-10).reverse()
        setBillings2(lastTenBillings)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (session && session.id) {
      fetchData(session.id)
      fetchData2(session.id)
    }
  }, [session])

  const copyToClipboard = code => {
    Clipboard.setString(code)
    Alert.alert(
      'Copiado para a área de transferência',
      'O código do Boleto foi copiado para sua área de transferência.'
    )
  }

  const copyToClipboard2 = code => {
    Clipboard.setString(code)
    Alert.alert(
      'Copiado para a área de transferência',
      'O código PIX foi copiado para sua área de transferência.'
    )
  }

  const downloadBoleto = link => {
    Linking.openURL(link)
  }

  const formatValue = value => {
    return value.toFixed(2).replace('.', ',')
  }

  const formatDate = date => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}`
  }

  const formatDateYear = date => {
    const [year, month, day] = date.split('-')
    return `${year}`
  }

  const formatDueDay = dueDay => {
    const date = new Date(dueDay)
    return format(date, 'MMMM yyyy') // Formata o mês por extenso (ex: "Junho 2024")
  }

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
        <ThemedView style={styles.titleContainer}>
          {billings2.length > 0 && (
            <ThemedText
              style={styles.titleStyle}
              type="title"
              key={billings2[0].id}
            >
              {capitalizeFirstLetter(billings2[0].customer.full_name.trim())}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.pixContainer}>
          <ThemedText style={styles.titleBoletosAbertos} type="subtitle">
            Boletos em Aberto
          </ThemedText>
          <ScrollView>
            {billings.length === 0 ? (
              <View style={styles.noBillingContainer}>
                <Text style={styles.noBillingText}>
                  Não há boletos em aberto.
                </Text>
              </View>
            ) : (
              billings.map((billing, index) => (
                <View key={billing.id} style={styles.rowContainer}>
                  <View style={styles.rowContainertesting}>
                    <View style={styles.codeContainerPayment}>
                      <Text style={styles.codetextPayment}>
                        {getMonthName(billing.due_day)}
                      </Text>
                      <Text style={styles.codetextPaymentYear}>
                        {formatDateYear(billing.due_day)}
                      </Text>
                      <View style={styles.underlineContainer3}></View>
                      <Text style={styles.codetextPayment2}>
                        {billing.situation.name}
                      </Text>
                    </View>
                    <View style={styles.codeContainer}>
                      <View style={styles.codeContaPayment}>
                        <View style={styles.codeInfoPayment}>
                          <Text style={styles.textPayment}>
                            Valor da mensalidade:
                          </Text>
                          <Text style={styles.textPaymentReturn}>
                            R$ {formatValue(billing.value)}
                          </Text>
                        </View>
                        <View style={styles.codeInfoPayment}>
                          <Text style={styles.textPayment}>Vencimento:</Text>
                          <Text style={styles.textPaymentReturn}>
                            {formatDate(billing.due_day)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.buttonInfoPix}>
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={() => downloadBoleto(billing.integration_link)}
                    >
                      <Icon name="download" size={23} color="#711111" />

                      <Text style={styles.copyButtonText}>Acessar boleto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={() => copyToClipboard2(billing.pix_copy_paste)}
                    >
                      <Icon name="content-copy" size={23} color="#711111" />
                      <Text style={styles.copyButtonText}>
                        Copiar código PIX
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(billing.pix_copy_paste)}
                    >
                      <Icon name="content-copy" size={23} color="#711111" />
                      <Text style={styles.copyButtonText}>
                        Copiar código de barras
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </ThemedView>
        {/* <View style={styles.underlineContainer}></View> */}
        <ThemedView style={styles.pixContainer2}>
          <ThemedText style={styles.titleBoletosPagos} type="subtitle">
            Boletos Pagos
          </ThemedText>
          <ScrollView>
            {billings2.map((billing2, index) => (
              <View style={styles.rowContainer2}>
                <View style={styles.codeContainerPayment2}>
                  <Text style={styles.codetextPayment}>
                    {getMonthName(billing2.date_payment)}
                  </Text>
                  <Text style={styles.codetextPaymentYear}>
                    {formatDateYear(billing2.due_day)}
                  </Text>

                  <View style={styles.underlineContainer2}></View>

                  <Text style={styles.codetextPayment2} key={billing2.id}>
                    {billing2.situation.name}
                  </Text>
                </View>
                <View key={index} style={styles.codeContainer2}>
                  <View style={styles.codeContaPayment}>
                    <View style={styles.codeInfoPayment}>
                      <Text style={styles.textPayment}>Valor Pagamento</Text>
                      <Text style={styles.textPaymentReturn}>
                        R$ {formatValue(billing2.value)}
                      </Text>
                    </View>

                    <View style={styles.codeInfoPayment}>
                      <Text style={styles.textPayment}>Data Pagamento</Text>
                      <Text style={styles.textPaymentReturn}>
                        {formatDate(billing2.date_payment)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </ThemedView>
      </LinearGradient>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  gradient1: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: '100%',
    alignItems: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: '5%',
    backgroundColor: '#7B1616'
    /* gap: 8 */
  },
  titleStyle: {
    color: '#FFF',
    fontSize: 15,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: '8%',
    paddingLeft: '8%'
  },
  stepContainer: {
    /*   gap: 8,
    marginBottom: 8 */
  },
  pixContainer: {
    width: '80%',
    marginTop: '5%',
    marginBottom: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
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
  codeContainerPayment: {
    color: '#FFF',
    backgroundColor: '#FD7529',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    height: 130,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
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
  pixContainer2: {
    width: '80%',
    marginTop: '0%',
    marginBottom: '0%',
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
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
    height: '50%',
    width: '100%',
    bottom: 0,
    left: 0,
    resizeMode: 'contain'
  },
  copyButton: {
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'row'
  },
  copyButtonText: {
    fontSize: 10,
    marginLeft: 10,
    color: '#711111'
  },

  codetextPayment: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800'
  },
  codetextPaymentYear: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600'
  },
  codetextPayment2: {
    color: '#FFF',
    fontSize: 10
  },

  titleBoletosAbertos: {
    color: '#711111',
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 15
  },
  titleBoletosPagos: {
    color: '#711111',
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 15
  },

  codeContainerPayment2: {
    color: '#FFF',
    backgroundColor: '#12A771',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '35%',
    height: 130,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 10
      }
    })
  },
  codeContainer: {
    justifyContent: 'center',
    width: '65%',
    height: 130,
    backgroundColor: '#FFF',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
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
  codeContainer2: {
    marginVertical: 10,
    padding: 10,
    justifyContent: 'center',
    width: '65%',
    height: 130,
    backgroundColor: '#FFF',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
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
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    height: '100%',
    marginBottom: '10%'
  },
  rowContainertesting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    height: '20%',
    marginBottom: '10%',
    marginTop: 10
  },
  buttonInfoPix: {
    width: '100%',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    height: '20%',
    marginBottom: '6%',
    marginTop: 10,
    backgroundColor: '#FFF'
  },
  codeInfoPayment: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#FFF'
  },
  codeContaPayment: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPayment: {
    fontSize: 10,
    color: '#711111'
  },
  textPaymentReturn: {
    fontSize: 18,
    color: '#711111',
    fontWeight: '700'
  },
  underlineContainer: {
    color: '#FFF',
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#FFF',
    width: '100%',
    marginTop: '10%',
    marginBottom: '10%'
  },
  underlineContainer2: {
    color: '#FFF',
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#FFF',
    width: '100%',
    marginTop: '10%',
    marginBottom: '10%'
  },
  underlineContainer3: {
    color: '#FFF',
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#FFF',
    width: '80%',
    marginTop: '10%',
    marginBottom: '10%'
  },
  noBillingContainer: {
    // Estilos do contêiner quando não há boletos
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  noBillingText: {
    // Estilos do texto quando não há boletos
    fontSize: 16,
    color: '#024E2E' // Ajuste a cor conforme necessário
  }
})
