import { ChangeEventHandler, FunctionComponent } from "react";
import React from 'react';

interface InputProps {

    type?: string,
    name?: string,
    id: string,
    value?: string,
    placeholder?: string,
    invalidFeedback?: string,
    max?: number,
    min?: number,
    title?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    iconClassName?: string,
    required?: boolean,
    validations?: [(v: String | number) => boolean], // return boolean
}

const Input: FunctionComponent<InputProps> = (props: InputProps) => {
    //props
    const { onChange, invalidFeedback, placeholder, validations, id, iconClassName, title, } = props;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist()
        if (onChange)
            onChange(event);
        if (validations && validations.length > 0 && event.target.value) {
            var valid: boolean[] = validations.map(validation => {
                return validation(event.target.value);
            })
            if (valid.some(x => x == false)) {
                event.target.classList.add("is-invalid");
            } else {
                event.target.classList.remove("is-invalid");
            }
        }
    }
    return (
        <>
            {
                title &&
                <label htmlFor={id}>{title}</label>
            }
            <div className="input-group">
                {
                    iconClassName && <div className="input-group-prepend">
                        <span className="input-group-text" id={id}>
                            <i className={iconClassName}></i>
                            &nbsp;
                        </span>
                    </div>
                }
                <input
                    {...props}
                    onChange={handleChange}
                    aria-describedby={id}
                    className="form-control"
                />
                <div className="invalid-feedback">
                    {invalidFeedback}
                </div>
            </div>
        </>
    );
}

export default Input;