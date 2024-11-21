import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BentoHeader = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const fetchData = async () => {
    try {
      const API_URL = 'http://172.16.64.119:8080'; // Reemplaza con tu URL real

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const textData = await response.text();
      console.log('Respuesta de la API:', textData);

      const parsedData = parsePlainTextData(textData);

      if (parsedData.temperature !== undefined && parsedData.humidity !== undefined) {
        setTemperature(parsedData.temperature);
        setHumidity(parsedData.humidity);
      } else {
        console.warn('Datos incompletos en la respuesta:', parsedData);
      }

      setApiResponse(textData);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      setApiResponse(`Error: ${error.message}`);
    }
  };

  const parsePlainTextData = (textData) => {
    try {
      // Suponiendo que el texto contiene "temperatura,humedad"
      const values = textData.split(','); // Dividir por comas
      if (values.length === 2) {
        return {
          temperature: parseFloat(values[0].trim()), // Primer valor como temperatura
          humidity: parseFloat(values[1].trim()),    // Segundo valor como humedad
        };
      }
      throw new Error('Formato inesperado en los datos de la API');
    } catch (error) {
      console.error('Error al procesar el texto plano:', error);
      return {}; // Devuelve un objeto vacío si ocurre un error
    }
  };

  const clearData = () => {
    setTemperature(null);
    setHumidity(null);
    setApiResponse(null);
  };

  return (
    <View className="bg-gray-100 p-4 mt-8 flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity className="p-1">
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Raspberry Pi 4 - Sensor Data</Text>
        <TouchableOpacity className="p-1">
          <Icon name="user" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-200 rounded-xl p-4 mb-4 flex-1">
        <Text className="text-center text-lg font-semibold mb-4">Datos de Temperatura y Humedad</Text>

        <View className="mb-4">
          <Text className="text-lg">Temperatura:</Text>
          <Text className="text-2xl font-bold text-blue-600">
            {temperature !== null ? `${temperature} °C` : 'Cargando...'}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg">Humedad:</Text>
          <Text className="text-2xl font-bold text-green-600">
            {humidity !== null ? `${humidity} %` : 'Cargando...'}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={fetchData}
            className="bg-white rounded-xl p-4 items-center justify-center mx-2 flex-1"
          >
            <Text className="text-sm font-semibold text-gray-700">Obtener Datos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearData}
            className="bg-white rounded-xl p-4 items-center justify-center mx-2 flex-1"
          >
            <Text className="text-sm font-semibold text-gray-700">Limpiar Datos</Text>
          </TouchableOpacity>
        </View>

        {apiResponse && (
          <View className="bg-gray-300 rounded-xl p-4 mt-4">
            <Text className="text-lg font-semibold mb-2">Respuesta de la API:</Text>
            <Text className="text-xs text-gray-700 font-semibold">{apiResponse}</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="bg-white rounded-xl p-4 items-center justify-center flex-1 mx-2">
          <Icon name="home" size={20} color="#333" />
          <Text className="mt-2 text-xs">Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-xl p-4 items-center justify-center flex-1 mx-2">
          <Icon name="settings" size={20} color="#333" />
          <Text className="mt-2 text-xs">Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-xl p-4 items-center justify-center flex-1 mx-2">
          <Icon name="info" size={20} color="#333" />
          <Text className="mt-2 text-xs">Acerca de</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BentoHeader;
