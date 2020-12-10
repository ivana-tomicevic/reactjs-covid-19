import numeral from 'numeral'

export const casesTypeColors = {
    recovered: {
      hex: "#00d97b",
      multiplier: 800,
    },
    cases: {
      hex: "#ad0728",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => ( a.cases > b.cases ? -1:1))
    }

    export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";


