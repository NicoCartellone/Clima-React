import React, {useState} from "react";
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, Text, Animated, Alert } from "react-native"
import {Picker} from '@react-native-picker/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    const {pais, ciudad} = busqueda;

    const [ animacionboton ] = useState(new Animated.Value(1));

    const cconsultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }

        // consultar la api
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "Agrega una ciudad y país para realizar la búsqueda",
            [{ text: "Entendido" }]
        )
    }

    const animacionEntrada = () => {
        Animated.spring( animacionboton, {
            toValue: .9,
            useNativeDriver: true,
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring( animacionboton, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: true,
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton }]
    }

    return (
        <>
            <View>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ ciudad => guardarBusqueda({...busqueda, ciudad})}
                        placeholder="Escriba una ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                        style={styles.picker}
                        selectedValue={pais}
                        onValueChange={ pais => guardarBusqueda({...busqueda, pais}) }
                        mode={"dialog"}    
                    >
                        <Picker.Item label="Seleccione un país" value=""/>
                        <Picker.Item label="Estados Unidos" value="US"/>
                        <Picker.Item label="Argentina" value="AR"/>
                        <Picker.Item label="Brasil" value="BR"/>
                        <Picker.Item label="Mexico" value="MX"/>
                        <Picker.Item label="Colombia" value="CO"/>
                        <Picker.Item label="Chile" value="CL"/>
                        <Picker.Item label="España" value="ES"/>
                        <Picker.Item label="Peru" value="PE"/>
                        <Picker.Item label="Bolivia" value="BO"/>
                        <Picker.Item label="Uruguay" value="UR"/>
                        <Picker.Item label="Francia" value="FR"/>
                        <Picker.Item label="Alemania" value="DE"/>
                        <Picker.Item label="Rusia" value="RU"/>
                        <Picker.Item label="Italia" value="IT"/>
                        <Picker.Item label="Emiratos Árabes Unidos" value="AE"/>
                        <Picker.Item label="Inglaterra" value="GB"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={ () => animacionEntrada()}
                    onPressOut={ () => animacionSalida()}
                    onPress={ () => cconsultarClima() }
                >
                    <Animated.View style={ [styles.btnBuscar, estiloAnimacion] }>
                        <Text style={styles.textoBuscar}>Buscar clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        padding:10,
        height:50,
        backgroundColor: "#fff",
        fontSize:15,
        marginBottom:20,
        textAlign:"center",
        borderRadius:15
    },
    btnBuscar: {
        marginTop:50,
        backgroundColor: "#000",
        padding:10,
        justifyContent:"center",
        borderRadius:15
    },
    textoBuscar:{
        color:"#fff",
        fontWeight:"bold",
        textTransform:"uppercase",
        textAlign:"center",
        fontSize:18
    },
    picker: {
        height:10, 
        //backgroundColor:"#1688",
        color:"#fff",
        borderRadius:15
    }
})

export default Formulario;