/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var
  React = require('react-native'),
  {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS,
    View
  } = React,
  SearchPage = require('./app/components/search_page'),
  styles,
  PropertyFinder;

styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: '#000',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

PropertyFinder = React.createClass({
  render: function () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage
        }}
      />
    );
  }
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
