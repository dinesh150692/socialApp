/* Library Imports */
import React from "react";
import { connect } from 'react-redux';
import { Container, Content, Header, Body, Title, Card, CardItem, Text, Spinner } from 'native-base';
import { View, FlatList, RefreshControl, TouchableOpacity, AsyncStorage} from 'react-native';

/* Action Import */
import { getAlbumLists, updateAlbumId, updateAlbumLists } from '../redux/actions/albumActions';

/* Component Imports */
import ErrorComponent from "../components/error";
import NoNetwork from "../components/noNetwork";

/* Style Imports */
import generalStyles from '../styles';

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.getAlbumsDetails = this.getAlbumsDetails.bind(this);
    }

    componentDidMount(){
       this.getDetails();
    }

    getAlbumsDetails(id){
        if(this.props.isConnected){
            this.props.updateAlbumId(id);
            this.props.navigation.navigate('AlbumDetails');
        }
    }

    getDetails(){
        if(this.props.isConnected){
            this.props.getAlbumLists();
        }else{
            let albumLists = [];
            AsyncStorage.getItem('albumLists').then(value => {
                if(value !== null){
                    albumLists = JSON.parse(value);
                }else{
                    albumLists = [];
                }
                this.props.updateAlbumLists(albumLists);
            });
        }
    }

    renderContent(){
        if(this.props.ajaxStatus.state === 'error' || this.props.albumLists.length === 0){
            return(
               <ErrorComponent function={this.getDetails} data={this.props.albumLists}/> 
            )
        }else if(this.props.albumLists.length > 0){
            return (
                <View style={{flex:1}}>
                    <FlatList
                        keyboardShouldPersistTaps={"always"}
                        automaticallyAdjustContentInsets={false}
                        data = {this.props.albumLists}
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

    _renderItemList = ({item, index}) => (
        <TouchableOpacity onPress={() => {
            this.getAlbumsDetails(item.id)
        }}>
            <Card key={item.id}>
                <CardItem header>
                    <Text>{item.title}</Text>
                </CardItem>
            </Card>  
        </TouchableOpacity>
    );

    render(){
        return ( 
            <Container>
                <Header style={generalStyles.headerBackground} androidStatusBarColor={'#512DA8'}>
                    <Body>
                        <Title style={generalStyles.headerText}>Albums</Title>
                    </Body>
                </Header>
                {!this.props.isConnected && <NoNetwork />}
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
        isConnected: state.netinfo.isConnected,
        albumLists: state.albums.albumLists
    };
}

/** 
 *  Mapping the props for the desired dispatch actions
 */
const mapDispatchToProps = {
    getAlbumLists, 
    updateAlbumId,
    updateAlbumLists
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);

