/* Library Imports */
import React from "react";
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text, Spinner, Icon } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native';
import { CachedImage } from 'react-native-cached-image'
/* Component Imports */
import ErrorComponent from "../components/error";
import NoNetwork from '../components/noNetwork';

/* Action Import */
import { getAlbumPhotos , getAlbumDetails, clearAlbumDetailAndPhotos } from '../redux/actions/albumActions';

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            imageDetail: {},
            openImageModal: false
        }
        this.getDetails = this.getDetails.bind(this);
        this.renderPhotos = this.renderPhotos.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.closeImageModal = this.closeImageModal.bind(this);
    }

    componentDidMount(){
        this.getDetails();
    }

    componentWillUnmount(){
        this.props.clearAlbumDetailAndPhotos();
    }

    getDetails(){
        this.props.getAlbumDetails(this.props.albumId);
        this.props.getAlbumPhotos(this.props.albumId);
    }

    closeImageModal(){
        this.setState({openImageModal: false, imageDetail:{}});
    }

    renderContent(){
        if(this.props.ajaxStatus.state === 'error' || Object.keys(this.props.albumDetails).length === 0){
            return <ErrorComponent function={this.getDetails} data={Object.keys(this.props.albumDetails)}/>
        }else{
            return (
                <React.Fragment>
                    <Card>
                        <CardItem header>
                            <Text>{this.props.albumDetails.title || ''}</Text>
                        </CardItem>
                        {
                            this.props.albumPhotosList.length === 0 && 
                                <CardItem footer>
                                    <Text>No photos for this albums</Text>
                                </CardItem>
                        }
                    </Card> 
                    {this.props.albumPhotosList.length > 0 &&
                        <View style={[styles.imageContainer]}>
                            {this.renderPhotos()}
                        </View>
                    }
                    {this.state.openImageModal && this.renderImage()}
                </React.Fragment>
            )
        }    
    }

    renderPhotos(){
        return this.props.albumPhotosList.map(item => {
            return (
                <View key={item.id} style={styles.image}>
                    <TouchableOpacity onPress={() => {this.setState({imageDetail: item, openImageModal: true })}}>
                        <Image source={{uri: item.thumbnailUrl}}  style={{width: '100%', height: '100%'}} />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    renderImage(){
       return(
            <Modal   
                animationType="fade"
                transparent={false}
                visible={this.state.openImageModal}
                onRequestClose={this.closeImageModal}
            >
                <View style={styles.header}>
                    <View style={styles.headerItem}>
                        <View style={styles.headerItem1}>
                            <TouchableOpacity
                                delayLongPress={4000}  
                                activeOpacity={0.14} 
                                onPress={this.closeImageModal}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 15}}
                            >
                                <Icon name="arrow-back"  style={styles.headergoBack}/>
                            </TouchableOpacity>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.headerTitle, styles.headerTitle1]}>{this.state.imageDetail.title || ''}</Text>
                        </View> 
                    </View>
                </View>
                <Image source={{uri: this.state.imageDetail.url}} style={{width: '100%', height:'100%'}}/>
            </Modal>
       )
    }

    render(){
        return ( 
            <Container>
                <Content>
                    {!this.props.isConnected && <NoNetwork />}
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
        albumId: state.albums.albumId,
        albumDetails: state.albums.albumDetails,
        isConnected: state.netinfo.isConnected,
        albumPhotosList: state.albums.albumPhotosList,
        ajaxStatus: state.ajaxStatus
    };
}

/** 
 *  Mapping the props for the desired dispatch actions
 */
const mapDispatchToProps = {
    getAlbumPhotos, 
    getAlbumDetails, 
    clearAlbumDetailAndPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);

const styles = StyleSheet.create({
    imageContainer:{
        marginHorizontal: '0.5%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    image: {
        width: '33%',
        height: 100,
        marginBottom: 10
    },
    header: {
        top: 0,
        left: 0,
        height: 56,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#673ab7'
    },
    headerItem:{
        width: '100%',
        display: 'flex',
        paddingLeft: 15,
        paddingRight: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerItem1:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
	    color: 'white',
        fontWeight: '700'
    },
    headerTitle1:{
        marginLeft: 20
    },
    headergoBack: {
        fontSize: 20,
        color: 'white'
    }
})