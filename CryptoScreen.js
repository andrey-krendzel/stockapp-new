import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import React, { useState, useRef } from "react";
import styles from "./CryptoScreen.component.style.js";
import CryptoItem from "./CryptoScreen.component.Item.js";

const { manifest } = Constants;
//const uri = `http://${manifest.debuggerHost.split(":").shift()}:3001`;

export default function CryptoScreen() {
  const [cryptocurrencyList, setCryptocurrencyList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [filter, setFilter] = useState();
  const [limit, setLimit] = useState("10");
  const [detailsVisible, setDetailsVisible] = useState({ visible: false });
  const [cryptoMeta, setCryptoMeta] = useState();

  //Load cryptocurrency list

  function forceLoad() {
    fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=" +
        limit,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": "478a70fe-0681-49eb-8ffa-0d6607b0014a",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptocurrencyList(data.data);
      })
      .catch((error) => console.error(error));
  }

  //Filter it in case filter input is being used

  let filteredCryptoList = "";

  if (filter != undefined) {
    filteredCryptoList = cryptocurrencyList.filter(
      (value) => value.symbol == filter
    );
  } else {
    filteredCryptoList = cryptocurrencyList;
  }

  //Load metadata about cryptocurrencies (feature in next versions)

  function loadMeta(symbol) {
    fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=" +
        symbol,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": "478a70fe-0681-49eb-8ffa-0d6607b0014a",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoMeta(data);
      })
      .catch((error) => console.error(error));
  }

  //Flat list stuff

  const list = useRef(null);

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.symbol === selectedSymbol ? "deepskyblue" : "lightskyblue";
    const color = item.symbol === selectedSymbol ? "white" : "dimgray";

    return (
      <CryptoItem
        item={item}
        key={item.symbol}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        detailsVisible={detailsVisible}
        onPress={() => setSelectedSymbol(item.symbol)}
        onPressProp={() =>
          setDetailsVisible({ visible: !detailsVisible.visible })
        }
        onPressAction={() => setDetailsVisible({ visible: true })}
      />
    );
  };

  //The UI itself
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.paddingSidesTop}>
        <Text>How many to load: </Text>
        <TextInput style={styles.input} onChangeText={setLimit} value={limit} />

        <Text>Filter by symbol: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setFilter}
          value={filter}
        />
        <Text style={styles.paddingBottom20}>
          If you cannot find the cryptocurrency by symbol, try increasing the
          amount of cryptos loaded.{" "}
        </Text>
      </View>

      <Button
        onPress={() => forceLoad()}
        title="Load"
        color="#841584"
        accessibilityLabel="Force load"
      />

      <FlatList data={filteredCryptoList} renderItem={renderItem} />
    </SafeAreaView>
  );
}
