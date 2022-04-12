import {
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import styles from "./CryptoScreen.component.style.js";
import ViewDetailsModal from "./CryptoScreen.component.ViewDetailsModal.js";

const CryptoItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  onPressAction,
  detailsVisible,
  onPressProp,
}) => {

  useEffect(() => {
  
  console.log(item.cmc_rank);
   },[])


  return (
    <>
      <ViewDetailsModal
        name={item.name}
        symbol={item.symbol}
        quote={item.quote}
        detailsVisible={detailsVisible}
        onPressProp={onPressProp}
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
          onPress={onPressAction}
        >
          <Text style={styles.textStyle}>Load details</Text>
        </Pressable>
      </TouchableOpacity>
    </>
  );
}

export default CryptoItem;