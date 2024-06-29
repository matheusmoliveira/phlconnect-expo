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
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require('@/assets/images/bg-phl.jpg')}
            style={styles.imgLogo}
          />
        </View>
        <View style={styles.containerInit}>
          <Text style={styles.textTitle}>Bem Vindo</Text>
          <Text style={styles.textSubtitle}>Faça login na sua conta</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="account" size={23} color="#900" />
          <TextInput
            style={styles.input}
            placeholder="CPF/CNPJ"
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={23} color="#900" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeButton}
          >
            <Icon
              name={rememberMe ? 'radiobox-marked' : 'radiobox-blank'}
              size={20}
              color="#900"
            />
            <Text style={styles.rememberMeText}>Lembrar-me</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewWhatsAppLink}>
        <Text style={styles.whatsAppLink}>Precisa de ajuda? </Text>
        <TouchableOpacity onPress={openWhatsApp}>
          <Text style={styles.whatsAppLinkHighlight}>
            Fale conosco no WhatsApp
          </Text>
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
  container: {
    flex: 1,
    alignItems: 'center',

    padding: 0
  },
  containerLogo: {
    width: '100%',
    height: Dimensions.get('window').height * 0.35,
    marginBottom: 20
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  containerInit: {
    alignItems: 'center',
    marginBottom: 20
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  textSubtitle: {
    fontSize: 16,
    color: '#7D7D7D'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '85%'
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  rememberMeButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#7D7D7D'
  },
  buttonLogin: {
    backgroundColor: '#434343',
    borderRadius: 25,
    width: '85%',
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
  whatsAppLinkHighlight: {
    color: '#25D366'
  },
  viewWhatsAppLink: {
    position: 'absolute',
    bottom: 40,
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
    color: '#25D366'
  }
})

export default SignIn
