type ContentRenderer<T> = {
    [key: keyof T]: () => JSX.Element
}

export default ContentRenderer;