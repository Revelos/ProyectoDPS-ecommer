import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Favorito } from '../Favoritos/Favoritos'

export const AppCard = ({ title, price, image, items, onPress, style, imgContainer}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, {...style}]}>

      <Favorito product={items} />
    
      <View style={[styles.imageContainer, {...imgContainer}]}>
        <Image source={{uri: image}} style={{height: "100%", width: "100%"}}/>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardContext}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
           <AntDesign name="star" size={18} color="orange" />
           <AntDesign name="star" size={18} color="orange" />
           <AntDesign name="star" size={18} color="orange" />
           <AntDesign name="star" size={18} color="orange" />
           <AntDesign name="star" size={18} color="orange" />
        </View>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#607D8B",
    paddingBottom: 10,
    marginHorizontal: 5,
    borderRadius: 10
  },
  imageContainer: {
    height: 200
  },
  cardBody: {
    padding: 10
  },
  cardContext: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Lato_400Regular",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold"
  }
})