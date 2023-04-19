import React from "react";
import Button from "./Button";
import {
  FaKey,
  FaMicrochip,
  FaThermometerFull,
  FaGlobe,
  FaSyncAlt,
} from "react-icons/fa";
import Dialog from "./Dialog";
import Input from "./Input";
import {
  GPT_MODEL_NAMES,
  GPT_4,
  DEFAULT_MAX_LOOPS_CUSTOM_API_KEY,
  DEFAULT_MAX_LOOPS_FREE,
} from "../utils/constants";
import Accordion from "./Accordion";
import type { reactModelStates } from "./types";

export default function SettingsDialog({
  show,
  close,
  reactModelStates,
}: {
  show: boolean;
  close: () => void;
  reactModelStates: reactModelStates;
}) {
  const {
    customApiKey,
    setCustomApiKey,
    customModelName,
    setCustomModelName,
    customTemperature,
    setCustomTemperature,
    customMaxLoops,
    setCustomMaxLoops,
    customApiUrl,
    setCustomApiUrl,
  } = reactModelStates;

  const [key, setKey] = React.useState<string>(customApiKey);
  const [url, setUrl] = React.useState<string>(customApiUrl);

  const handleClose = () => {
    setKey(customApiKey);
    setCustomApiUrl(customApiUrl);
    close();
  };

  const handleSave = () => {
    setCustomApiKey(key);
    setCustomApiUrl(url);
    close();
  };

  React.useEffect(() => {
    setCustomMaxLoops(
      !key ? DEFAULT_MAX_LOOPS_FREE : DEFAULT_MAX_LOOPS_CUSTOM_API_KEY
    );

    return () => {
      setCustomMaxLoops(DEFAULT_MAX_LOOPS_FREE);
    };
  }, [key, setCustomMaxLoops]);

  const advancedSettings = (
    <>
      <Input
        left={
          <>
            <FaThermometerFull />
            <span className="ml-2">Temp: </span>
          </>
        }
        value={customTemperature}
        onChange={(e) => setCustomTemperature(parseFloat(e.target.value))}
        type="range"
        toolTipProperties={{
          message:
            "较高的数值会导致输出结果更具随机性，而较低的数值会导致输出结果更具确定性",
          disabled: false,
        }}
        attributes={{
          min: 0,
          max: 1,
          step: 0.01,
        }}
      />
      <br />
      <Input
        left={
          <>
            <FaSyncAlt />
            <span className="ml-2">Loop: </span>
          </>
        }
        value={customMaxLoops}
        disabled={!key}
        onChange={(e) => setCustomMaxLoops(parseFloat(e.target.value))}
        type="range"
        toolTipProperties={{
          message:
            "控制运行的最大循环数，值越大，调用次数越多(调用会消耗API KEY的次数)",
          disabled: false,
        }}
        attributes={{
          min: 1,
          max: 100,
          step: 1,
        }}
      />
    </>
  );

  return (
    <Dialog
      header="设置 ⚙"
      isShown={show}
      close={handleClose}
      footerButton={<Button onClick={handleSave}>保存</Button>}
    >
      <p>您需输入API KEY以使用相关服务.</p>
      <br />
      <strong className="mt-10">
        您也可根据需求定义API请求地址,地址需类似https://api.openai.com/v1，并有相同的接口实现
      </strong>
      <br />
      <div className="text-md relative flex-auto p-2 leading-relaxed">
        <Input
          left={
            <>
              <FaMicrochip />
              <span className="ml-2">Model:</span>
            </>
          }
          type="combobox"
          value={customModelName}
          onChange={() => null}
          setValue={setCustomModelName}
          attributes={{ options: GPT_MODEL_NAMES }}
        />
        <br className="hidden md:inline" />
        <Input
          left={
            <>
              <FaGlobe />
              <span className="ml-2">API URL: </span>
            </>
          }
          placeholder={"https://api.openai.com/v1"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br className="hidden md:inline" />
        <Input
          left={
            <>
              <FaKey />
              <span className="ml-2">Key: </span>
            </>
          }
          placeholder={"xx-xxxxxxxxxx"}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <br className="md:inline" />
        <Accordion child={advancedSettings} name="高级设置"></Accordion>
      </div>
    </Dialog>
  );
}
