import { FC } from 'react'
import './Buttons.scss'
export const Buttons:
    FC<{ create: () => void, cancel: () => void }> = ({ create, cancel }) => {
        return (
            <div className="create-btn-container">
                <button className="black-btn"
                    onClick={create}>Create</button>
                <button className="black-btn"
                    onClick={cancel}
                >Cancel</button>
            </div>
        );
    };
