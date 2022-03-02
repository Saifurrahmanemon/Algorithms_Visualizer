import { colors } from "../utils/helpers";
import "./ArrayBar.css";
export default function ArrayBar({ value, index, color, count }) {
    return (
        <div>
            <div
                className="array-bar"
                key={index}
                style={{
                    backgroundColor: `${colors[color]}`,
                    height: `${value}px`,
                    width: "40px",
                }}
            >
                <strong className="value-inside-bar">{value}</strong>
            </div>
        </div>
    );
}
