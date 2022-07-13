
import { StyleSheet, Text, View, } from 'react-native';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow: '#e2c943',
  mint: '#a6d4b6'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },

  loyaltyCard: {
     marginBottom: 10,
    backgroundColor: colors.mint,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
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
    backgroundColor: colors.white,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,

  },

  btn: {},

  chipBtn: {
    borderRadius:20
  },
  chipBtnSelected: {
    backgroundColor: colors.yellow,
    margin: 5,
    border: 'solid',
    borderColor: colors.yellow,
    borderWidth: 2
  },
  chipText: {
    color: colors.blue
  },
  chipSelectedText: {
    color: colors.blue
  }
});

export default styles