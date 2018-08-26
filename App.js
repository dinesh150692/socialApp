import React from 'react';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { Animated, Easing, View, NetInfo} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

/* Action Imports */
import updateNetworkInfo from './src/redux/actions/networkActions';

/* Page Imports */
import Posts from './src/pages/posts';
import Albums from './src/pages/albums';
import PostDetails from './src/pages/postDetails';
import AlbumDetails from './src/pages/albumDetails';

const appColor = '#673ab7';
const navigationOptions = (navigation, title) => ({
  title: title,
  tabBarVisible:  false,
  headerStyle: {
    backgroundColor: appColor,
    paddingRight: 10, 
    paddingLeft: 10,
  },
  headerBackTitle: 'back',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto'
  }
});

const stackOptions = {
  cardStyle: {
    backgroundColor: 'white',
    opacity: 1
  },
  transitionConfig:  () => ({
    containerStyle: {
      backgroundColor: 'white',
    },
    // transitionSpec: {
    //   duration: 500,
    //   easing: Easing.inOut(Easing.linear),
    //   timing: Animated.timing,
    //   useNativeDriver: true,
    // },
    // screenInterpolator: sceneProps => {
    //   const { layout, position, scene } = sceneProps;
    //   let {index}  = scene;
    //     const opacity = position.interpolate({
    //       inputRange: [index - 1, index - 0.5, index],
    //       outputRange: [0, 0.5, 1],
    //     });
    //   return {opacity}
    // }
  })
}

const PostStack = StackNavigator({
    Post: {screen: Posts, navigationOptions:({header: null})},
    PostDetails: {screen: PostDetails, navigationOptions:({navigation}) => (navigationOptions(navigation, 'Post Details'))},
  },{initialRouteName: 'Post',...stackOptions}
);

const AlbumStack = StackNavigator(
  {
    Albums: {screen: Albums, navigationOptions:({header: null})},
    AlbumDetails: {screen: AlbumDetails, navigationOptions:({navigation}) => (navigationOptions(navigation, 'Album Details'))}
  },{initialRouteName: 'Albums',...stackOptions},
);

const tabNavigationOption = (navigation, title) => ({
    title: navigation.state.routeName,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Posts') {
        iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
      }else if (routeName === 'Albums') {
        iconName = `ios-albums${focused ? '' : '-outline'}`;
      }
      return <Icon name={iconName} style={{ fontSize: 20, color: tintColor}}/>;
    },
});

const App = TabNavigator(
  {
    Posts: { screen: PostStack, navigationOptions:({navigation}) => (tabNavigationOption(navigation, 'Posts')) },
    Albums: { screen: AlbumStack, navigationOptions:({navigation}) => (tabNavigationOption(navigation, 'Albums'))},
  }, 
  {
    tabBarOptions: {
      activeTintColor: appColor,
      inactiveTintColor: appColor,
      showIcon: true,
      showLabel:true,
      labelStyle:{
        fontSize: 15,
        fontFamily: 'Roboto'
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: appColor
      }
    },
    initialRouteName: 'Posts',
    backBehavior: 'initialRoute',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    removeClippedSubviews: true,
    animationEnabled: false,
    swipeEnabled: false,
  }
);

class Root extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      mount: false
    }
    this._handleConnectionChange = this._handleConnectionChange.bind(this);
  }
  
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange(isConnected){
    this.props.updateNetworkInfo(isConnected);
    this.setState({ mount: true});
  };

  render() {
    return ( 
      <View style={{flex:1}}>
          {this.state.mount && <App />}
      </View>
    );
  }
}


/** 
 *  Mapping the props for the desired dispatch actions
 */
const mapDispatchToProps = {
  updateNetworkInfo
};

export default connect(null, mapDispatchToProps)(Root);
