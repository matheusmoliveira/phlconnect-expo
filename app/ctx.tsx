import React, { useState, useEffect, createContext, useContext } from 'react'
import { useStorageState } from './useStorageState'

interface AuthContextType {
  signIn: (cpfCnpj: string, password: string, rememberMe: boolean) => void
  signOut: () => void
  session?: { id: string; cpfCnpj: string } | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<{
    id: string
    cpfCnpj: string
  } | null>('session')

  useEffect(() => {
    const checkSession = async () => {
      const storedSession = await useStorageState.getItem('session')
      if (storedSession) {
        setSession(storedSession)
      }
    }

    checkSession()
  }, [])

  const signIn = async (
    cpfCnpj: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const response1 = await fetch(
        'https://api.mikweb.com.br/v1/admin/customers?page=1&per_page=250',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU`,
            'Content-Type': 'application/json'
          }
        }
      )

      const response2 = await fetch(
        'https://api.mikweb.com.br/v1/admin/customers?page=2&per_page=250',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer SXYLPWX2FW:QTCVEE6KKC988A68XZZTOZMNCNOJJZAU`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data1 = await response1.json()
      const data2 = await response2.json()

      const customers = [...data1.customers, ...data2.customers]

      const customer = customers.find(
        (customer: any) =>
          customer.cpf_cnpj === cpfCnpj && customer.cpf_cnpj === password
      )

      if (customer) {
        if (rememberMe) {
          setSession({
            id: customer.id,
            cpfCnpj: customer.cpf_cnpj,
            password: customer.cpf_cnpj
          })
        }
        setSession({
          id: customer.id,
          cpfCnpj: customer.cpf_cnpj
        })
      } else {
        alert('Credenciais inválidas')
      }
    } catch (error) {
      alert('Erro ao realizar login')
    }
  }
  const signOut = () => {
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  )
}
