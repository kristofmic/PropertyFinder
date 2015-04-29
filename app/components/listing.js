var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    Text,
    Image,
    Component
  } = React,
  styles,
  Listing;

styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

Listing = React.createClass({
  propTypes: {
    listing: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      listing: {}
    };
  },

  render: function() {
    var
      listing = this.props.listing,
      price = listing.price_formatted.split(' ')[0],
      stats = `${listing.bedroom_number} bedroom ${listing.property_type}`,
      bathrooms;

    if (listing.bathroom_number) {
      bathrooms = listing.bathroom_number > 1 ? 'bathrooms' : 'bathroom';

      stats += `, ${listing.bathroom_number} ${bathrooms}`;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: listing.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>£{price}</Text>
          <Text style={styles.title}>{listing.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{listing.summary}</Text>
      </View>
    );
  }

});

module.exports = Listing;