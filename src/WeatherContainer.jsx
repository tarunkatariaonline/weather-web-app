import { Box, Button, HStack, Input, Image, Text, useToast ,Spinner,VStack} from '@chakra-ui/react'
import React, { useState } from 'react'




import { WiStrongWind } from 'react-icons/wi'
import { TiWaves } from 'react-icons/ti'
import { MdLocationOn } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'


import CloudImage from './Images/cloud.png'
import ErrorImage from './Images/404.png'
import RainImage from './Images/rain.png'
import SunnyImage from './Images/clear.png'
import MistImage from './Images/mist.png'
import SnowImage from './Images/snow.png'



import './css/WeatherContainer.css'
const WeatherContainer = () => {

    const [city, setCity] = useState("")
    const [weatherImage, setWeatherImage] = useState(ErrorImage)
    const [weather, setWeather] = useState(null)
    const [loading,setLoading] = useState(true)
    const [conatainerActive, setContainerActive] = useState("container")
    const toast = useToast()
    const searchCityWeather = async () => {

       setLoading(true)

        if (city === "") {
            toast({
                position: 'bottom-left',
                description: " Please Enter Your City Name !",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setContainerActive("container")
        } else {

            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0aa9d166935604da9e44ee8dbac83f9d`)
            const json = await res.json()
            console.log(json)
            if (json?.cod === '404') {
               
             
                setWeatherImage(ErrorImage)
                setWeather(null)
                setLoading(false)
            } else {
                setWeather(json)
               
              const wheatherDesc=  json?.weather[0]?.description
                
              if(wheatherDesc.toLowerCase().includes("rain")){
                    setWeatherImage(RainImage)
                }
                else  if(wheatherDesc.toLowerCase().includes("sunny") || wheatherDesc.toLowerCase().includes("clear")){
                    setWeatherImage(SunnyImage)
                }
                else  if(wheatherDesc.toLowerCase().includes("thunderstorm") ){
                    setWeatherImage(SnowImage)
                }
                else  if(wheatherDesc.toLowerCase().includes("cloud")){
                    setWeatherImage(CloudImage)
                }   else  if(wheatherDesc.includes("mist") ||wheatherDesc.toLowerCase().includes("haze") ){
                    setWeatherImage(MistImage)
                }
                
                
            }

            setLoading(false)
            setContainerActive("container active")
        }
    }
    return (
        <HStack w={"100%"} h={"100vh"} bgColor={"#06283d"} justifyContent={"center"}>

            <Box w={["90%", "380px"]} className={conatainerActive} bgColor={"white"} borderRadius={"10px"}>
                <HStack h={"40px"} mx={"5px"} my={"10px"}  >
                    <MdLocationOn size={"35px"} color={"#06283d"} />

                    <Input type="text" value={city} onChange={(e) => {
                        setCity(e.target.value)
                    }} placeholder='Enter Your City Here' outline={"0px"} h={"30px"} border={"0px"} />

                    <Button mx={"10px"} fontSize={"20px"} className='btnColor' onClick={searchCityWeather} size={"sm"} borderRadius={"50%"} padding={"1px"} bgColor={"#dff6ff"}   ><AiOutlineSearch /> </Button>
                </HStack>

          {(loading)?<HStack h={"360px"} justifyContent={"center"} alignItems={"center"}>
          <Spinner size='xl' color='#06283d' />
          </HStack> : <Box> <HStack w={"100%"} justifyContent={"center"} alignItems={"center"}  >
                    <Image w={"230px"} h={"200px"} src={weatherImage} />
                </HStack>

                <VStack justifyContent={"center"} my={"10px"} w={"100%"} direction={"column-reverse"}>
                <Text fontWeight={"semibold"} fontSize={"25px"}>{(weather?.main?.temp)? weather?.weather[0]?.main:""}
                    </Text>
                    <Text fontWeight={"semibold"} fontSize={"30px"}>{(weather?.main?.temp)?(  (Number(weather?.main?.temp) - 273.15).toFixed()+"°C"):" City Not Found !"}
                    </Text>

                   

                    
                </VStack>


                <HStack justifyContent={"space-around"} h={"100px"} alignItems={"center"}>
                    <HStack>

                        <TiWaves size={"20px"} />
                        <Text color={"black"} fontWeight={"semibold"}> Humadity : {weather?.main?.humidity}° </Text>
                    </HStack>
                    <HStack>
                        <WiStrongWind size={"20px"} />
                        <Text color={"black"} fontWeight={"semibold"}>Wind Speed : {weather?.wind?.speed} km/h</Text>
                    </HStack>
                </HStack> </Box>}      
            </Box>



        </HStack>


    )
}

export default WeatherContainer