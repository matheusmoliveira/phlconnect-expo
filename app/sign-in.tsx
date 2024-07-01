import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions
} from 'react-native'
import { useSession } from './ctx'
import { router } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { LinearGradient } from 'expo-linear-gradient'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SignIn: React.FC = () => {
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const { signIn } = useSession()

  const handleLogin = async () => {
    await signIn(cpfCnpj, password, rememberMe)
    if (signIn) {
      router.replace('/')
    } else {
      alert('Credenciais inválidas')
    }
  }

  const openWhatsApp = () => {
    const url = 'https://wa.me/5597984130883'
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url)
        } else {
          console.log("Don't know how to open URI: " + url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <LinearGradient colors={['#D8D8D8', '#747474']} style={styles.gradient}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              source={require('@/assets/images/logo-red.png')}
              style={styles.imgLogo}
            />
          </View>

          <LinearGradient
            colors={['#8D1F1F', '#B73737']}
            style={styles.gradient1}
          >
            <View style={styles.containerInit}>
              <Text style={styles.textTitle}>olá</Text>
              {/* <Text style={styles.textSubtitle}>Faça login na sua conta</Text> */}
            </View>
            <View style={styles.ViewInput}>
              <View style={styles.ViewIcon}>
                <Icon name="account" size={55} color="#FFF" />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Usuário CPF ou CNPJ:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  placeholderTextColor="#FFFFFF"
                  value={cpfCnpj}
                  onChangeText={setCpfCnpj}
                />
              </View>
            </View>
            <View style={styles.ViewInput}>
              <View style={styles.ViewIcon}>
                <Icon name="lock" size={55} color="#FFF" />
              </View>
              <View style={styles.inputContainer}>
                {/* <Icon name="lock" size={23} color="#900" /> */}
                <Text style={styles.textInput}>Senha:</Text>

                <TextInput
                  style={styles.input}
                  placeholder="******************"
                  placeholderTextColor="#FFFFFF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.rememberMeButton}
              >
                <Icon
                  name={rememberMe ? 'radiobox-marked' : 'radiobox-blank'}
                  size={25}
                  color="#FFF"
                />
                <Text style={styles.rememberMeText}>Lembrar usuário</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
              <Text style={styles.textLogin}>Acessar conta</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
      <View style={styles.viewWhatsAppLink}>
        {/* <Text style={styles.whatsAppLink}>Precisa de ajuda? </Text> */}
        <TouchableOpacity onPress={openWhatsApp}>
          <Text style={styles.whatsAppLinkHighlight}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  gradient: {
    flex: 1
  },
  gradient1: {
    flex: 1,
    borderTopLeftRadius: '60%',
    borderTopRightRadius: '60%',
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLogo: {
    width: '100%',
    marginTop: '20%',
    height: Dimensions.get('window').height * 0.13,
    marginBottom: 30
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  containerInit: {
    alignItems: 'center',
    marginTop: 55
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF'
  },
  textSubtitle: {
    fontSize: 16,
    color: '#7D7D7D'
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: '55%'
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  ViewIcon: {
    backgroundColor: '#A74141',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 1,
    paddingLeft: 1,
    borderRadius: 20
  },
  textInput: {
    fontSize: 12,
    color: '#FFF'
  },
  input: {
    flex: 1,
    marginLeft: 0,
    marginTop: 10,
    color: '#FFF' // Also setting input text color to white
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop: 30
  },
  rememberMeButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#FFF'
  },
  buttonLogin: {
    backgroundColor: '#A74141',
    borderRadius: 20,
    width: '55%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20
  },
  textLogin: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewWhatsAppLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  whatsAppLink: {
    color: '#7D7D7D'
  },
  viewWhatsAppLink: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whatsAppLink: {
    color: '#7D7D7D'
  },
  whatsAppLinkHighlight: {
    color: '#FFF'
  }
})

export default SignIn
