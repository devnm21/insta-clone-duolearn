import {Avatar, Box, Container, Flex, Text} from "@chakra-ui/react";
import {BsThreeDots} from 'react-icons/bs'
import Image from 'next/image'
import {BsHeart, BsBookmark, BsChat} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'

const FeedItem = ({
    userName,
    photoUrl,
    caption,
                  }) => {
    return <>
        <Flex flexDir={'column'} bg={'white'} boxShadow={'sm'}>

            <Flex alignItems={'center'} justifyContent={'space-between'} px={'10px'} py={'1rem'}>
                <Flex alignItems={'center'} gap={'10px'}>
                    <Avatar name={'Pavan'} size={'sm'} />
                    <Text>{userName}</Text>
                </Flex>
                <BsThreeDots size={'1.5rem'} />
            </Flex>

            <Box w={'100%'} h={'400px'} pos={'relative'}>
                <Image
                    src={photoUrl}
                    alt={'Demo feed image'}
                    layout={'fill'}
                />
            </Box>

            <Container>
                <Flex my={'1rem'} alignItems={'center'} justifyContent={'space-between'}>
                    <Flex alignItems={'center'} gap={'1rem'}>
                        <BsHeart size={'1.5rem'} />
                        <BsChat  size={'1.5rem'} />
                        <FiSend size={'1.5rem'} />
                    </Flex>

                    <BsBookmark size={'1.5rem'}  />
                </Flex>

                <Flex  alignItems={'center'} gap={'5px'}>
                    <Avatar name={'Duolearn'} size={'xs'} />
                    <Text fontSize={'sm'}>Liked by</Text>
                    <Text fontSize={'sm'} fontWeight={'bold'}>the_duolearn</Text>
                    <Text fontSize={'sm'}>and</Text>
                    <Text fontSize={'sm'} fontWeight={'bold'}>100 others</Text>
                </Flex>
                <Text my={2} fontSize={'sm'}>{caption}</Text>
                <Text my={'1rem'} textTransform={'uppercase'} fontSize={'xs'} color={'gray.600'}>6 days ago</Text>
            </Container>

        </Flex>
    </>
}

export default FeedItem;
