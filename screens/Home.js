import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import { StyledContainer, Background, InnerContainer } from './../components/styles';
import Slider from '../components/slider';
import SearchBar from './../components/searchBar';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import { StatusBar } from 'expo-status-bar';
export default function App({ navigation }) {
  return (
<>
<StatusBar style="auto" />
    <Background source={require('./../assets/img/fondo.jpg')}>
    <ScrollView>
     
      <View style={styles.container}>
        <Text style={styles.titulo}>BIENVENIDO A NUESTRA TIENDA EN LINEA</Text>
        <Slider />
        <Text style={styles.subtitulo}>Aqui encontrarás: </Text>
        <View style={styles.secciones}>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/5490974/pexels-photo-5490974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
            />
            <Text>Ropa</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/6220653/pexels-photo-6220653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Zapatos</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Trajes</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Mucho más</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  searchbar: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secciones: {
    width: 200,
    
    flexDirection: 'column',
    flex:1,
    alignItems: 'center',
  },
  seccion: {
    width: 400,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  img: {
    width: 400,
    height: 85,
    margin: 9,
    resizeMode: 'cover',
  },
});
