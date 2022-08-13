import {Box, Container, Flex, Grid, useBreakpointValue} from "@chakra-ui/react";
// COMPONENTS
import Navbar from "../components/Navbar";
import FloatingNavbar from "../components/FloatingNavbar";
import FeedItem from "../components/FeedItem";
import Suggestions from "../components/Suggestions";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/user";
import {collection, doc, onSnapshot} from "firebase/firestore";
import { db } from '../lib/firebase'


const Home = () => {

    const [posts, setPosts] = useState([])
    const { profile } = useContext(UserContext)
    console.log({ profile })

    const containerMaxWidth = useBreakpointValue({base: 'container.sm', lg: 'container.lg'});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "posts"), (doc) => {
            setPosts(doc.docs.map(d => d.data()))
        });
        return () => unsub()
    }, [])

    return <>
        <Navbar />
        <Container maxW={containerMaxWidth} px={{base: '0', md: '6rem', lg: '4rem'}}>
            <Grid gridTemplateColumns={{base: '1fr', lg: '1fr 1fr'}} gap={'2rem'}>
                <Flex flexDir={'column'} w={'100%'} h={'100vh'} overflowY={'scroll'} gap={'1.5rem'}>
                    {
                        posts.length ? posts.map(post => <FeedItem caption={post.caption || ''} photoUrl={post.imageUrl} userName={post.userName} />)
                            : 'Loading ....'
                    }
                </Flex>
                <Flex w={'100%'} my={'4rem'}>
                    <Suggestions />
                </Flex>
            </Grid>
        </Container>
        <Box
            display={{base: 'block', md: 'none'}}
            pos={'fixed'}
            bottom={'0'}
            zIndex={30}
            w={'100%'}
        >
            <FloatingNavbar />
        </Box>
    </>
}

export default Home;
