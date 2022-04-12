import { View, Text, TextInput, Modal, Pressable } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./HomeScreen.component.style.js";

const { manifest } = Constants;

const ViewDetailsModal = ({
  ticker,
  detailsVisible,
  errorMessageDetails,
  tickerDetails,
  detailsChangeFunction,
  loadDetails,
}) => {
  const [dateInput, setDateInput] = useState("2022-03-08");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={detailsVisible.visible}
      onRequestClose={detailsChangeFunction}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>In YYYY-MM-DD Format</Text>

          <Formik
            initialValues={{ date: "" }}
            onSubmit={(values) => {
              setDateInput(values.date);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("date")}
                  onBlur={handleBlur("date")}
                  value={values.date}
                  placeholder={dateInput}
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textStyle}>Set Date</Text>
                </Pressable>

                {/* <Button onPress={}  title="Set Date" /> */}
              </View>
            )}
          </Formik>

          <View style={styles.marginBottom20}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={loadDetails}
            >
              <Text style={styles.textStyle}>Load details</Text>
            </Pressable>
          </View>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Ticker:</Text>{" "}
            {detailsVisible.ticker}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Message:</Text>{" "}
            {errorMessageDetails}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Date: </Text>{" "}
            {tickerDetails.from}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Open:</Text>{" "}
            {tickerDetails.open}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Close:</Text>{" "}
            {tickerDetails.close}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>High:</Text>{" "}
            {tickerDetails.high}{" "}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Low:</Text> {tickerDetails.low}{" "}
          </Text>
          <Text>
            <Text style={[{ fontWeight: "bold" }]}>Premarket:</Text>{" "}
            {tickerDetails.preMarket}{" "}
          </Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={detailsChangeFunction}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ViewDetailsModal;
