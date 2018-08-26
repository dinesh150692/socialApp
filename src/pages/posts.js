/* Library Imports */
import React from "react";
import { connect } from 'react-redux';
import { Container, Content, Header, Body, Title, Card, CardItem, Text, Spinner } from 'native-base';
import { View, FlatList, RefreshControl, TouchableOpacity, AsyncStorage} from 'react-native';
/* Action Import */
import { getPostLists, updatePostId, updatePostLists } from '../redux/actions/postActions';


/* Component Imports */
import ErrorComponent from "../components/error";
import NoNetwork from "../components/noNetwork";

/* Style Imports */
import generalStyles from '../styles';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
        this.getPostDetails = this.getPostDetails.bind(this);
    }

    componentDidMount(){
        this.getDetails();
    }
 
     getDetails(){
        if(this.props.isConnected){
            this.props.getPostLists();
        }else{
            let postLists = [];
            AsyncStorage.getItem('postLists').then(value => {
                if(value !== null){
                    postLists = JSON.parse(value);
                }else{
                    postLists = [];
                }
                this.props.updatePostLists(postLists);
            });
        }
    }

    renderContent(){
        if(this.props.ajaxStatus.state === 'error' || this.props.postLists.length === 0){
            return <ErrorComponent function={this.getDetails} data={this.props.postLists}/>
        }else{
            return (
                <View style={{flex:1, flexGrow: 1}}>
                    <FlatList
                        keyboardShouldPersistTaps={"always"}
                        automaticallyAdjustContentInsets={false}
                        data = {this.props.postLists}
                        extraData = {this.props}
                        keyExtractor = {item => String(item.id)}
                        renderItem = {this._renderItemList}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.ajaxStatus.state === 'inprogress'}
                                onRefresh={this.getDetails}
                                title="Pull to refresh"
                                tintColor="#512DA8"
                                titleColor="#512DA8"
                                progressBackgroundColor="#512DA8"
                                colors={['white']}
                            />
                        }
                    />
                </View>
            )
        }
        
    }

    getPostDetails(id){
        if(this.props.isConnected){
            this.props.updatePostId(id);
            this.props.navigation.navigate('PostDetails');
        }
    }

    _renderItemList = ({item, index}) => (
        <TouchableOpacity onPress={() => {
            this.getPostDetails(item.id)
        }}>
            <Card key={item.id}>
                <CardItem header>
                    <Text>{item.title}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {item.body.split("\n").join(" ")}
                        </Text>
                    </Body>
                </CardItem>
            </Card>  
        </TouchableOpacity>
    );

    render(){
        return ( 
            <Container>
                <Header style={generalStyles.headerBackground} androidStatusBarColor={'#512DA8'}>
                    <Body>
                        <Title style={generalStyles.headerText}>Posts</Title>
                    </Body>
                </Header>
                {!this.props.isConnected && <NoNetwork/>}
                <Content>
                        { this.props.ajaxStatus.state === 'inprogress' 
                            ? <Spinner color={"#512DA8"}/>
                            : this.renderContent()
                        }
                </Content>                
            </Container>        
        );
    } 
}

/** 
 *  Mapping the state to desired props for the component
 */
function mapStateToProps(state, ownProps) {
    return {
        ajaxStatus: state.ajaxStatus,
        postLists: state.posts.postLists,
        isConnected: state.netinfo.isConnected
    };
}

/** 
 *  Mapping the props for the desired dispatch actions
 */
const mapDispatchToProps = {
    getPostLists,
    updatePostId,
    updatePostLists
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
