import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProductContextProvider } from './src/context/Productcontext'
import { AppNavigation } from './src/navigations'
import { FavoriteContextProvider } from './src/components/Favoritos/Favoritos'
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const App = () => {

  const [latoFont] = useLato({
    Lato_400Regular
  })

  if(!latoFont){
    return null
  }

  return(
    <Provider store={store}>
      <FavoriteContextProvider>
        <ProductContextProvider>
          <AppNavigation />
        </ProductContextProvider>
      </FavoriteContextProvider>  
    </Provider>
  )
}

export default App
