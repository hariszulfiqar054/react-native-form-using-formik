import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { OutlinedTextField } from "react-native-material-textfield";
import { validatePassword, validateConfirmPassword } from "./validation";
import { Button } from "react-native-paper";
const App = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          contact: " ",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid Email")
            .required("Required"),
          contact: Yup.string().matches(/^\d{11}$/, "Should be 11 digits")
          //.min(11, "Contact should be 11 digits")
        })}
        onSubmit={(values, formikActions) => {
          console.log(values);

          formikActions.setSubmitting(false);
        }}
      >
        {props => (
          <View>
            <OutlinedTextField
              containerStyle={{ padding: 5 }}
              label="Name"
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
              autoFocus
              error={
                props.touched.name && props.errors.name
                  ? props.errors.name
                  : null
              }
              placeholder="Enter Name"
              onSubmitEditing={() => {
                // on certain forms, it is nice to move the user's focus
                // to the next input when they press enter.
                this.emailInput.focus();
              }}
            />

            <OutlinedTextField
              containerStyle={{ padding: 5 }}
              label="Email"
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              placeholder="Email Address"
              error={
                props.touched.email && props.errors.email
                  ? props.errors.email
                  : null
              }
            />

            <OutlinedTextField
              containerStyle={{ padding: 5 }}
              label="Contact"
              onChangeText={props.handleChange("contact")}
              onBlur={props.handleBlur("contact")}
              value={props.values.contact}
              placeholder="Enter Contact"
              error={
                props.touched.contact && props.errors.contact
                  ? props.errors.contact
                  : null
              }
            />
            <OutlinedTextField
              containerStyle={{ padding: 5 }}
              label="Password"
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              placeholder="Enter Password"
              error={
                !validatePassword(props.values.password) &&
                props.touched.password
                  ? "Should be length 6"
                  : ""
              }
            />
            <OutlinedTextField
              containerStyle={{ padding: 5 }}
              label="Confirm Password"
              onChangeText={props.handleChange("confirmPassword")}
              onBlur={props.handleBlur("confirmPassword")}
              value={props.values.confirmPassword}
              placeholder="Enter Confirm Password"
              error={
                !validateConfirmPassword(
                  props.values.password,
                  props.values.confirmPassword
                ) && props.touched.confirmPassword
                  ? "Password not matched"
                  : ""
              }
            />

            <Button
              onPress={props.handleSubmit}
              color="black"
              mode="contained"
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
              style={{ marginTop: 16 }}
            >
              SUBMIT
            </Button>
            <Button
              onPress={props.handleReset}
              color="black"
              mode="outlined"
              disabled={props.isSubmitting}
              style={{ marginTop: 16 }}
            >
              Reset
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8
  }
});
