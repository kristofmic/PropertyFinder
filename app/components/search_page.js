var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
  } = React,
  Listings = require('./listings'),
  api = require('../utils/api'),
  styles,
  SearchPage;

styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

SearchPage = React.createClass({
  getInitialState: function() {
    return this.getDefaultState();
  },

  getDefaultState: function () {
    return  {
      searchString: 'London',
      isLoading: false,
      message: ''
    };
  },

  handleTextChange: function (text) {
    this.setState({
      searchString: text
    });
  },

  handleSearch: function() {
    this.setState({
      isLoading: true
    });

    api.fetchListings({
      place_name: this.state.searchString,
      page: 1,
      country: 'uk'
    })
      .then(listings => {
        if (!listings || !listings.length) {
          return this.setState({
            isLoading: false,
            message: 'Location not recognized. Please try again.'
          });
        }

        this.props.navigator.push({
          title: this.state.searchString + ' Listings',
          component: Listings,
          passProps: { listings }
        });

        this.setState(this.getDefaultState());
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          message: 'Something bad happened: ' + e
        });
      });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (this.state.isLoading !== nextState.isLoading) ||
           (this.state.message !== nextState.message);
  },

  render: function () {
    var
      loadingEl,
      messageEl;

    if (this.state.isLoading) {
      loadingEl = (
        <ActivityIndicatorIOS
          animating={true}
          size='large'
          color='#656565'
        />
      );
    }

    if (this.state.message) {
      messageEl = (
        <Text style={styles.description}>{this.state.message}</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by city or postcode, or search near your location.
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search via name or postcode"
            value={this.state.searchString}
            onChangeText={this.handleTextChange}
          />
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.handleSearch}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('image!house_xl')} style={styles.image}/>
        {loadingEl}
        {messageEl}
      </View>
    );
  }
});

module.exports = SearchPage;