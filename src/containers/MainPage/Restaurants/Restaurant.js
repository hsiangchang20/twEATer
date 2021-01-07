import React from "react";

export default function Restaurant(props) {
    const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;
    return id && restaurantIDs.includes(id) ? (
        <article>
            <h1>Restaurant #{id}</h1>
            <p>This is the {id}-th restaurant</p>
        </article>
    ) : (
            <div>
                <h3>Error: Restaurant #{id} NOT FOUND</h3>
            </div>
        )
}
/*
{
    render() {
        const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
        const { id } = this.props.match.params;
        return id && restaurantIDs.includes(id) ? (
            <article>
                <h1>Restaurant #{id}</h1>
                <p>This is the {id}-th restaurant</p>
            </article>
        ) : (
                <div>
                    <h3>Error: Restaurant #{id} NOT FOUND</h3>
                </div>
            )
    }
}
*/