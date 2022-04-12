import { Text, TouchableOpacity, Pressable } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import styles from "./HomeScreen.component.style.js";
import ViewDetailsModal from "./HomeScreen.component.ViewDetailsModal.js";
const { manifest } = Constants;

const ETFItem = ({ item, onPress, backgroundColor, textColor }) => {
  const [detailsVisible, setDetailsVisible] = useState({ visible: false });
  const [errorMessageDetails, setErrorMessageDetails] = useState("");
  const [tickerDetails, setTickerDetails] = useState({ from: "" });
  const [dateInput, setDateInput] = useState("2022-03-08");

  function loadDetails() {
    fetch(
      "https://api.polygon.io/v1/open-close/" +
        detailsVisible.ticker +
        "/" +
        dateInput +
        "?adjusted=true&apiKey=XAzPFN5qJchHEfIgfGtaiQ8VQzFjqyIp"
    )
      .then((response) => response.json())
      .then((data) => {
        setTickerDetails(data);
        setErrorMessageDetails(data.message);
      })
      .catch((error) => {
      });
  }

  return (
    <>
      <ViewDetailsModal
        detailsVisible={detailsVisible}
        errorMessageDetails={errorMessageDetails}
        tickerDetails={tickerDetails}
        detailsChangeFunction={() => {
          setDetailsVisible({ visible: false });
        }}
        loadDetails={() => loadDetails(item.ticker)}
        ticker={item.ticker}
      />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.listView, backgroundColor]}
      >
        <Text style={[textColor]}>Name: {item.name}</Text>
        <Text style={[textColor]}>Ticker: {item.ticker}</Text>

        <Pressable
          style={[styles.button, styles.buttonHomeScreen]}
          onPress={() => {
            setDetailsVisible({ visible: true, ticker: item.ticker });
            loadDetails(item.ticker);
          }}
        >
          <Text style={styles.textStyle}>View Stock Details</Text>
        </Pressable>
      </TouchableOpacity>
    </>
  );
};

export default ETFItem;
