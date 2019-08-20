import React, { Component } from "react";
import { MasterLayout } from "layouts";
import { TableComponent, FormComponent } from "../components";
import { connect } from "react-redux";
import * as actions from "../actions";
class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      views: "TABLE"
    };
  }

  componentDidMount() {
    this.props.loadData();
  }
  onRemove = id => {
    this.props.deletePost(id);
  };
  onChangerView = () => {
    if (this.state.views === "TABLE") {
      this.setState({
        views: "FORM"
      });
    } else {
      this.setState({
        views: "TABLE"
      });
    }
  };
  onAdd = data => {
    this.props.addPost(data);
    this.setState({
      views: "TABLE"
    });
  };
  render() {
    const { posts } = this.props;
    const View = () => {
      if (this.state.views === "TABLE") {
        return (
          <TableComponent
            data={posts}
            onRemove={this.onRemove}
            onChangerView={this.onChangerView}
          />
        );
      } else {
        return (
          <FormComponent
            onChangerView={this.onChangerView}
            onAdd={this.onAdd}
          />
        );
      }
    };
    return <MasterLayout>{View()}</MasterLayout>;
  }
}
const mapStateToProps = state => ({
  posts: state.posts.all
});
const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(actions.fetchPosts()),
  deletePost: data => dispatch(actions.deletePost(data)),
  addPost: data => dispatch(actions.addPost(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
