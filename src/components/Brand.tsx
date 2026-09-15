import "@fontsource/leckerli-one";
import kokeshiHead from "../assets/kokeshi-head.webp";
import "./Brand.css";

export function Brand() {
  return (
    <p className="brand">
      <img
        className="brand-icon"
        src={kokeshiHead}
        alt=""
        width={44}
        height={44}
      />
      <span>KomeKokeshi</span>
    </p>
  );
}
