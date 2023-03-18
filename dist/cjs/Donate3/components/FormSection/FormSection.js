var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Donate3/components/FormSection/FormSection.tsx
var FormSection_exports = {};
__export(FormSection_exports, {
  default: () => FormSection_default
});
module.exports = __toCommonJS(FormSection_exports);
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_bind = __toESM(require("classnames/bind"));
var import_useDonate = __toESM(require("../../hooks/useDonate"));
var import_ethers = require("ethers");
var import_react = __toESM(require("react"));
var import_wagmi = require("wagmi");
var import_abi = __toESM(require("../../abi.json"));
var import_eth = require("../../images/eth.svg");
var import_switch = require("../../images/switch.svg");
var import_Footer = __toESM(require("../Footer/Footer"));
var import_UserAvatar = __toESM(require("../UserAvatar/UserAvatar"));
var import_FormSection_module = __toESM(require("./FormSection.module.css"));
function FormSection(props) {
  const { openConnectModal } = (0, import_rainbowkit.useConnectModal)();
  const { openChainModal } = (0, import_rainbowkit.useChainModal)();
  const { chain, chains } = (0, import_wagmi.useNetwork)();
  const { address, isConnected } = (0, import_wagmi.useAccount)();
  const [showSemiModal, setShowSemiModal] = (0, import_react.useState)(false);
  const [amount, setAmount] = (0, import_react.useState)("");
  const [message, setMessage] = (0, import_react.useState)("");
  const createDonate = (0, import_useDonate.default)();
  const { data: signer } = (0, import_wagmi.useSigner)();
  const contract = (0, import_wagmi.useContract)({
    address: "0xbdEA24f8657eC8AD679b8bCcc761EcEE9600667e",
    abi: import_abi.default,
    signerOrProvider: signer
  });
  let pid = 3;
  const amountIn = amount && import_ethers.ethers.utils.parseEther(amount);
  const bytesMsg = import_ethers.ethers.utils.toUtf8Bytes(message);
  let donateTokenArgs = [
    pid,
    amountIn,
    "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4",
    // props.toAddress,
    bytesMsg,
    [],
    {
      value: amountIn
    }
  ];
  console.log("donateTokenArgs", donateTokenArgs);
  const { config } = (0, import_wagmi.usePrepareContractWrite)({
    address: "0xbdEA24f8657eC8AD679b8bCcc761EcEE9600667e",
    abi: import_abi.default,
    functionName: "donateToken",
    args: donateTokenArgs
  });
  const {
    data: transactionData,
    isLoading,
    isSuccess,
    write
  } = (0, import_wagmi.useContractWrite)(config);
  let cx = import_bind.default.bind(import_FormSection_module.default);
  (0, import_react.useEffect)(() => {
    if (isConnected) {
      setShowSemiModal(false);
    } else {
      setShowSemiModal(true);
    }
  }, []);
  const asyncFunc = async () => {
    console.log("合约数据变更", transactionData, isLoading, isSuccess);
    const createDonateArgs = {
      chainType: (chain == null ? void 0 : chain.name) || "unknow",
      coinType: 0,
      createTime: Date.now(),
      fromAddress: address,
      hash: transactionData == null ? void 0 : transactionData.hash,
      id: transactionData == null ? void 0 : transactionData.hash,
      message,
      status: 0,
      // TODO
      toAddress: props.toAddress,
      updateTime: Date.now(),
      usdValue: amount,
      userId: address,
      value: amount
    };
    const result = await createDonate(createDonateArgs);
    console.log(result);
  };
  const handleDonate = async () => {
    if (isConnected) {
      setShowSemiModal(false);
      const data = {
        amount,
        message
      };
      console.log(data, chain, chains, contract);
      write == null ? void 0 : write();
      asyncFunc();
      console.log(transactionData);
    } else {
      setShowSemiModal(true);
    }
  };
  const handleEthAmount = (event) => {
    var _a, _b;
    event.currentTarget.querySelectorAll("div").forEach((item) => {
      item.classList.remove(import_FormSection_module.default.active);
    });
    const amount2 = ((_b = (_a = event.target) == null ? void 0 : _a.dataset) == null ? void 0 : _b.amount) || 0;
    event.target.classList.add(import_FormSection_module.default.active);
    setAmount(amount2);
  };
  const handleManualAmount = (event) => {
    setAmount(event.target.value);
  };
  return /* @__PURE__ */ import_react.default.createElement("section", { className: import_FormSection_module.default.appcontent }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.title }, "Payment Method"), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.methodinput }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.eth }, /* @__PURE__ */ import_react.default.createElement(import_eth.ReactComponent, null)), /* @__PURE__ */ import_react.default.createElement("div", null, "ETH"), /* @__PURE__ */ import_react.default.createElement("input", { placeholder: "Ethereum" }), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.switch, onClick: openChainModal }, /* @__PURE__ */ import_react.default.createElement(import_switch.ReactComponent, null))), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.footermark }, /* @__PURE__ */ import_react.default.createElement("div", null, "icon"), /* @__PURE__ */ import_react.default.createElement("div", null, "21.11ETH"), /* @__PURE__ */ import_react.default.createElement("div", null, "0.01E = $127; 31GWEI = $0.75")), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.shortcutoption, onClick: handleEthAmount }, /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 1e-3 }, "0.001 ETH"), /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 0.01 }, "0.01 ETH"), /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 0.5 }, "0.5 ETH")), /* @__PURE__ */ import_react.default.createElement("fieldset", { className: import_FormSection_module.default.fieldset }, /* @__PURE__ */ import_react.default.createElement("legend", null, /* @__PURE__ */ import_react.default.createElement("span", null, "OR"))), /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      className: import_FormSection_module.default.pricebtn,
      placeholder: "Enter Price Manually",
      value: amount,
      onChange: handleManualAmount
    }
  ), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.msg }, /* @__PURE__ */ import_react.default.createElement("div", null, "Message"), /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      placeholder: "Will be published on chain",
      multiple: true,
      value: message,
      onChange: (e) => {
        setMessage(e.currentTarget.value);
      }
    }
  )), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      type: "button",
      className: import_FormSection_module.default.donate3btn,
      onClick: handleDonate
    },
    /* @__PURE__ */ import_react.default.createElement("div", null, "DONATE3"),
    /* @__PURE__ */ import_react.default.createElement("div", null, "≈$875.32")
  ), showSemiModal ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: cx(
        import_FormSection_module.default.semiModal,
        { in: !isConnected || showSemiModal },
        { out: isConnected || !showSemiModal }
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: import_FormSection_module.default.bgmask,
        onClick: () => {
          setShowSemiModal(false);
        }
      }
    ),
    /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.semiwrap }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.semiimg }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        className: import_FormSection_module.default.walleticon,
        src: "https://i.328888.xyz/2023/03/12/vkcMH.png"
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        className: import_FormSection_module.default.btcicon,
        src: "https://i.328888.xyz/2023/03/12/vkRxF.png"
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_UserAvatar.default, { type: props.type }), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.semidonatebtn, onClick: openConnectModal }, "Connect wallet for donation"), /* @__PURE__ */ import_react.default.createElement(import_Footer.default, null))
  ) : null);
}
var FormSection_default = import_react.default.memo(FormSection);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});