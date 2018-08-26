/* Library Imports */
import React from "react";
import { connect } from 'react-redux';
import { Container, Content, Body, Card, CardItem, Text, Spinner, Item } from 'native-base';
import { View, StyleSheet } from 'react-native';

/* Component Imports */
import ErrorComponent from "../components/error";
import NoNetwork from '../components/noNetwork';


/* Action Import */
import { getPostComments , getPostDetails, clearPostDetailsAndComments } from '../redux/actions/postActions';

class PostDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getDetails = this.getDetails.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    componentDidMount(){
        this.getDetails();
    }
    componentWillUnmount(){
        this.props.clearPostDetailsAndComments();
    }

    getDetails(){
        if(this.props.isConnected){
            this.props.getPostDetails(this.props.postId);
            this.props.getPostComments(this.props.postId);    
        }
    }

    renderContent(){
        if(this.props.ajaxStatus.state === 'error' || Object.keys(this.props.postDetails).length === 0){
            return <ErrorComponent function={this.getDetails} data={Object.keys(this.props.postDetails)}/>
        }else{
            return (
                <Card key={this.props.postDetails.id}>
                    <CardItem header>
                        <Text>{this.props.postDetails.title || ''}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.props.postDetails.body.split("\n").join(" ") || ''}
                            </Text>
                        </Body>
                    </CardItem>
                    {
                        this.props.postComments.length === 0 && 
                            <CardItem footer>
                                <Text>No comments for this post</Text>
                            </CardItem>
                    }
                </Card>  
            )
        }    
    }

    renderComments(){
        return (
        <Card>
            { this.props.postComments.length > 0 && this.props.postComments.map(item => {
                return(                    
                    <View key={item.id} style={styles.commentContainer}>
                        <View>
                            <Text style={styles.commentTextName}>{item.name || ''}</Text>
                        </View>
                        <View>
                            <Body>
                            <Text style={styles.commentTextBody}>{item.body.split("\n").join(" ")}</Text>
                            </Body>
                        </View>
                    </View>
                )})
            }
        </Card>
        );
    }

    render(){
        return ( 
            <Container>
                <Content>
                    {!this.props.isConnected && <NoNetwork />}
                    { this.props.ajaxStatus.state === 'inprogress' 
                        ? <Spinner color={"#512DA8"}/>
                        : 
                        <React.Fragment>
                            {this.renderContent()}
                            {this.renderComments()}
                        </React.Fragment>

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
        postId: state.posts.postId,
        isConnected: state.netinfo.isConnected,
        postDetails: state.posts.postDetails,
        postComments: state.posts.postComments,
        ajaxStatus: state.ajaxStatus
    };
}

/** 
 *  Mapping the props for the desired dispatch actions
 */
const mapDispatchToProps = {
    getPostComments,
    getPostDetails,
    clearPostDetailsAndComments
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

const styles = StyleSheet.create({
    commentContainer:{
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 15
    },
    commentTextName:{
        fontSize: 12,
        fontWeight: '500',
        color: '#212121'
    },
    commentTextBody:{
        fontSize: 10,
        marginTop: 5,
        fontWeight: '400',
        color: '#757575'
    }
});
