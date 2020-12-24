import React from "react";
//import { Divider } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./userPhotos.css";
import Axios from "axios";
//import fetchModel from "../../lib/fetchModelData";
import { Header, Comment } from "semantic-ui-react";

/**
 * Define UserPhotos, a React componment of CS142 project #5*/
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    Axios.get(`user/${this.props.match.params.userId}`).then((res) =>
      this.setState({ userDetail: res.data })
    );
    Axios.get(`photosOfUser/${this.props.match.params.userId}`).then((res) =>
      this.setState({ photos: res.data })
    );
    this.state = {
      userDetail: [],
      photos: [],
    };
  }
  render() {
    let photos1 = this.state.userDetail;
    //console.log(this.state.photos);
    //console.log(this.state.photos.comments);
    return (
      <Typography variant="caption">
        <Typography variant="h2">
          {`${photos1.first_name} ${photos1.last_name}`} photos:
        </Typography>
        <div className="container1">
          {this.state.photos.map((el, ind) => {
            let comey = window.cs142models.commentList(el._id);
            //console.log(comey);
            return (
              <div className="container" key={ind}>
                <div className="photos">
                  <img
                    src={`images/${el.file_name}`}
                    alt=""
                    width="300px"
                    height="250px"
                  />
                  <Comment.Group>
                    <Header as="h3" dividing>
                      Comments
                    </Header>
                    {comey.map((endees, ter) => {
                      return (
                        <Comment key={ter}>
                          {/* <Comment.Avatar
                            src={`images/${comey.user.file_name}`}
                            width="25px"
                            height="25px"
                          /> */}
                          <Comment.Content>
                            <Comment.Author as="a">
                              {endees.user.first_name}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>{endees.date_time}</div>
                            </Comment.Metadata>
                            <Comment.Text>{endees.comment}</Comment.Text>
                          </Comment.Content>
                        </Comment>
                      );
                    })}
                  </Comment.Group>
                </div>
              </div>
            );
          })}
        </div>
      </Typography>
    );
  }
}

export default UserPhotos;
