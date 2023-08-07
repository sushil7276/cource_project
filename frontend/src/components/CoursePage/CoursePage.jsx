import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import intro from '../../assets/videos/intro.mp4';
import { useState } from 'react';

function CoursePage() {
  const [lectureNumber, setLectureNumber] = useState(0);

  const lectures = [
    {
      _id: 'sadadsd',
      title: 'sample',
      description: 'sample asdad asdasd asdasd asd',
      video: {
        url: 'asdasd',
      },
    },
    {
      _id: 'sadadsd2',
      title: 'sample 2',
      description: 'sample asdad asdasd asdasd asd 2',
      video: {
        url: 'asdasd',
      },
    },
    {
      _id: 'sadadsd3',
      title: 'sample 3',
      description: 'sample asdad asdasd asdasd asd 3',
      video: {
        url: 'asdasd',
      },
    },
  ];

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={intro}
        ></video>

        <Heading
          m={'4'}
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />

        <Heading children="Description" m={'4'} />
        <Text m={'4'} children={`${lectures[lectureNumber].description}`} />
      </Box>

      <VStack>
        {lectures.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
}

export default CoursePage;
