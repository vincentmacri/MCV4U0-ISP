import React, {Component} from 'react';
import {Collapsible, CollapsibleItem, Modal, Button} from 'react-materialize';
const {MathJax} = window;

const capitalize = word => word.replace(/(^|\s)\S/g, l => l.toUpperCase())

const RULES = {
    'Constant Times Rule': {
        icon: 'highlight_off'
    },
    'Power Rule': {
        icon: 'filter_none',
        proof: 'Toast!'
    },
    'Exponent Rule': {
        icon: 'explicit'
    },
    'Constant Rule': {
        icon: 'copyright'
    },
    'Trig Rule': {
        icon: 'signal_cellular_null'
    },
    'U Rule': {
        icon: 'format_underlined'
    },
    'Add Rule': {
        icon: 'add'
    },
    'Don\'t Know Rule': {
        icon: 'help_outline'
    },
    'Parts Rule': {
        icon: 'donut_large'
    },
    'Reciprocal Rule': {
        icon: 'vertical_align_center'
    },
    'Rewrite Rule': {
        icon: 'mode_edit'
    }
}

class StepsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: []
        };
    }

    componentWillReceiveProps({steps}) {
        this.setState({
            steps: this.renderSteps(steps)
        });
    }

    componentDidUpdate() {
        MathJax
            .Hub
            .Queue(["Typeset", MathJax.Hub]);
    }

    renderSteps(step) {
        let {name, text, substeps} = step;

        name = capitalize(name);
        let {icon, proof} = RULES[name];

        return (
            <CollapsibleItem header={name} icon={icon}>
                <p className="rule-text">{text}</p>
                {proof
                    ? <Modal
                            header={`Proof of the ${name}`}
                            trigger={(
                            <Button>
                                See proof
                            </Button>
                        )}>
                            {proof}
                        </Modal>
                    : null}
                {substeps.map((substep, i) => {
                    return (
                        <Collapsible key={`rule-${i}`}>
                            {this.renderSteps(substep)}
                        </Collapsible>
                    );
                })}

            </CollapsibleItem>
        );
    }

    render() {
        return (
            <Collapsible>
                {this.state.steps}
            </Collapsible>
        );
    }
}

export default StepsContainer;