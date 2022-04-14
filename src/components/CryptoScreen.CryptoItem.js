import {
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles/CryptoScreen.style.js";
import ViewDetailsModal from "./CryptoScreen.ViewDetailsModal.js";

const CryptoItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}) => {

  const [detailsVisible, setDetailsVisible] = useState({ visible: false });

  function loadDetails() {
    // fetch(
    //   "https://api.polygon.io/v1/open-close/" +
    //     detailsVisible.symbol +
    //     "/" +
    //     dateInput +
    //     "?adjusted=true&apiKey=XAzPFN5qJchHEfIgfGtaiQ8VQzFjqyIp"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTickerDetails(data);
    //     setErrorMessageDetails(data.message);
    //   })
    //   .catch((error) => {
    //   });
  }

  return (
    <>
      <ViewDetailsModal
        name={item.name}
        symbol={item.symbol}
        quote={item.quote}
        detailsVisible={detailsVisible}
        onPressProp={() =>
          setDetailsVisible({ visible: !detailsVisible.visible })
        }
        onRequestClose={() => {
          setDetailsVisible({ visible: false });
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.listView, backgroundColor]}
      >
        <Text style={[textColor]}>Name: {item.name}</Text>
        <Text style={[textColor]}>Symbol: {item.symbol}</Text>
        <Text style={[textColor]}>
          Price: {item.quote.USD.price.toFixed(2)} USD
        </Text>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setDetailsVisible({ visible: true, symbol: item.symbol });
          }}
        >
          <Text style={styles.textStyle}>View Crypto Details</Text>
        </Pressable>
      </TouchableOpacity>
    </>
  );
}

export default CryptoItem;