
import { StyleSheet, Text, View, } from 'react-native';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow:'#e2c943'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipBtn: {
    backgroundColor: colors.blue
  },
  chipBtnSelected: {
    backgroundColor: colors.yellow
  }

});

export default styles