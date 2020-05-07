import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";
import Big from "big.js";


import "./ui/ConditionalFormatter.css";

class ConditionalFormatter extends Component {
    constructor(props) {
        super(props);

        this.getClassName = this.getClassName.bind(this);
    }

    getClassName() {
        const { baseAttr, refAttr, classMap } = this.props;
        if (baseAttr.status != "available" || refAttr.status != "available") {
            return null;
        }
        const diff = baseAttr.value.minus(refAttr.value);
        const classObj = classMap.find((cm) => {
            // cm.integer cm.comparison cm.className
            if (cm.comparison === "eq") {
                return diff.eq(cm.integer)
            } else if (cm.comparison === "lt") {
                return diff.minus(cm.integer) <= 0
            } else {
                return diff.minus(cm.integer) >= 0
            }

        });
        if (!classObj) return null;
        return classObj.className;
    }

    render() {
        const { content } = this.props;
        return (
            <div className={this.getClassName()}>
                {content}
            </div>
        );

    }
}

export default hot(ConditionalFormatter);
