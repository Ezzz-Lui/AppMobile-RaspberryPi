import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BentoHeader = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const fetchData = async () => {
    try {
      // Simulación de llamada a la API
      const data = {
        temperature: 25.3,
        humidity: 65,
      };
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setApiResponse(data); // Guardar la respuesta completa en el estado
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const clearData = () => {
    setTemperature(null);
    setHumidity(null);
    setApiResponse(null);
  };

  return (
    <View className="bg-gray-100 p-4 mt-8 flex-1">
      {/* Barra superior con iconos y título */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity className="p-1">
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Raspberry Pi 4 - Sensor Data</Text>
        <TouchableOpacity className="p-1">
          <Icon name="user" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Sección de mediciones */}
      <View className="bg-gray-200 rounded-xl p-4 mb-4 flex-1">
        <Text className="text-center text-lg font-semibold mb-4">Datos de Temperatura y Humedad</Text>

        <View className="mb-4">
          <Text className="text-lg">Temperatura:</Text>
          <Text className="text-2xl font-bold text-blue-600">
            {temperature !== null ? `${temperature} °C` : 'N/A'}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg">Humedad:</Text>
          <Text className="text-2xl font-bold text-green-600">
            {humidity !== null ? `${humidity} %` : 'N/A'}
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

        {/* Sección para mostrar la respuesta JSON */}
        {apiResponse && (
          <View className="bg-gray-300 rounded-xl p-4 mt-4">
            <Text className="text-lg font-semibold mb-2">Respuesta de la API - Raspberry Pi:</Text>
            <Text className="text-xs text-gray-700 font-semibold">
              {JSON.stringify(apiResponse, null, 2)}
            </Text>
          </View>
        )}
      </View>

      {/* Contenedor de los botones (estilo bento) */}
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
