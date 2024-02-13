import { Fragment, useState } from "react";
import classes from "./NewListButton.module.css";

interface Props {
    btnStyles: {
        height?: number | string;
        width?: number | string;
        padding?: number | string;
        margin?: number | string;
        fontSize?: number | string;
        borderRadius?: number | string;
        borderColor?: string;
        color?: string;
        backgroundColor?: string;
    };
    onClick?: () => void | null;
    children?: React.ReactNode;
}

const NewListButton: React.FC<Props> = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const {
        height,
        width,
        padding,
        margin,
        fontSize,
        borderRadius,
        borderColor,
        color,
        backgroundColor,
    } = props.btnStyles;

    let styles = {
        height: height ? height : "unset",
        width: width ? width : "unset",
        padding: padding ? padding : 0,
        margin: margin ? margin : 0,
        fontSize: fontSize ? fontSize : "1rem",
        color: color ? color : "#2b96d9",
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
        border: `1px solid ${borderColor ? borderColor : "#2b96d9"}`,
        borderRadius: borderRadius ? borderRadius : 0,
    };

    if (isHovering) {
        let hoverStyles = {
            color: backgroundColor ? backgroundColor : "#fff",
            backgroundColor: color ? color : "#2b96d9",
        };
        styles = { ...styles, ...hoverStyles };
    }

    return (
        <Fragment>
            <button
                className={classes.new_list_btn}
                style={styles}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </Fragment>
    );
};

export default NewListButton;
