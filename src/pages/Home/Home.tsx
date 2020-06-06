import React, { useEffect, useState, ChangeEvent } from 'react'
import { Feather as FeatherIcon } from '@expo/vector-icons'
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'

import axios from 'axios'

interface IbgeUf {
  sigla: string,
}
interface IbgeCity {
  nome: string,
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const navigation = useNavigation()

  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    axios.get<IbgeUf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => { setUfs(response.data.map(uf => uf.sigla)) })
  }, [])

  useEffect(() => {
    if (selectedUf) {
      axios.get<IbgeCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => { setCities(response.data.map(city => city.nome)) })
    }
  }, [selectedUf])

  const handleSelectUf = (uf: string) => {
    if (selectedUf !== uf) {
      setSelectedCity('')
    }
    setSelectedUf(uf)
  }

  const handleSelectCity = (city: string) => {
    setSelectedCity(city)
  }

  const handleNavigateToPoints = () => {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    })
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.</Text>
      </View>
      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{
            label: 'Selecione o estado',
            value: null,
            color: '#9EA0A4',
          }}
          value={selectedUf}
          onValueChange={(uf) => handleSelectUf(uf)}
          items={ufs.map(uf => ({ label: uf, value: uf}))}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          placeholder={{
            label: 'Selecione a cidade',
            value: null,
            color: '#9EA0A4',
          }}
          value={selectedCity}
          onValueChange={(city) => handleSelectCity(city)}
          items={cities.map(city => ({ label: city, value: city}))}
          style={pickerSelectStyles}
        />
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <FeatherIcon name="arrow-right" color="#FFFFFF" size={24}/>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: 'white',
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#34CB79',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 8,
  },
  inputAndroid: {
    backgroundColor: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: '#34CB79',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 8,
  },
})

export default Home
