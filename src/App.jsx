import React from 'react';
import {

  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import WeatherContainer from './WeatherContainer';


function App() {
  return (
    <ChakraProvider theme={theme}>
    <WeatherContainer/>
    </ChakraProvider>
  );
}

export default App;
