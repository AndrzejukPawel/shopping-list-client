import { StyleSheet } from "react-native";

export const primaryColor = '#f4511e';
export const secondaryColor = '#fa845c';
export const backgroundColor = '#ffaa8f';
export const successColor = '#58bf69';

export const textStyle = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mainLarge: {
    fontSize: 48,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  main: {
    fontSize: 32,
    color: 'white',
    textAlignVertical: 'center',
  },
  secondary: {
    fontSize: 24,
    color: 'white',
    textAlignVertical: 'center',
  },
  small: {
    fontSize: 16,
    color: 'white',
    textAlignVertical: 'center',
  },
  inputText: {
    fontSize: 24,
    color: 'black',
    textAlignVertical: 'center',
    paddingVertical: 4,
  },
  button: {
    fontSize: 24,
    color: 'white',
    textAlignVertical: 'center',
    paddingVertical: 4,
  },
  shadow: {
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  }
});

export const buttonStyle = StyleSheet.create({
  generic: {
    borderRadius: 10,
    backgroundColor: primaryColor,
    marginVertical: 5,
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 32,
  }
});

export const listItemStyle = StyleSheet.create({
  simple: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: '#ffffff7f',
    marginHorizontal: 10,
    marginVertical: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})

export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    height: '25%',
    width: '90%',
    margin: 15,
  },
  background: { flex: 1, verticalAlign: 'bottom' },
  backgroundImage: { borderRadius: 40 },
  buttonText: {
    height: '40%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'space-between',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: { height: 3, width: 3 },
    textShadowRadius: 10
  }
});

export const groceryListsStyle = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
  },
  list: {
  },
  listContent: {
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 40,
    backgroundColor: '#ffffff9f',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  itemName: {
    fontSize: 40,
    color: 'black'
  },
  itemDateLabel: {
    width: '35%',
    color: 'black',
  },
  itemDate: {
    color: 'black',
  },
  itemButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#0000003f',
    marginVertical: 5,
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  itemButtonText: {
    textAlign: 'center',
    color: 'black',
  }
});

export const groceryItemSelectionStyle = StyleSheet.create({
  productsButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  productsButtonText: {
    textAlign: 'left'
  },
  productsRowText: {
    textAlign: 'left'
  },

  unitsButton: {
    flex: 0.7,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    textAlign: 'left'
  },
  unitsButtonText: {
    textAlign: 'left'
  },
  unitsRowText: {
    textAlign: 'left'
  },

  unitsTextInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    flex: 0.3,
    textAlign: 'left',
    color: 'black',
    marginLeft: 4
  },
  icon: {
    color: 'black',
    fontSize: 32
  },
  addButton: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    borderTopLeftRadius: 1112,
    borderTopRightRadius: 112,
  },
  addButtonImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  addButtonImageActive: {
    backgroundColor: '#7ffa86',
  },
  addButtonImageInactive: {
    backgroundColor: '#bababa',
  }
});
