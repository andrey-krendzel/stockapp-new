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
import styles from "./HomeScreen.component.style.js";
import ETFItem from "./HomeScreen.component.Item.js";

export default function HomeScreen(props) {
  const [ETFList, setETFList] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [limit, setLimit] = useState("10");
  const [search, setSearch] = useState();

  //Load stocks list

  function forceLoad() {
    //API call control. Don't use &search parameter if there is nothing in the search input/state. That causes too many API calls which locks the service.
    let searchQuery = "";
    if (search != undefined) {
      searchQuery = "&search=" + search;
      setLimit("1000");
    }

    fetch(
      "https://api.polygon.io/v3/reference/tickers?type=ETF&market=stocks&active=true&sort=ticker&order=asc" +
        searchQuery +
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
        <Text>Search name or ticker: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
        />
        <Text style={styles.paddingBottom20}>
          If you cannot find the stock by sticker, try increasing the amount of
          stocks loaded.{" "}
        </Text>
      </View>

      <Button
        onPress={() => forceLoad()}
        title="Load"
        color="#841584"
        accessibilityLabel="Force load"
      />

      <FlatList data={ETFList} renderItem={renderItem} />
    </SafeAreaView>
  );
}
