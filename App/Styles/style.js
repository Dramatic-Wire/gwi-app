
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
    height: '100%'
  },


  count: {
    
  },

  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize:18
  },

  section: {
    marginBottom: 10,
  },

  btn: {},

  chipBtn: {
    backgroundColor: colors.blue,
    marginRight:10,
  },
  chipBtnSelected: {
    backgroundColor: colors.yellow,
    marginRight:10,
  }

});

export default styles