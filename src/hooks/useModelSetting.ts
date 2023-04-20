import { DEFAULT_MAX_LOOPS_FREE, GPT_35_TURBO,DEFAULT_API_URL } from "../utils/constants";
import { useEffect, useState } from "react";
const localSettingKey = "AUTOGPTSETTING";

interface ISetting {
  customApiKey: string;
  customModelName: string;
  customTemperature: number;
  customMaxLoops: number;
  customApiUrl: string;
}

function getLocalSetting(): ISetting | undefined {
  if (typeof window == "undefined") return;
  const local = localStorage?.getItem(localSettingKey) || "{}";
  return JSON.parse(local) as ISetting;
}
const useModelSetting = () => {
  const localSetting = getLocalSetting();
  const [customApiKey, setCustomApiKey] = useState(
    localSetting?.customApiKey || ""
  );
  const [customModelName, setCustomModelName] = useState(
    localSetting?.customModelName || GPT_35_TURBO
  );
  const [customTemperature, setCustomTemperature] = useState<number>(
    localSetting?.customTemperature || 0.9
  );
  const [customMaxLoops, setCustomMaxLoops] = useState<number>(
    DEFAULT_MAX_LOOPS_FREE
  );

  const [customApiUrl, setCustomApiUrl] = useState(localSetting?.customApiUrl || DEFAULT_API_URL)

  useEffect(() => {
    localStorage.setItem(
      localSettingKey,
      JSON.stringify({
        customApiKey,
        customModelName,
        customTemperature,
        customMaxLoops,
        customApiUrl
      })
    );
  }, [customApiKey, customModelName, customTemperature,customMaxLoops,customApiUrl]);

  return {
    customApiKey,
    customModelName,
    customTemperature,
    customMaxLoops,
    setCustomMaxLoops,
    setCustomApiKey,
    setCustomModelName,
    setCustomTemperature,
    customApiUrl,
    setCustomApiUrl
  };
};

export default useModelSetting;
