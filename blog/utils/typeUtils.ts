
export const getContentFolder = (type: string) => {
    if (type === "blog") {
        return "blog";
    } else if (type === "resources") {
        return "resources";
    }
    return type;
}

export const getLabelFromType = (type: string) => {
    if (type === "blog") {
        return "Blog";
    } else if (type === "resources") {
        return "Resources";
    }
    return type;
}