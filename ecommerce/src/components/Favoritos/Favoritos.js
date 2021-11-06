import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FavoriteContext } from '../../context/Favoritecontext'

export const Favorito = ({product}) => {

  const {add, remove, isFavored } = useContext(FavoriteContext)
  
  const isSaved = isFavored.find(e => e.id === product.id)

  return (
    <TouchableOpacity style={styles.favs} onPress={() => !isSaved ? add(product) : remove(product)} >
      <AntDesign size={40} color={!isSaved ? "#607D8B" : "#607D8B"} name={!isSaved ? "hearto" : "heart"} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  favs: {
    position: "absolute",
    left: 10,
    top: 30,
    zIndex: 100
  }
})