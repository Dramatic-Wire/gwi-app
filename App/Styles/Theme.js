import { createTheme } from '@rneui/themed';

const colors = {
  white: '#fbf2e6',
  blue: '#1cadc6',
  yellow:'#e2c943'
}

const Theme = createTheme({
  lightColors: {
    primary: '#1cadc6',
    secondary: '#e2c943',
    background: '#fbf2e6'
  },

  Button: {
  },

  ButtonGroup: {
  buttonStyle:{
        width: 50,
        borderRadius: 20,
        backgroundColor: "red",
        marginRight: 10
      },
  buttonContainerStyle:{
        backgroundColor: "tranparent",
        border: "none"
      },
  containerStyle:{
        backgroundColor: "tranparent",
        border: "none"
    },
  selectedButtonStyle: {backgroundColor:'green'},
  }
});

export default Theme
