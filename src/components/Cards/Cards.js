import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from 'react-countup';
import "./Cards.css";

export const Cards = ({  title, cases, total, active, isRed, ...props }) => {
    return (
   
            <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>{title}</Typography>
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases && <CountUp start={0} end={cases} duration={2.75} separator="," />}</h2>
    <Typography className="infoBox__total" color="textSecondary"> 
     {total && <CountUp start={0} end={total} duration={2.75} separator="," />}
     </Typography>
                </CardContent>
            </Card>

    )
}
