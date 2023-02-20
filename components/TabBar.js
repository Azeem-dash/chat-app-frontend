import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import axios from "axios";
import MaterialTabs from "react-native-material-tabs";
import ChatList from "./ChatList";
import { useIsFocused } from "@react-navigation/native";
import ChatListItem from "./ChatListItem";
// import Add_PNG from '../assets/add_more.png'
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
  baseURL: "http://localhost:10542",
  headers: {
    "Content-Type": "application/json",
  },
});
const TabBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={{ flex: 1 }}>
      <MaterialTabs
        items={["All", "Groups", "Request"]}
        selectedIndex={selectedTab}
        onChange={handleTabChange}
        barColor="transparent"
        indicatorColor="#1F81E1"
        activeTextColor="#1F81E1"
        inactiveTextColor="#c1d8f2"
      />
      {selectedTab === 0 && <ChatList></ChatList>}
      {selectedTab === 1 && <GroupsTab />}
      {selectedTab === 2 && <RequestTab />}
    </View>
  );
};

const GroupsTab = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [moveNext, setmoveNext] = useState(false);
  const [GroupName, setGroupName] = useState(null);
  const [setmoveNext2, setSetmoveNext2] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [AllselectedMembers, setAllSelectedMembers] = useState([]);
  const [Gchat, setGchat] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  let selectedMembers = [];
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    syncGroupChatsWithLocalStorage();
  }, [isFocused]);

  const syncGroupChatsWithLocalStorage = async () => {
    let Gchat = await AsyncStorage.getItem("GroupInfo");
    if (Gchat != null) setDataArray(JSON.parse(Gchat));
    // console.log("--------------------Gchat", JSON.parse(Gchat));
    // setGchat(Gchat);
  };
  let NoGroupName = [];
  const onMakeGroup = async () => {
    let GroupInfoArr = [];
    setModalVisible(false);
    setmoveNext(false);
    const GroupInfo = {
      userInfo: AllselectedMembers,
      GroupName: GroupName,
      isPrivate: isPrivate,
    };
    setDataArray([...dataArray, GroupInfo]);
    setGroupName("");
    setAllSelectedMembers([]);

    // console.log("----------here-----------", [...dataArray, GroupInfo]);
    await AsyncStorage.setItem("GroupInfo", JSON.stringify([...dataArray, GroupInfo]))
      .then((res) => {
        console.log("Saved!");
      })
      .catch((err) => {
        console.log("err ", err);
      });
    // await AsyncStorage.removeItem('GroupInfo');
    navigation.navigate("Chat", {
      dataArray: GroupInfo,
    });
    // NoGroupName.push(GroupName);
    // console.log("good", dataArray);
  };
  return (
    <View>
      <Text>Groups UI Coming soon</Text>

      {!modalVisible && !moveNext ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setAllSelectedMembers([]);
            }}
          >
            <ChatListItem
              // image={Add_PNG}
              name={"Tab here to make a new group"}
              message={"groups"}
              time={null}
              counter={-1}
            />
          </TouchableOpacity>
          {dataArray?.length != 0 ? (
            <View>
              <FlatList
                scrollEnabled={true}
                data={dataArray}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => {
                  return (
                    <View key={index} style={{ padding: 5, paddingTop: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Chat", {
                            dataArray: item.item,
                          });
                        }}
                      >
                        <ChatListItem
                          // image={Add_PNG}
                          name={item.item.GroupName}
                          message={"group"}
                          time={null}
                          counter={-2}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      ) : modalVisible ? (
        <View>
          <ChatList
            isGroup={true}
            itemToRemove={(pressed) => {
              // console.log("REMOVED_> ", pressed.name);
              const index = selectedMembers.indexOf(pressed);
              if (index > -1) {
                selectedMembers.splice(index, 1);
                setAllSelectedMembers(selectedMembers);
              }
            }}
            onPress={(pressed) => {
              // console.log("ADDED> ", pressed.name);
              AllselectedMembers.push(pressed);
              // setAllSelectedMembers(selectedMembers);
              // const uniqueArray = Array.from(new Set(selectedMembers));
              // selectedMembers = uniqueArray;
              setAllSelectedMembers(Array.from(new Set(AllselectedMembers)));
              // console.log(pressed);
            }}
          />
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              if (AllselectedMembers.length != 0) {
                setmoveNext(true);
                setModalVisible(false);
              } else {
                alert("Please select any user");
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Next-></Text>
          </TouchableOpacity>
        </View>
      ) : moveNext ? (
        <View>
          <Text>Enter your group name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setGroupName(text);
            }}
            //  value={text}
          />
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                if (GroupName === null || GroupName === "") {
                  alert("Please Enter any name");
                } else {
                  setSetmoveNext2(true);
                  Keyboard.dismiss();
                  // setModalVisible(false);
                  onMakeGroup();
                }
              }}
            >
              <Text style={{ color: "#fff" }}>Next-></Text>
            </TouchableOpacity>
            <BouncyCheckbox
              size={19}
              fillColor="blue"
              onPress={(isChecked: boolean) => {
                setIsPrivate(isChecked);
              }}
              unfillColor="#FFFFFF"
              text="Private"
              innerIconStyle={{ borderWidth: 1 }}
              textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const RequestTab = () => {
  return (
    <View>
      <Text>Requests UI coming soon</Text>
    </View>
  );
};

export default TabBar;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnStyle: {
    position: "relative",
    bottom: 0,
    right: 1,
    padding: 10,
    backgroundColor: "#1F81E1",
    width: 80,
    justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
