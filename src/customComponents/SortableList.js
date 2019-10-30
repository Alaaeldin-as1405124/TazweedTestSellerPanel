import React from 'react';
import Sortable from 'react-sortablejs';

// Functional Component
const SortableList = ({items, reOrder, renderItem}) => {
    let sortable = null; // sortable instance

    const listItems = items.map((file, index) => {

            return (<div data-id={index}>{renderItem(file, index)}</div>)
        }
    );

    return (
        <div>

            <Sortable
                // Sortable options (https://github.com/RubaXa/Sortable#options)
                options={{}}

                // [Optional] Use ref to get the sortable instance
                // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
                ref={(c) => {
                    if (c) {
                        sortable = c.sortable;
                    }
                }}

                // [Optional] A tag or react component to specify the wrapping element. Defaults to "div".
                // In a case of a react component it is required to has children in the component
                // and pass it down.
                tag="div"

                // [Optional] The onChange method allows you to implement a controlled component and keep
                // DOM nodes untouched. You have to change state to re-render the component.
                // @param {Array} order An ordered array of items defined by the `data-id` attribute.
                // @param {Object} sortable The sortable instance.
                // @param {Event} evt The event object.
                onChange={(order, sortable, evt) => {
                    //console.log('order ', order, '\n sortable ', sortable, '\n evt', evt)
                    //do the sorting
                    let newIndex = evt.newIndex;
                    let oldIndex = evt.oldIndex;
                    //console.log('old index ',oldIndex,'\n new Index ',newIndex)
                    let newOrderedFiles = [...items];
                    let temp = newOrderedFiles[oldIndex];
                    newOrderedFiles[oldIndex] = newOrderedFiles[newIndex];
                    newOrderedFiles[newIndex] = temp;
                    //let newOrderFiles = doSorting(items,order)
                    //console.log(newOrderFiles)
                    reOrder(newOrderedFiles);
                }}
            >
                {listItems}
            </Sortable>
        </div>
    );
};


export default SortableList;
