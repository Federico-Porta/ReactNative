import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from './components/Modal'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";



export default function App() {
  const [textValue, setTextValue] = useState('')
  const [itemsList, setItemsList] = useState([])
  const [completedItemsList, setCompletedItemsList] = useState([]) // Nueva lista para elementos completados
  const [itemSelected, setItemSelected] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const onHandleChangeItem = text => setTextValue(text)

  const addItem = () => {
    if (textValue.length === 0) {
      return
    }

    setItemsList(prevState => [
      ...prevState,
      { id: Math.random(), value: textValue, isOK: false },
    ])
    setTextValue('')
  }

  const toggleItemOK = index => {
    const updatedList = [...itemsList];
    const selectedItem = updatedList[index];
  
    if (!selectedItem.isOK) {
      setCompletedItemsList(prevState => [...prevState, selectedItem]);
    }
  
    selectedItem.isOK = !selectedItem.isOK;
    setItemsList(updatedList.filter(item => !item.isOK)); 
  };


  const renderListItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => toggleItemOK(index)}
        style={[
          styles.okButton,
          { backgroundColor: item.isOK ? "#ccc" : "#5cb85c" },
        ]}
      >
        <Text style={styles.textItem}
          name={item.isOK ? "check" : ""}
          size={24}
          color="#fff"
        >✓</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onHandleModal(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.textItem} color="#fff">X</Text> 
      </TouchableOpacity>
      <Text style={styles.textItem}>{item?.value || "Falta Elemento"}</Text>
    </View>
  )

  const onHandleDelete = () => {
    let arreglo = itemsList
    arreglo.splice(itemSelected, 1)
    setItemSelected(arreglo)
    setModalVisible(false)
  }

  const onHandleModal = index => {
    setModalVisible(true)
    setItemSelected(index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Item"
          value={textValue}
          onChangeText={onHandleChangeItem}
        />
        <Button color={'#3498db'} title="+ ADD" onPress={addItem} />
      </View>
      {itemsList.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={itemsList}
            renderItem={renderListItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      )}
      {completedItemsList.length > 0 && (
        <View>
          <Text style={styles.completedTitle}>Completed Items</Text>
          <FlatList
            data={completedItemsList}
            renderItem={({ item }) => (
              <View style={styles.completedItem}>
                <Text style={styles.completedText}>{item.value}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <Modal modalVisible={modalVisible} onHandleDelete={onHandleDelete}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 80,
    backgroundColor: '#ecf0f1', // Fondo en tono blanco
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
    marginBottom: 25,
    color: '#3498db', // Título en tono azul
  },
  inputContainer: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 12,
  },
  listContainer: {
    marginBottom: 15,
  },
  itemContainer: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#3498db', // Elementos pendientes en tono azul
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative',
  },
  textItem: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  okButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e74c3c', // Botón de eliminación en tono rojo
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2ecc71', // Título de elementos completados en tono verde
  },
  completedItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  completedText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalTitle: {
    backgroundColor: '#ccc',
    color: '#fff',
    fontSize: 18,
  },
  modalMessage: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
