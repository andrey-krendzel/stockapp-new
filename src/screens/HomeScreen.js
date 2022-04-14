import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";

const { manifest } = Constants;
import styles from "../styles/HomeScreen.style.js";
import ETFItem from "../components/HomeScreen.ETFItem.js";

export default function HomeScreen(props) {
  const [ETFList, setETFList] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [limit, setLimit] = useState("100");
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();

  //Load stocks list

  function forceLoad() {

    fetch(
      "https://api.polygon.io/v3/reference/tickers?type=ETF&market=stocks&active=true&sort=ticker&order=asc" +
        "&limit=" +
        limit +
        "&apiKey=XAzPFN5qJchHEfIgfGtaiQ8VQzFjqyIp"
    )
      .then((response) => response.json())
      .then((data) => {
        setETFList(data.results);
      })
      .catch((error) => {
      });
  }


    //Filter it in case filter input is being used

    let filteredETFList = "";

    if (filter != undefined) {
      filteredETFList = ETFList.filter(
        (value) => value.ticker == filter
      );
    } else {
      filteredETFList = ETFList;
    }

  //Flatlist stuff

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.ticker === selectedTicker ? "deepskyblue" : "lightskyblue";
    const color = item.ticker === selectedTicker ? "white" : "dimgray";

    return (
      <ETFItem
        item={item}
        key={item.ticker}
        onPress={() => setSelectedTicker(item.ticker)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  //The UI itself

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.paddingSidesTop}>
        <Text>How many to load: </Text>
        <TextInput style={styles.input} onChangeText={setLimit} value={limit} />
        <Text>Filter by ticker: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setFilter}
          value={filter}
        />
        <Text style={styles.paddingBottom20}>
          If you cannot find the stock by ticker, try increasing the amount of
          stocks loaded.{" "}
        </Text>
      </View>

      <Button
        onPress={() => forceLoad()}
        title="Load"
        color="#841584"
        accessibilityLabel="Force load"
      />

      <FlatList data={filteredETFList} renderItem={renderItem} />
    </SafeAreaView>
  );
}
