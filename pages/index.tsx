import type {NextPage} from 'next';
import Layout from "../components/Layout";
import {Flex, FormControl, FormLabel, Grid, GridItem, Input, Text} from "@chakra-ui/react";
import {
  useQuery
} from 'react-query';
import {last15Days} from "../services/forecast";

const Home: NextPage = () => {
  const query = useQuery('forecast_last_15_days', async () => {
    const data = await last15Days();
    return data.data;
  });
  console.warn(query.data);
  return (
  <Layout title={'The Forecaster'}>
   <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}>
     <Grid templateColumns={'repeat(12,1fr)'} gap={6} width={'100%'}>
       <GridItem colSpan={6}>
         <FormControl>
           <FormLabel>
             State
           </FormLabel>
           <Input/>
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
     </Grid>
   </Flex>
  </Layout>
  )
}

export default Home
