var
  React = require('react-native'),
  {
    StyleSheet,
    ListView,
    View,
    Text,
    TouchableHighlight,
    Image
  } = React,
  _find = require('lodash/collection/find'),
  Listing = require('./listing'),
  styles,
  Listings;

styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

Listings = React.createClass({
  propTypes: {
    listings: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    var
      dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => { return r1.guid !== r2.guid; }
      });

    return {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  },

  handleRowPress: function (guid) {
    var
      listing = _find(this.props.listings, { guid });

    this.props.navigator.push({
      title: listing.title.slice(0, 10) + '...',
      component: Listing,
      passProps: { listing }
    });
  },

  renderRow: function (rowData, sectionID, rowID) {
    var
      price = rowData.price_formatted.split(' ')[0];

    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={this.handleRowPress.bind(this, rowData.guid)}
      >
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>
                £{price}
              </Text>
              <Text style={styles.title} numberOfLines={1}>
                {rowData.title}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }

});

module.exports = Listings;