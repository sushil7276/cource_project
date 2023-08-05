import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { TiSocialLinkedin } from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import { AiOutlineGlobal } from 'react-icons/ai';

function Footer() {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="Sushil Babar"
            color={'yellow.400'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a
            href="https://www.linkedin.com/in/sushil-babar-3a6618237/"
            target={'blank'}
          >
            <TiSocialLinkedin />
          </a>

          <a href="https://github.com/sushil7276" target={'blank'}>
            <DiGithub />
          </a>

          <a
            href="https://sushil7276.github.io/my-resume-master/"
            target={'blank'}
          >
            <AiOutlineGlobal />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
}

export default Footer;
