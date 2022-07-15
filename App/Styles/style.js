
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
    // marginBottom: 15,
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
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'white'
  },
  camContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
});

export default styles