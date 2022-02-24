import React, { ChangeEventHandler, useState } from "react";
import { FunctionComponent } from "react";
import Input from "./inputComponent";

export enum InputType {
    textField = "textField",
    checkbox = "checkbox",
    radioButton = "radioButton",
    dropdown = "dropdown",
}

interface InputProps {
    id: string,
    inputType: InputType,
    propName: string,
    type?: string,
    label?: string,
    values?: Array<{ value: string, displayText: string }>,
    numberOptions?: { min?: number, max: number }
    onChange?: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    validations?: [(v: String | number) => boolean],
}

interface FormProps {
    model: any,
    onSubmit: (model: any) => void,
    inputs: Array<InputProps>;
}

const GenericForm: FunctionComponent<FormProps> = (props: FormProps) => {
    const [newModel, setNewModel] = useState({ ...props.model });

    async function handleCreatePostForm(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        props.onSubmit(newModel);
    }

    function handleChange(event: React.ChangeEvent<any>) {
        const isCheckbox = event.target.type === "checkbox";
        if (isCheckbox) {
            var object = Object.assign({ ...newModel });
            var indexOfValue = (object[event.currentTarget.name] as Array<any>).indexOf(event.currentTarget.value);
            if (indexOfValue > -1) {
                (object[event.currentTarget.name] as Array<any>).splice(indexOfValue, 1);
            } else {
                object[event.currentTarget.name] = [...object[event.currentTarget.name], event.currentTarget.value];
            }
            setNewModel(object);
        } else {
            var object = Object.assign({ ...newModel }, { [event.currentTarget.name]: event.currentTarget.value });
            setNewModel(object);
        }
    }

    return (
        <form className="form" onSubmit={(e) => handleCreatePostForm(e)}>
            {
                props.inputs.map(input => {
                    return (
                        <div className="col-md-6" key={input.id}>
                            {
                                input.inputType === InputType.textField &&
                                <Input
                                    key={input.id}
                                    id={input.id}
                                    type={input.type ?? "text"}
                                    name={input.propName}
                                    value={newModel[input.propName] ?? ""}
                                    placeholder={input.placeholder}
                                    validations={input.validations}
                                    max={input.numberOptions?.max}
                                    min={input.numberOptions?.min}
                                    onChange={handleChange}
                                />
                            }
                            {
                                input.inputType === InputType.dropdown &&
                                <select name={input.propName} id="" defaultValue={newModel[input.propName]} onChange={handleChange}>
                                    {
                                        input.values?.map(value => {
                                            return (
                                                <option key={value.value} value={value.value}>{value.displayText}</option>
                                            )
                                        })
                                    }
                                </select>
                            }
                            {
                                input.inputType === InputType.radioButton &&
                                input.values?.map(value => {
                                    return (
                                        <div className="form-check form-check-inline" key={value.value}>
                                            <input className="form-check-input" onChange={handleChange} type="radio" name={input.propName} checked={value.value == newModel[input.propName]} id="inlineRadio1" value={value.value} />
                                            <label className="form-check-label" htmlFor={input.propName}>{value.displayText}</label>
                                        </div>
                                    )
                                })
                            }
                            {
                                input.inputType === InputType.checkbox &&
                                input.values?.map(value => {
                                    return (
                                        <div className="form-check" key={value.value}>
                                            <input className="form-check-input" onChange={handleChange} type="checkbox" name={input.propName} checked={(newModel[input.propName] as Array<string>).indexOf(value.value) > -1} id="inlineRadio1" value={value.value} />
                                            <label className="form-check-label" htmlFor={value.value}>{value.displayText}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <div className="col-sm-2">
                <button className="btn btn-primary" >Create</button>
            </div>
        </form>
    );
}

export default GenericForm;