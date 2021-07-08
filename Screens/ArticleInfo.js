import React, { Component } from "react";
import { WebView } from "react-native-webview";

export default class ArticleInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { item: [] };
  }

  async componentDidMount() {
    let item = await this.props.navigation.getParam("item");

    this.setState({
      item: item,
    });
  }

  render() {
    return <WebView source={{ uri: this.state.item[1] }}></WebView>;
  }
}
