import type {NextPage} from 'next';
import Layout from "../components/Layout";
import {
    Alert,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    FormControl, FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Select,
    Spinner,
    Stack,
    Text,
    Tooltip
} from "@chakra-ui/react";
import {useQuery} from 'react-query';
import {getLast15Days} from "../services/forecast";
import {Icon} from "@chakra-ui/icons";
import dayjs from "dayjs";
import {BsCheckCircleFill, BsFillGeoAltFill, BsSunrise, BsSunset} from "react-icons/bs";
import {TbTemperature} from "react-icons/tb";
import {TiWeatherWindy} from "react-icons/ti";
import {IoWaterOutline} from "react-icons/io5";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {useEffect, useState} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {getCitiesByCountryAndState, getCountries, getStatesByCountry} from "../services/geoLocation";
import {string} from "prop-types";

type FormData = {
    country: string;
    state: string;
    city: string;
}
const Home: NextPage = () => {
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
        isFetched: isForecastFetched,
        refetch: refetchForecast
    } = useQuery('forecast_last_15_days', async () => {
        const data = await getLast15Days(latitude, longitude);
        return data.data;
    }, {
        enabled: !!latitude && !!longitude,
        refetchOnWindowFocus: false
    });
    const {
        data: countries,
        isLoading: isLoadingCountries,
        isFetched: isCountriesFetched
    } = useQuery('countries', async () => {
        const data = await getCountries();
        return data.data;
    }, {
        refetchOnWindowFocus: false,
        refetchInterval: false
    });
    const {
        data: states,
        isLoading: isLoadingStates,
        isFetched: isStatesFetched,
        refetch: refetchStates
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
        isLoading: isLoadingCities,
        isFetched: isCitiesFetched,
        refetch: refetchCities
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
        // refetchStates();
    };

    const onStateChange = (e: any) => {
        setState(e.target.value);
        setCity('');
    };

    const onCityChange = (e: any) => {
        setCity(e.target.value);
    };

    return (
        <Layout title={'The Forecaster'}>
            <Flex justifyContent={'center'} mt={{base: 50, md: 100}} flexDirection={'column'}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'}>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl>
                            <FormLabel>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>Country</Text>
                                    {isLoadingCountries && <FormHelperText>Loading...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select onChange={onCountryChange} defaultValue={''} disabled={isLoadingCountries}>
                                <option disabled={true} value={''}>Select a Country...</option>
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
                                    <Text>State</Text>
                                    {isLoadingStates && <FormHelperText>Loading...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select onChange={onStateChange} defaultValue={''} disabled={!country || isLoadingStates}>
                                <option value={''}>Select a State...</option>
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
                                    <Text>City</Text>
                                    {isLoadingCities && <FormHelperText>Loading...</FormHelperText>}
                                </Flex>
                            </FormLabel>
                            <Select defaultValue={''} disabled={!state || isLoadingCities}>
                                <option value={''}>Select a City...</option>
                                {cities && cities.map((city: any) =>
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                </Grid>
                <Grid templateColumns={'repeat(12,1fr)'} gap={3} width={'100%'} mt={5}>
                    <GridItem colSpan={{base: 12}}>
                        <Alert status="success" variant="solid" backgroundColor={'teal.400'} display={'block'}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Icon as={BsCheckCircleFill} me={2}/>
                                <Box>
                                    <Text>The standard forecast will use your current location if you give permission to
                                        access it.</Text>
                                    <Text fontSize={'sm'}>If you are on a mobile device, you will need to active the
                                        devide location and reload the page.</Text>
                                </Box>
                            </Box>
                        </Alert>
                    </GridItem>
                    {forecast &&
                        <GridItem colSpan={12} mt={7}>
                            <Stack spacing={4} direction={{base: 'column', lg: 'row'}}>
                                <Stack justifyContent={{base: 'center', lg: 'normal'}}
                                       direction={{base: 'column', md: 'row', lg: 'column'}} spacing={4}>
                                    <Box minW="sm" borderWidth="1px" borderRadius="lg" position={'sticky'} top={5}
                                         overflow="hidden">
                                        <Box p="6">
                                            <Box display="flex" alignItems="center" justifyContent={'space-between'}>
                                                <Box display="flex">
                                                    <Badge borderRadius="full" px="2" colorScheme="teal">
                                                        {forecast.city.name}
                                                    </Badge>
                                                </Box>
                                                <Text
                                                    as="h6"
                                                    lineHeight="tight"
                                                    color="gray.500"
                                                    fontWeight="semibold"
                                                    letterSpacing="wide"
                                                    fontSize="xs"
                                                    textTransform="uppercase"
                                                    noOfLines={1}>{forecast.city.population} &bull; population</Text>
                                            </Box>

                                            <Divider my={2}/>
                                            <Stack direction={['column', 'row']} justifyContent={'space-between'}>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Icon as={BsSunrise} me={2} fontSize={'x-large'}/>
                                                    {dayjs.unix(forecast.city.sunrise).format('HH:mm ')}
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Sunrise
                                                    </Box>
                                                </Box>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Icon as={BsSunset} me={2} fontSize={'x-large'}/>
                                                    {dayjs.unix(forecast.city.sunset).format('HH:mm ')}
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Sunset
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                    <Box minW="sm" borderWidth="1px" borderRadius="lg" position={'sticky'} top={145}
                                         overflow="hidden">
                                        <Box p="6">
                                            <Box display="flex" alignItems="center" justifyContent={'space-between'}>
                                                <Box display="flex" alignItems={'center'}>
                                                    <Icon as={BsFillGeoAltFill} me={2} fontSize={'x-large'}/>
                                                    <Badge borderRadius="full" px="2" colorScheme="teal">
                                                        About location
                                                    </Badge>
                                                </Box>
                                                <Text
                                                    as="h6"
                                                    lineHeight="tight"
                                                    color="gray.500"
                                                    fontWeight="semibold"
                                                    letterSpacing="wide"
                                                    fontSize="xs"
                                                    textTransform="uppercase"
                                                    noOfLines={1}>{forecast.city.timezone} &bull; timezone</Text>
                                            </Box>

                                            <Divider my={2}/>
                                            <Stack direction={['column', 'row']} justifyContent={'space-between'}>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    {forecast.city.coord.lon}
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Longitude
                                                    </Box>
                                                </Box>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    {forecast.city.coord.lat}
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Latitude
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </Stack>
                                <Box w={'100%'}>
                                    <Heading fontSize={'sm'}>Forecast for the next 15 days</Heading>
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
                                                                color="gray.700"
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
                                                        <Tooltip label="Show more">
                                                            <Box cursor={'pointer'}>
                                                                <Icon as={AiOutlineInfoCircle}/>
                                                            </Box>
                                                        </Tooltip>
                                                    </Box>

                                                    <Divider my={2}/>
                                                    <Stack direction={['column']} justifyContent={'space-between'}>
                                                        <Tooltip label="Temperature">
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                <Icon as={TbTemperature} me={2} fontSize={'large'}/>
                                                                {(item.main.temp - 273.16).toFixed(2)}°C
                                                            </Box>
                                                        </Tooltip>
                                                        <Tooltip label="Pressure">
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                <Icon as={TiWeatherWindy} me={2} fontSize={'large'}/>
                                                                {item.main.pressure} hPa
                                                            </Box>
                                                        </Tooltip>
                                                        <Tooltip label="Humidity">
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                <Icon as={IoWaterOutline} me={2} fontSize={'large'}/>
                                                                {item.main.humidity}%
                                                            </Box>
                                                        </Tooltip>
                                                    </Stack>
                                                </Box>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Box>
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
                                    textTransform="uppercase">Choose a location to see the weather</Text>
                            </Box>
                        </GridItem>
                    }
                </Grid>
            </Flex>
        </Layout>
    );
};

export default Home;
