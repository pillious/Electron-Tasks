import { useState } from "react";
import classes from "./NewListButton.module.css";

const NewListButton: React.FC<{
    btnStyles: {
        height: number | string;
        width: number | string;
        fontSize?: number | string;
        borderRadius?: number | string;
        borderColor?: string;
        color?: string;
        backgroundColor?: string;
    };
}> = (props) => {
    const {
        height,
        width,
        fontSize,
        borderRadius,
        borderColor,
        color,
        backgroundColor,
    } = props.btnStyles;

    const [isHovering, setIsHovering] = useState(false);

    let styles = {
        height: height,
        width: width,
        fontSize: fontSize ? fontSize : 16,
        color: color ? color : "#2b96d9",
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
        border: `1px solid ${borderColor ? borderColor : "#2b96d9"}`,
        borderRadius: borderRadius ? borderRadius : 0,
    };

    if (isHovering) {
        
        let hoverStyles = {
            color: backgroundColor ? backgroundColor : '#fff',
            backgroundColor: color ? color : '#2b96d9',
        }
        styles = {...styles, ...hoverStyles};
    }

    const clickHandler = () => {};

    return (
        <button
            className={classes.new_list_btn}
            style={styles}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {props.children}
        </button>
    );
};

export default NewListButton;
