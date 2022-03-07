import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useState } from "react"

export default function App() {

  const [notas, setNotas] = useState([])

  async function mostraNotas() {
    const todasChaves = await AsyncStorage.getAllKeys()
    const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
    console.log(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota}/>}
        keyExtractor={nota => nota[0]}/>
      <NotaEditor mostraNotas={mostraNotas}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

