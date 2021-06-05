import React from "react";

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <ul className="errors">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>- {errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
