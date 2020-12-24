import React from "react";
import { Typography } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
//import fetchModel from "../../lib/fetchModelData";
import Axios from "axios";
//import { response } from "express";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    Axios.get(`user/${this.props.match.params.userId}`).then((res) =>
      this.setState({ UserDetail: res.data })
    );
    Axios.get(`photosOfUser/${this.props.match.params.userId}`).then((qw) =>
      this.setState({ jurag: qw.data })
    );
    this.state = {
      userId: this.props.match.params.userId,
      UserDetail: [],
      jurag: [],
    };
  }

  componentDidUpdate(pre) {
    var prev = pre.match.params.userId;
    var now = this.props.match.params.userId;
    if (prev !== now) {
      this.setState({ userId: now });
      Axios.get(`/user/${this.props.match.params.userId}`).then((qw) =>
        this.setState({ UserDetail: qw.data })
      );
      Axios.get(`/photosOfUser/${this.props.match.params.userId}`).then((qw) =>
        this.setState({ jurag: qw.data })
      );
    }
  }
  render() {
    // let hun = Axios.get(`user/${this.state.userId}`).then((qw) =>
    //   this.setState({ UserDetail: qw.data })
    // );
    //console.log(this.state.UserDetail.first_name);
    // let zurag = Axios.get(`/photosOfUser/${this.state.userId}`).then((qw) =>
    //   this.setState({ jurag: qw.data })
    // );
    // console.log(zurag[0]._id);
    //console.log(this.state.jurag);
    //console.log(this.state.userId);
    // console.log(this.state.jurag[0]);
    return (
      <div className="UserDetail">
        {this.state.jurag[0] ? (
          <img
            src={`images/${this.state.jurag[0].file_name}`}
            alt=""
            width="300px"
            height="250px"
          />
        ) : (
          ""
        )}
        <Typography variant="h2">{`${this.state.UserDetail.first_name} ${this.state.UserDetail.last_name}`}</Typography>
        <Typography variant="h6">
          <b>Bio</b>:{`${this.state.UserDetail.description} `}
        </Typography>
        <Typography variant="h6">
          <b>Current city</b>:{this.state.UserDetail.location}
        </Typography>
        <Typography variant="h6">
          <b>Occupation</b>:{this.state.UserDetail.occupation}
        </Typography>
        <Link to={`/photos/${this.state.UserDetail._id}`}>
          <Typography variant="button">
            See Photos of {this.state.UserDetail.first_name}
          </Typography>
        </Link>
      </div>
    );
  }
}

export default UserDetail;
