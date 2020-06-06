import React, { useEffect, useState } from 'react'
import {
  Feather as FeatherIcon,
  FontAwesome as FontAwesomeIcon
} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api'

interface Params {
  point_id: number
}

interface Data {
  image: string,
  name: string,
  email: string,
  whatsapp: string,
  city: string,
  uf: string,
  items: {
    title: string,
  }[]
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      console.log(response.data)
      setData(response.data)
    }).catch(() => {
      Alert.alert('Ops...', 'Não foi possivel carregar as informações. Por favor, tente novamente.')
    })
  }, [])

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${data.whatsapp}&text=Tenho interesse na coleta de resíduos`)
  }

  const handleComposeMail = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.email],
    })
  }

  if (!data.name) {
    return null
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <FeatherIcon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.image }} />

        <Text style={styles.pointName}>{data.name}</Text>
        <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.city}, {data.uf}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsApp} >
          <FontAwesomeIcon name="whatsapp" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail} >
          <FeatherIcon name="mail" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail
