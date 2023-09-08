import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../redux/actions/courseAction';

const CourseCard = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <>
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW={'200px'}
          size={'sm'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            children={'Creator'}
          />
          <Text
            fontFamily={'body'}
            textTransform={'uppercase'}
            children={creator}
          />
        </HStack>

        <Heading
          textAlign={'center'}
          size="xs"
          children={`Lectures - ${lectureCount}`}
          textTransform="uppercase"
        />

        <Heading
          size="xs"
          children={`Views - ${views}`}
          textTransform="uppercase"
        />

        <Stack direction={['column', 'row']} alignItems="center">
          <Link to={`/course/${id}`}>
            <Button colorScheme={'yellow'}>Watch Now</Button>
          </Link>
          <Button
            isLoading={loading}
            variant={'ghost'}
            colorScheme={'yellow'}
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to playlist
          </Button>
        </Stack>
      </VStack>
    </>
  );
};

function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const addToPlaylistHandler = async couseId => {
    alert('Playlist add');
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error } = useSelector(state => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourse(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, category, keyword, error]);

  return (
    <Container minHeight={'95vh'} maxWidth={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" margin={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search course..."
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack overflowX={'auto'} paddingY={'8'}>
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minWidth={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(course => (
            <>
              <CourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                description={course.description}
                views={course.views}
                imageSrc={course.poster.url}
                creator={course.createdBy}
                lectureCount={course.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            </>
          ))
        ) : (
          <Heading opacity={0.5} mt="4" children={'No course found'} />
        )}
      </Stack>
    </Container>
  );
}

export default Courses;
