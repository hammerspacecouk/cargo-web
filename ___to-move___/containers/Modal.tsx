import * as React from 'react';
import * as ModalHandler from 'react-modal';

interface Props {
    title?: string;
    children: any;
}

interface State {
    modalIsOpen: boolean;
}

export default class Modal extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }


    render() {
        const title = this.props.title || '';

        return (
            <ModalHandler
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel={title}
                className={{
                    base: 'modal',
                    afterOpen: 'modal--after-open',
                    beforeClose: 'modal--before-close'
                }}
                overlayClassName={{
                    base: 'modal__overlay',
                    afterOpen: 'modal__overlay--after-open',
                    beforeClose: 'modal__overlay--before-close'
                }}
            >
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" onClick={this.closeModal}>X</button>
                </div>
                <div className="modal__body">
                    <div className="modal__content">
                    {this.props.children}
                    </div>
                </div>
            </ModalHandler>
        );
    }
}