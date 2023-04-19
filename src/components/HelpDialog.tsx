import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import Dialog from "./Dialog";

export default function HelpDialog({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  return (
    <Dialog header="欢迎使用AIOS AgentGPT 🤖" isShown={show} close={close}>
      <div className="text-md relative flex-auto p-2 leading-relaxed">
        <p>
          <strong>AIOS AgentGPT</strong>
          允许您配置和部署自主人工智能代理。您可以为其命名，并让它着手完成任何您能想象到的目标。它会通过思考任务、执行任务并从结果中学习的方式尝试实现这些目标。🚀
        </p>
        {/* <div>
          <br />
          This platform is currently in beta, we are currently working on:
          <ul className='ml-5 list-inside list-disc'>
            <li>Long term memory 🧠</li>
            <li>Web browsing 🌐</li>
            <li>Interaction with websites and people 👨‍👩‍👦</li>
          </ul>
          <br />
          <p className='mt-2'>Follow the journey below:</p>
        </div> */}
        {/* <div className='mt-4 flex w-full items-center justify-center gap-5'>
          <div className='cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70' onClick={() => window.open("https://discord.gg/jdSBAnmdnY", "_blank")}>
            <FaDiscord size={30} />
          </div>
          <div
            className='cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70'
            onClick={() => window.open("https://twitter.com/asimdotshrestha/status/1644883727707959296", "_blank")}
          >
            <FaTwitter size={30} />
          </div>
          <div
            className='cursor-pointer rounded-full bg-black/30 p-3 hover:bg-black/70'
            onClick={() => window.open("https://github.com/reworkd/AgentGPT", "_blank")}
          >
            <FaGithub size={30} />
          </div>
        </div> */}
      </div>
    </Dialog>
  );
}
