import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import styles from "../styles/CryptoScreen.style.js";

const ViewDetailsModal = ({ name, symbol, quote, detailsVisible, onPressProp, onRequestClose }) => {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={detailsVisible.visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Name:</Text> {name}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Symbol:</Text> {symbol}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Price: </Text>{" "}
            {quote.USD.price}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Percent change 1h: </Text>{" "}
            {quote.USD.percent_change_1h}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Percent change 24h:</Text>{" "}
            {quote.USD.percent_change_24h}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Percent change 30D:</Text>{" "}
            {quote.USD.percent_change_30d}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Volume 24h:</Text>{" "}
            {quote.USD.volume_24h}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Volume Change 24h:</Text>{" "}
            {quote.USD.volume_change_24h}{" "}
          </Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onPressProp}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ViewDetailsModal;
