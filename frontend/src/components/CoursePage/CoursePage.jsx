import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/courseAction';
import Loader from '../Layout/Loader/Loader';

function CoursePage({ user }) {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.courses);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseLectures(id));
  }, [dispatch, id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Heading
              m={'4'}
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
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
        </>
      ) : (
        <Heading children={'No lectures'} />
      )}
    </Grid>
  );
}

export default CoursePage;
