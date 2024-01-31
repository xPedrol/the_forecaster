import type {NextPage} from 'next';
import Layout from "../components/Layout";
import {
    Alert,
    Badge,
    Box, Button,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Select,
    Spinner,
    Stack,
    Text,
    Tooltip, useColorMode, useColorModeValue
} from "@chakra-ui/react";
import {useQuery} from 'react-query';
import {getLast15Days, getLast15DaysByCityName} from "../services/forecast";
import {Icon} from "@chakra-ui/icons";
import dayjs from "dayjs";
import {BsCheckCircleFill, BsCloudRain, BsFillGeoAltFill, BsSunrise, BsSunset} from "react-icons/bs";
import {TbTemperature} from "react-icons/tb";
import {TiWeatherWindy} from "react-icons/ti";
import {IoWaterOutline} from "react-icons/io5";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {useEffect, useState} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {getCitiesByCountryAndState, getCountries, getStatesByCountry} from "../services/geoLocation";
import {FaRegMoon, FaRegSun} from "react-icons/fa";

const Home: NextPage = () => {
    const {toggleColorMode, colorMode} = useColorMode();
    const weatherCardTextColor = useColorModeValue('gray.700', 'gray.300');
    const cityCardTextColor = useColorModeValue('gray.600', 'gray.400');
    const [longitude, setLongitude] = useState<number>();
    const [latitude, setLatitude] = useState<number>();
    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        });
    }, []);
    const {
        data: forecast,
        isLoading: isLoadingForecast,
        isFetched: isForecastFetched
    } = useQuery(['forecast_last_15_days', latitude, longitude, city], async () => {
        console.warn('ent');
        let data;
        if (city) {
            data = await getLast15DaysByCityName(city);
        } else {
            data = await getLast15Days(latitude, longitude);
        }
        return data.data;
    }, {
        enabled: !!(latitude && longitude) || !!city,
        refetchOnWindowFocus: false
    });
    const {
        data: countries,
        isLoading: isLoadingCountries
    } = useQuery('countries', async () => {
        const data = await getCountries();
        return data.data;
    }, {
        refetchOnWindowFocus: false,
        refetchInterval: false
    });
    const {
        data: states,
        isLoading: isLoadingStates
    } = useQuery(['states', country], async () => {
        const data = await getStatesByCountry(country);
        return data.data;
    }, {
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: !!country,
    });
    const {
        data: cities,
        isLoading: isLoadingCities
    } = useQuery(['cities', country, state], async () => {
        const data = await getCitiesByCountryAndState(country, state);
        return data.data;
    }, {
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: !!country && !!state,
    });

    const onCountryChange = (e: any) => {
        setCountry(e.target.value);
        setState('');
        clearCity();
        // refetchStates();
    };

    const onStateChange = (e: any) => {
        setState(e.target.value);
        clearCity();
    };

    const onCityChange = (e: any) => {
        setCity(e.target.value);
        setLongitude(undefined);
        setLatitude(undefined);
    };
    const clearCity = () => {
        setCity('');
        setLongitude(undefined);
        setLatitude(undefined);
    };

    return (
        <Layout title={'The Forecaster'}>
            <Flex justifyContent={'center'} mt={{base: 50, md: 100}} flexDirection={'column'}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'}>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl>
                            <FormLabel>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>País</Text>
                                    {isLoadingCountries && <FormHelperText>Carregando...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select onChange={onCountryChange} defaultValue={''} disabled={isLoadingCountries}>
                                <option disabled={true} value={''}>Selecione um país...</option>
                                {countries && countries.map((country: any) =>
                                    <option key={country.iso2} value={country.iso2}>{country.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl>
                            <FormLabel>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>Estado/Província</Text>
                                    {isLoadingStates && <FormHelperText>Carregando...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select onChange={onStateChange} defaultValue={''} disabled={!country || isLoadingStates}>
                                <option value={''}>Selecione um estado/província...</option>
                                {states && states.map((state: any) =>
                                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl>
                            <FormLabel>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>Município</Text>
                                    {isLoadingCities && <FormHelperText>Carregando...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select defaultValue={''} disabled={!state || isLoadingCities} onChange={onCityChange}>
                                <option value={''}>Selecione um município...</option>
                                {cities && cities.map((city: any) =>
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                </Grid>
                <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'} mt={5}>
                    <GridItem colSpan={{base: 12}}>
                        <Alert status="success" variant="solid" backgroundColor={'teal.400'} display={'block'}>
                            <Flex justifyContent={'space-between'} alignItems={'center'}
                                  flexDirection={{base: 'column', md: 'row'}}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Icon as={BsCheckCircleFill} me={2}/>
                                    <Box>
                                        <Text>A previsão padrão usará sua localização atual se você der permissão para
                                            acessá-la.</Text>
                                        <Text fontSize={'sm'}>Se você estiver em um dispositivo móvel, é necessário
                                            ativar a localização do dispositivo e recarregar a página.</Text>
                                    </Box>
                                </Box>
                                <Tooltip label={'Change page color'}>
                                    <Button onClick={toggleColorMode} colorScheme={'teal'} variant="solid"
                                            mt={{base: 4, md: 0}}>
                                        {colorMode === 'dark' ?
                                            <Icon as={FaRegSun}/> : <Icon as={FaRegMoon}/>
                                        }
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Alert>
                    </GridItem>
                    {forecast &&
                        <GridItem colSpan={12} mt={7}>
                            <Stack spacing={4} direction={{base: 'column', lg: 'row'}}>
                                <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'}>
                                    <GridItem colSpan={{base: 12, lg: 5}}>
                                        <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'}
                                              position={'sticky'} top={5}>
                                            <GridItem colSpan={{base: 12, md: 6, lg: 12}}>
                                                <Box borderWidth="1px" borderRadius="lg" position={'sticky'} top={5}
                                                     overflow="hidden">
                                                    <Box p="6">
                                                        <Box display="flex" alignItems="center"
                                                             justifyContent={'space-between'}>
                                                            <Box display="flex">
                                                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                                                    {forecast.city.name}
                                                                </Badge>
                                                            </Box>
                                                            <Text
                                                                as="h6"
                                                                lineHeight="tight"
                                                                color={cityCardTextColor}
                                                                fontWeight="semibold"
                                                                letterSpacing="wide"
                                                                fontSize="xs"
                                                                textTransform="uppercase"
                                                                noOfLines={1}>
                                                                {forecast.city.population && forecast.city.population > 0 ?
                                                                    <>
                                                                        {forecast.city.population}
                                                                    </>
                                                                    :
                                                                    <>N/A</>
                                                                } &bull; POPULAÇÃO</Text>
                                                        </Box>

                                                        <Divider my={2}/>
                                                        <Stack direction={['column', 'row']}
                                                               justifyContent={'space-between'}>
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                <Icon as={BsSunrise} me={2} fontSize={'x-large'}/>
                                                                {dayjs.unix(forecast.city.sunrise).format('HH:mm ')}
                                                                <Box as="span" color={cityCardTextColor} fontSize="sm">
                                                                    &bull; Nascer do sol
                                                                </Box>
                                                            </Box>
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                <Icon as={BsSunset} me={2} fontSize={'x-large'}/>
                                                                {dayjs.unix(forecast.city.sunset).format('HH:mm ')}
                                                                <Box as="span" color={cityCardTextColor} fontSize="sm">
                                                                    &bull; Por do sol
                                                                </Box>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={{base: 12, md: 6, lg: 12}}>
                                                <Box borderWidth="1px" borderRadius="lg" position={'sticky'} top={145}
                                                     overflow="hidden">
                                                    <Box p="6">
                                                        <Box display="flex" alignItems="center"
                                                             justifyContent={'space-between'}>
                                                            <Box display="flex" alignItems={'center'}>
                                                                <Icon as={BsFillGeoAltFill} me={2}
                                                                      fontSize={'x-large'}/>
                                                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                                                    Sobre a localização
                                                                </Badge>
                                                            </Box>
                                                            <Text
                                                                as="h6"
                                                                lineHeight="tight"
                                                                color={cityCardTextColor}
                                                                fontWeight="semibold"
                                                                letterSpacing="wide"
                                                                fontSize="xs"
                                                                textTransform="uppercase"
                                                                noOfLines={1}>{forecast.city.timezone} &bull; FUSO
                                                                HORÁRIO</Text>
                                                        </Box>

                                                        <Divider my={2}/>
                                                        <Stack direction={['column', 'row']}
                                                               justifyContent={'space-between'}>
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                {forecast.city.coord.lon}
                                                                <Box as="span" color={cityCardTextColor} fontSize="sm">
                                                                    &bull; Longitude
                                                                </Box>
                                                            </Box>
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                {forecast.city.coord.lat}
                                                                <Box as="span" color={cityCardTextColor} fontSize="sm">
                                                                    &bull; Latitude
                                                                </Box>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </GridItem>
                                        </Grid>
                                    </GridItem>
                                    <GridItem colSpan={{base: 12, lg: 7}}>
                                        <Box>
                                            <Heading fontSize={'sm'}>Previsão para os próximos 15 dias</Heading>
                                            <Divider mt={1} mb={5}/>
                                            <Grid templateColumns={'repeat(12,1fr)'} gap={6}>
                                                {forecast.list.map((item: any) => (
                                                    <GridItem colSpan={{base: 12, sm: 6, md: 3, lg: 4, xl: 3}}
                                                              key={item.dt_txt}>
                                                        <Box py={3} borderRadius="lg">
                                                            <Box display="flex" alignItems="center"
                                                                 justifyContent={'space-between'}>
                                                                <Stack direction={'column'} spacing={0}
                                                                       justifyContent={'center'}>
                                                                    <Box

                                                                        color={weatherCardTextColor}
                                                                        fontWeight="semibold"
                                                                        letterSpacing="wide"
                                                                        fontSize="xs"
                                                                        textTransform="uppercase"
                                                                    >
                                                                        {dayjs(item.dt_txt).format('DD/MM - HH:mm')}
                                                                    </Box>
                                                                    <Text color="gray.500"
                                                                          fontWeight="semibold"
                                                                          letterSpacing="wide"
                                                                          fontSize="x-small"
                                                                          textTransform="uppercase">{item.weather[0].description}</Text>
                                                                </Stack>
                                                                {/*<Tooltip label="Detalhes">*/}
                                                                {/*    <Box cursor={'pointer'}>*/}
                                                                {/*        <Icon as={AiOutlineInfoCircle}/>*/}
                                                                {/*    </Box>*/}
                                                                {/*</Tooltip>*/}
                                                            </Box>

                                                            <Divider my={2}/>
                                                            <Stack direction={['column']}
                                                                   justifyContent={'space-between'}>
                                                                <Tooltip label="Temperatura">
                                                                    <Box display={'flex'} alignItems={'center'}>
                                                                        <Icon as={TbTemperature} me={2}
                                                                              fontSize={'large'}/>
                                                                        {(item.main.temp).toFixed(2)}°C
                                                                    </Box>
                                                                </Tooltip>
                                                                <Tooltip label="Probabilidade de chuva">
                                                                    <Box display={'flex'} alignItems={'center'}>
                                                                        <Icon as={BsCloudRain} me={2}
                                                                              fontSize={'large'}/>
                                                                        {!item.pop ?
                                                                            <small>Sem resultado</small>
                                                                            : `${Math.round(item.pop * 100)} %`}

                                                                    </Box>
                                                                </Tooltip>
                                                                <Tooltip label="Humidade">
                                                                    <Box display={'flex'} alignItems={'center'}>
                                                                        <Icon as={IoWaterOutline} me={2}
                                                                              fontSize={'large'}/>
                                                                        {item.main.humidity}%
                                                                    </Box>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Box>
                                                    </GridItem>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </Stack>
                        </GridItem>
                    }
                    {!forecast && isLoadingForecast &&
                        <GridItem colSpan={12} mt={7}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Spinner color={'teal'} size={'lg'}/>
                                <Text
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ms={2}
                                    textTransform="uppercase">Loading...</Text>
                            </Box>
                        </GridItem>
                    }
                    {!forecast && !isLoadingForecast && isForecastFetched &&
                        <GridItem colSpan={12} mt={7}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Spinner color={'teal'} size={'lg'}/>
                                <Text
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ms={2}
                                    textTransform="uppercase">Not Found</Text>
                            </Box>
                        </GridItem>
                    }
                    {!forecast && !isLoadingForecast && !isForecastFetched &&
                        <GridItem colSpan={12} mt={7}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Icon as={BiSearchAlt} color={'teal'} fontSize={'xx-large'}/>
                                <Text
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ms={2}
                                    textTransform="uppercase">Escolha um local para ver a previsão do tempo</Text>
                            </Box>
                        </GridItem>
                    }
                </Grid>
            </Flex>
        </Layout>
    );
};

export default Home;
