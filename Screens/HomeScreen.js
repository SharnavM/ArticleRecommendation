import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { Icon } from "react-native-elements";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      recommend: null,
      likeClicked: false,
      dislikeClicked: false,
    };
  }

  loadRecommendation = async () => {
    let j = await fetch("https://empty-starfish-25.loca.lt/getRecommendations");
    j = await j.json();

    this.changeRec(j.data[0]);
  };

  getArticleData = async () => {
    let res = await fetch("https://empty-starfish-25.loca.lt/getArticles");
    res = await res.json();

    this.setState({ data: res.data });
  };

  addArticle = async (type) => {
    if (type == "like") {
      let s = await fetch("https://empty-starfish-25.loca.lt/addLikedArticle", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: this.state.item[0],
        }),
      });
      s = await s.json();
      if (s.status != "success") {
        ToastAndroid.show("An Error Occurred", ToastAndroid.SHORT);
        this.setState({ likeClicked: false });
      }
      this.loadRecommendation();
    } else if (type == "dislike") {
      let s = await fetch(
        "https://empty-starfish-25.loca.lt/addDislikedArticle",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name: this.state.item[0],
          }),
        }
      );
      s = await s.json();
      if (s.status != "success") {
        ToastAndroid.show("An Error Occurred", ToastAndroid.SHORT);
        this.setState({ dislikeClicked: false });
      }
      this.loadRecommendation();
    }
  };

  updateRecom = (rec) => {
    this.setState({ recommend: [...rec] });

    for (i of rec) {
      console.log(i[0]);
    }

    console.log("\nhomescreen rec\n");
  };

  async componentDidMount() {
    this.getArticleData();
  }

  render() {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          backgroundColor: "#262626",
        }}
      >
        <ScrollView>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ marginTop: 40, color: "#ffffff", fontSize: 20 }}>
              Article Recommendation
            </Text>
          </View>
          <View style={{ display: "flex", marginTop: 45 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                color: "#ffffff",
                marginLeft: 10,
                fontSize: 18,
              }}
            >
              Top Articles
            </Text>
            <FlatList
              horizontal={true}
              style={{ marginTop: 15 }}
              keyExtractor={(item) => item[4]}
              data={this.state.data}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("ArticleInfo", {
                          item: item,
                        })
                      }
                    >
                      <Text>{item[2]}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 25,
                        marginLeft: 20,
                      }}
                    >
                      <View
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Icon
                          onPress={() => {
                            this.setState({
                              likeClicked: true,
                              dislikeClicked: false,
                            });
                            this.addArticle("like");
                          }}
                          color="#fff"
                          name={
                            this.state.likeClicked
                              ? "thumb-up"
                              : "thumb-up-off-alt"
                          }
                          type="material"
                          size={18}
                        ></Icon>
                        <Text style={{ color: "#fff", marginTop: 2 }}>
                          Like
                        </Text>
                      </View>

                      <View
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Icon
                          onPress={() => {
                            this.setState({
                              dislikeClicked: true,
                              likeClicked: false,
                            });
                            this.addArticle("dislike");
                          }}
                          color="#fff"
                          name={
                            this.state.dislikeClicked
                              ? "thumb-down"
                              : "thumb-down-off-alt"
                          }
                          type="material"
                          size={18}
                        ></Icon>
                        <Text style={{ color: "#fff", marginTop: 2 }}>
                          Dislike
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {this.state.recommend == null ? null : (
            <View style={{ display: "flex", marginTop: 45 }}>
              <Text
                style={{
                  alignSelf: "flex-start",
                  color: "#ffffff",
                  marginLeft: 10,
                  fontSize: 18,
                }}
              >
                Recommended Articles
              </Text>
              <FlatList
                extraData={this.state.recommend}
                style={{ marginTop: 15 }}
                horizontal={true}
                keyExtractor={(item) => "" + Math.random()}
                data={this.state.recommend}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("ArticleInfo", {
                            item: item,
                          })
                        }
                      >
                        <Text>{item[2]}</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          display: "flex",
                          width: "90%",
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: 25,
                          marginLeft: 20,
                        }}
                      >
                        <View
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Icon
                            onPress={() => {
                              this.setState({
                                likeClicked: true,
                                dislikeClicked: false,
                              });
                              this.addArticle("like");
                            }}
                            color="#fff"
                            name={
                              this.state.likeClicked
                                ? "thumb-up"
                                : "thumb-up-off-alt"
                            }
                            type="material"
                            size={18}
                          ></Icon>
                          <Text style={{ color: "#fff", marginTop: 2 }}>
                            Like
                          </Text>
                        </View>

                        <View
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Icon
                            onPress={() => {
                              this.setState({
                                dislikeClicked: true,
                                likeClicked: false,
                              });
                              this.addArticle("dislike");
                            }}
                            color="#fff"
                            name={
                              this.state.dislikeClicked
                                ? "thumb-down"
                                : "thumb-down-off-alt"
                            }
                            type="material"
                            size={18}
                          ></Icon>
                          <Text style={{ color: "#fff", marginTop: 2 }}>
                            Dislike
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
          <StatusBar style={"light"}></StatusBar>
        </ScrollView>
      </View>
    );
  }
}
