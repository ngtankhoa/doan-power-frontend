import React from 'react'
import CardIcon from "components/Card/CardIcon.jsx";
import Assignment from "@material-ui/icons/Assignment";
import CardHeader from "components/Card/CardHeader.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PropTypes from "prop-types";

function CardHeaderCustom(props)  {
  const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };   
    return (
        <CardHeader color="primary" icon>
            <CardIcon color="primary">
            <Assignment />
            </CardIcon>
            <h4 style={styles.cardIconTitle}>{props.text}</h4>
      </CardHeader>
    )
  }
CardHeaderCustom.propTypes = {
  text :PropTypes.string.isRequired
}
export default CardHeaderCustom
