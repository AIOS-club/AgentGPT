import React from "react";
import Button from "./Button";
import {
  FaKey,
  FaMicrochip,
  FaThermometerFull,
  FaExclamationCircle,
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
  } = reactModelStates;

  const [key, setKey] = React.useState<string>(customApiKey);

  const handleClose = () => {
    setKey(customApiKey);
    close();
  };

  function is_valid_key(key: string) {
    const pattern = /^ak-[a-zA-Z0-9]{48}$/;
    return pattern.test(key);
  }

  const handleSave = () => {
    if (is_valid_key(key)) {
      setCustomApiKey(key);
      close();
    } else {
      alert(
        "key is invalid, please ensure that you have set up billing in your OpenAI account"
      );
    }
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
            "Higher values will make the output more random, while lower values make the output more focused and deterministic.",
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
            <span className="ml-2">Loop #: </span>
          </>
        }
        value={customMaxLoops}
        disabled={!key}
        onChange={(e) => setCustomMaxLoops(parseFloat(e.target.value))}
        type="range"
        toolTipProperties={{
          message:
            "Controls the maximum number of loops that the agent will run (higher value will make more API calls).",
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
        您可到
        <a
          href="https://aios-key.vercel.app/account/api-keys"
          target="_blank"
          className="text-blue-500"
          rel="noreferrer"
        >
          aios-key
        </a>
        注册登录获取API KEY。所有的key只会在当前浏览器会话中使用。
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
              <FaKey />
              <span className="ml-2">Key: </span>
            </>
          }
          placeholder={"ak-..."}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <br className="md:inline" />
        <Accordion child={advancedSettings} name="高级设置"></Accordion>
      </div>
    </Dialog>
  );
}
