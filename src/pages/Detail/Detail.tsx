import React from 'react'
import Constants from 'expo-constants'
import { Feather as FeatherIcon, FontAwesome as FontAwesomeIcon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import { RectButton } from 'react-native-gesture-handler'

const Detail = () => {
  const navigation = useNavigation()

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <FeatherIcon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: 'https://via.placeholder.com/150'}} />

        <Text style={styles.pointName}>Point name</Text>
        <Text style={styles.pointItems}>Item 1, Item 2, Item 3</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Cidade, UF</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}} >
          <FontAwesomeIcon name="whatsapp" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={() => {}} >
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
