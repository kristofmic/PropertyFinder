var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    ScrollView,
    Text
  } = React,
  styles,
  Listings;

styles = StyleSheet.create({});

Listings = React.createClass({
  propTypes: {
    listings: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <ScrollView>
        <Text>{this.props.listings}</Text>
      </ScrollView>
    );
  }

});

module.exports = Listings;