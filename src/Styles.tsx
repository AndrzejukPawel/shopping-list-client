import { StyleSheet } from "react-native";

export const headerColor = '#f4511e';
export const mainBackgroundColor = '#ffaa8f';

export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: mainBackgroundColor,
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
    backgroundColor: mainBackgroundColor,
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


export const groceryListItemStyle = StyleSheet.create({
  container: {
    backgroundColor: mainBackgroundColor,
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
  boughtBackground: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 40,
    backgroundColor: '#49cc6c9f',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  itemName: {
    fontSize: 32,
    color: 'black'
  },
  itemDateLabel: {
    color: 'black',
    flex: 0.25,
  },
  itemDate: {
    color: 'black',
  },
  itemButton: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: '#0000003f',
    marginVertical: 0,
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 80,
    marginHorizontal: 5,
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
  },
  addButtonImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: '#7ffa86',
  }
});
