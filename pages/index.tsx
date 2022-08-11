import type {NextPage} from 'next';
import Layout from "../components/Layout";
import {
    Badge,
    Box,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem, Heading,
    Input,
    Select,
    Stack,
    Text, Tooltip
} from "@chakra-ui/react";
import {
    useQuery
} from 'react-query';
import {last15Days} from "../services/forecast";
import {statesConstant} from "../constants/states.constant";
import {CalendarIcon, InfoOutlineIcon, MoonIcon, StarIcon, SunIcon} from "@chakra-ui/icons";
import dayjs from "dayjs";

const Home: NextPage = () => {
    const {data} = useQuery('forecast_last_15_days', async () => {
        const data = await last15Days("-19.58106000", "-42.64953000");
        return data.data;
    });
    const states = statesConstant;
    console.warn(data);
    return (
        <Layout title={'The Forecaster'}>
            <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={6} width={'100%'}>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel>
                                State
                            </FormLabel>
                            <Select>
                                <option disabled={true}>Select a State...</option>
                                {states.map((state) =>
                                    <option key={state.code} value={state.code}>{state.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel>
                                City
                            </FormLabel>
                            <Input/>
                        </FormControl>
                    </GridItem>
                    {data &&
                        <GridItem colSpan={12}>
                            <Stack spacing={4} direction={{base: 'column', lg: 'row'}}>
                                <Box>
                                    <Box minW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
                                         position={'sticky'} top={5}>
                                        <Box p="6">
                                            <Box display="flex" alignItems="baseline">
                                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                                    {data.city.name}
                                                </Badge>
                                                <Box
                                                    color="gray.500"
                                                    fontWeight="semibold"
                                                    letterSpacing="wide"
                                                    fontSize="xs"
                                                    textTransform="uppercase"
                                                    ml="2"
                                                >
                                                    MG &bull; {data.city.country}
                                                </Box>
                                            </Box>

                                            <Divider my={2}/>
                                            <Stack direction={['column', 'row']} justifyContent={'space-between'}>
                                                <Box>
                                                    <SunIcon me={2}/>
                                                    5h
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Nascer do sol
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <MoonIcon me={2}/>
                                                    16h
                                                    <Box as="span" color="gray.600" fontSize="sm">
                                                        &bull; Por do sol
                                                    </Box>
                                                </Box>
                                            </Stack>

                                            <Box display="flex" mt="2" alignItems="center">
                                                <CalendarIcon color={'teal.500'}/>
                                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                                    <Box
                                                        mt="1"
                                                    >
                                                        <Text
                                                            as="h6"
                                                            lineHeight="tight"
                                                            noOfLines={1}>{data.city.population} habitantes</Text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box w={'100%'}>
                                    <Heading fontSize={'sm'}>Previsão para os próximos 15 dias</Heading>
                                    <Divider mt={1} mb={5}/>
                                    <Grid templateColumns={'repeat(12,1fr)'} gap={6} overflowY={'auto'} height={'60vh'}>
                                        {data.list.map((item: any, index: number) => (
                                            <GridItem colSpan={{base: 6, md: 3, lg: 4, xl: 3}} key={index}>
                                                <Box p={6} borderRadius="lg">
                                                    <Box display="flex" alignItems="center"
                                                         justifyContent={'space-between'}>
                                                        <Box
                                                            color="gray.500"
                                                            fontWeight="semibold"
                                                            letterSpacing="wide"
                                                            fontSize="xs"
                                                            textTransform="uppercase"
                                                            ml="2"
                                                        >
                                                            {dayjs(item.dt_txt).format('DD/MM/YYYY HH:mm')}
                                                        </Box>
                                                        <Tooltip label="Show more">
                                                            <InfoOutlineIcon cursor={'pointer'}/>
                                                        </Tooltip>
                                                    </Box>

                                                    <Divider my={2}/>
                                                    <Stack direction={['column']} justifyContent={'space-between'}>
                                                        <Box>
                                                            <SunIcon me={2}/>
                                                            {item.main.temp}°C
                                                        </Box>
                                                        <Box>
                                                            <MoonIcon me={2}/>
                                                            {item.main.pressure} hPa
                                                        </Box>
                                                        <Box>
                                                            <MoonIcon me={2}/>
                                                            {item.main.humidity}%
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Box>
                            </Stack>
                        </GridItem>
                    }
                </Grid>
            </Flex>
        </Layout>
    );
};

export default Home;
