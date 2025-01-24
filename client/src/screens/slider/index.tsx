import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "rn-range-slider";
import { TextComponent } from "../../components";
import { appColor } from "../../constants/appColor";
import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";

interface Props {
  onSelected: ({
    lowValue,
    highValue,
  }: {
    lowValue: number;
    highValue: number;
  }) => void;
}

const SliderScreen = (props: Props) => {
  const {onSelected} = props;
  // const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  // const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(
    (name: "high" | "low") => <Thumb name={name} />,
    []
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: any) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(
    (lowValue: number, highValue: number) => {
      setLow(lowValue);
      setHigh(highValue);
    onSelected({ lowValue, highValue });
    },
    []
  );
  // const toggleRangeEnabled = useCallback(
  //   () => setRangeDisabled(!rangeDisabled),
  //   [rangeDisabled]
  // );
  // const setMinTo50 = useCallback(() => setMin(50), []);
  // const setMinTo0 = useCallback(() => setMin(0), []);
  // const setMaxTo100 = useCallback(() => setMax(100), []);
  // const setMaxTo500 = useCallback(() => setMax(500), []);
  // const toggleFloatingLabel = useCallback(
  //   () => setFloatingLabel(!floatingLabel),
  //   [floatingLabel]
  // );

  return (
    <View style={styles.root}>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={5}
        // disableRange={rangeDisabled}
        // floatingLabel={floatingLabel}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({
  root: {
    padding: 12,
    flex: 1,
  },
  slider: {},
  button: {},
  header: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: appColor.text,
    fontSize: 16,
  },
});
