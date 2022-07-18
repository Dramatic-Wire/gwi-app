import { Box, Heading } from 'native-base';
import styles from '../Styles/style';



export default function ScreenTitle({ children }) {
  return (
    <Box variant='pageTitle'>
      <Heading style={styles.pageTitle}>{children}</Heading>
            </Box>
    
  );
}


